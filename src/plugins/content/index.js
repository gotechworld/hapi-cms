import Routes from "./routes";
import Hoek from "@hapi/hoek";
import Joi from 'joi';

const internals = {
  defaults: {
    config: {
      page: {
        index: "pages",
        pageSize: 500
      },
      banner: {
        index: "banners",
        pageSize: 500
      },
      block: {
        index: "blocks",
        pageSize: 500
      },
      region: {
        index: "regions",
        pageSize: 500
      },
      city: {
        index: "cities",
        pageSize: 500
      },
      store: {
        index: "stores",
        pageSize: 500
      },
      company: {
        index: "companies",
        pageSize: 500
      },
      seller: {
        index: "sellers",
        pageSize: 500
      },
      career: {
        index: "career",
        pageSize: 500
      }
    }
  }
};

exports.plugin = {
  register: async (server, options) => {
    // server.dependency("content", server.plugins["hapi-panda-es"])

    const settings = Hoek.applyToDefaults(internals.defaults.config, options);

    const { pandaEs } = server;
    const { pandaEsOrm } = server;
    const models = {};

    const collection = [
      require("./models/banner")(settings.banner, pandaEs, pandaEsOrm),
      require("./models/page")(settings.page, pandaEs, pandaEsOrm),
      require("./models/block")(settings.block, pandaEs, pandaEsOrm),
      require("./models/region")(settings.region, pandaEs, pandaEsOrm),
      require("./models/city")(settings.city, pandaEs, pandaEsOrm),
      require("./models/store")(settings.store, pandaEs, pandaEsOrm),
      require("./models/company")(settings.company, pandaEs, pandaEsOrm),
      require("./models/seller")(settings.seller, pandaEs, pandaEsOrm),
      require("./models/career")(settings.career, pandaEs, pandaEsOrm)
    ];

    for (const modelOptions of collection) {
      models[modelOptions.name] = new pandaEs.model({
        name: modelOptions.name,
        index: modelOptions.index,
        idKey: modelOptions.idKey,
        validation: modelOptions.validation
      });

      if (modelOptions.listeners) {
        Object.keys(modelOptions.listeners).forEach(async evtId => {
          const evtName = modelOptions.name.toLowerCase() + "_" + evtId;
          models[modelOptions.name].on(
            evtName,
            await modelOptions.listeners[evtId]
          );
        });
      }
    }

    // set validator
    await server.validator(Joi);

    server.route(Routes(settings));
  },
  pkg: require("./package.json")
};
