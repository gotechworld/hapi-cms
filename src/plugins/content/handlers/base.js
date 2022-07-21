import Boom from "@hapi/boom";
import Joi from "joi";
import { isUndefined, isArray, isEmpty } from "lodash";

class BaseHandler {
  constructor(settings, type) {
    this._settings = settings;
    this._type = type;
    this._validation = require("../validate/" + type.toLowerCase());
    this._esIndex = "";
    this._esType = "";
    this._bufferSize = 100;
    this._pageSize = settings[type.toLowerCase()].pageSize;
  }

  routes() {
    return {
      findById: this.findById(),
      findByFilters: this.findByFilters(),
      bulkSave: this.bulkSave(),
      bulkDelete: this.bulkDelete()
    };
  }

  findById() {
    return {
      handler: async (request, reply) => {
        const { pandaEsOrm } = request.server;
        const { pandaEs } = request.server;
        const model = pandaEsOrm.getModel(this.modelName);
        try {
          const entity = await model.findOneById(request.params.id);

          if (!isUndefined(entity._data)) {
            await this.after_findById(pandaEsOrm, pandaEs, entity._data);
          }

          if (!isEmpty(entity._data)) {
            return entity._data;
          }
          return Boom.notFound();
        } catch (e) {
          return Boom.internal(e.toString() || "Internal error");
        }
      },
      validate: {
        params: this.validation.requestParams()
      },
      tags: ["api"],
      response: {
        schema: this.validation.responseSchema()
      }
    };
  }

  async after_findByFilters(pandaEsOrm, pandaEs, data) {}

  async after_findById(pandaEsOrm, pandaEs, data) {}

  findByFilters() {
    return {
      handler: async (request, reply) => {
        const { pandaEsOrm } = request.server;
        const { pandaEs } = request.server;
        const model = pandaEsOrm.getModel(this.modelName);
        const { connection } = pandaEsOrm;
        const page = !isUndefined(request.query.page) ? request.query.page : 1;

        let esFilters = { bool: { must: [] } };
        if (!isUndefined(request.query.filter)) {
          esFilters["bool"]["must"] = [];
          const filters = this.parseEsFilters(request.query.filter);

          Object.keys(filters).forEach(key => {
            const item = { terms: {} };
            item.terms[key] = filters[key];
            esFilters["bool"]["must"].push(item);
          });
        } else {
          esFilters = { match_all: {} };
        }

        let maxSize = await this.getCount(connection, model.index, esFilters);
        const maxPage = Math.ceil(maxSize / this.pageSize);
        if (page > maxPage) {
          return Boom.notFound();
        }

        const response = await model.find(
          new pandaEs.query({
            query: esFilters,
            from: (page - 1) * this.pageSize,
            size: this.pageSize
          })
        );

        if (isEmpty(response)) {
          return Boom.notFound();
        }

        await this.after_findByFilters(pandaEsOrm, pandaEs, response);
        const responseData = {};
        responseData["items"] = response.map(i => i._data);
        responseData["info"] = {
          maxSize: maxSize,
          count: responseData["items"].length,
          currentPage: page,
          maxPage: maxPage
        };

        return responseData;
      },
      tags: ["api"],
      validate: {
        query: Joi.object().keys({
          filter: Joi.alternatives().try(
            this.validation.requestQuery(),
            Joi.array().items(this.validation.requestQuery())
          ),
          page: Joi.number().optional()
        })
      },
      response: {
        schema: Joi.object().keys({
          items: Joi.array().items(this.validation.responseSchema()),
          info: Joi.object().optional()
        })
      }
    };
  }

  bulkSave() {
    return {
      handler: async (request, reply) => {
        const { pandaEsOrm } = request.server;
        const { connection } = request.server.pandaEsOrm;

        const model = pandaEsOrm.getModel(this.modelName);
        let entities = request.payload;

        if (!isArray(entities)) {
          entities = [entities];
        }

        let buffer = [];
        entities.forEach(async itm => {
          const action = {
            index: { _index: model.index, _id: itm.id }
          };
          buffer.push(action, itm);
          if (buffer.length === this.bufferSize) {
            this.bulkInsert(request.server, connection, buffer);
            buffer = [];
          }
        });

        if (buffer.length !== 0) {
          this.bulkInsert(request.server, connection, buffer);
          buffer = [];
        }

        return {};
      },
      tags: ["api"],
      validate: {
        payload: this.validation.savePayload()
      },
      payload: {
        maxBytes: Number.MAX_SAFE_INTEGER
      },
      auth: "im-auth",
      plugins: {
        "hapi-internal-bridge": {
          auth: {
            role: "ROLE_CMS",
            permission: "ADD"
          }
        }
      }
    };
  }

  bulkInsert(server, connection, buffer) {
    connection.bulk(
      {
        refresh: "wait_for",
        body: buffer
      },
      (err, resp) => {
        if (err) {
          throw err;
        }
        server.logger.info("Indexed " + buffer.length + " documents");
      }
    );
  }

  getCount(connection, index, filters) {
    return new Promise((resolve, reject) => {
      connection.count(
        {
          index: index,
          body: {
            query: filters
          }
        },
        (err, resp) => {
          resolve(resp.body.count);
        }
      );
    });
  }

  bulkDelete() {
    return {
      handler: async (request, reply) => {
        const { pandaEs } = request.server;
        const { connection } = request.server.pandaEsOrm;
        const ids = request.payload.map(itm => itm.id);

        await pandaEs.query.execute(connection, "deleteByQuery", {
          conflicts: "proceed",
          index: this.esIndex,
          body: {
            query: {
              constant_score: {
                filter: {
                  terms: {
                    id: ids
                  }
                }
              }
            }
          }
        });
        return {};
      },
      validate: {
        payload: Joi.array().items(
          Joi.object().keys(this.validation.requestParams())
        )
      },
      auth: "im-auth",
      plugins: {
        "hapi-internal-bridge": {
          auth: {
            role: "ROLE_CMS",
            permission: "DELETE"
          }
        }
      }
    };
  }

  parseEsFilters(filters) {
    const conditions = {};

    if (!isArray(filters)) {
      filters = [filters];
    }

    filters.forEach(filter => {
      const split = filter.split(":");
      if (typeof conditions[split[0]] === "undefined") {
        conditions[split[0]] = [];
      }

      conditions[split[0]].push(split[1]);
    });
    return conditions;
  }

  get esIndex() {
    return this._esIndex;
  }

  get esType() {
    return this._esType;
  }

  get validation() {
    return this._validation;
  }

  get settings() {
    return this._settings;
  }

  get type() {
    return this._type;
  }

  get modelName() {
    return this.type + "Model";
  }

  get bufferSize() {
    return this._bufferSize;
  }

  get pageSize() {
    return this._pageSize;
  }
}

module.exports = BaseHandler;
