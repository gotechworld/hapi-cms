import Joi from "joi";

const self = (module.exports = {
  requestParams: () => ({
    id: Joi.number()
      .required()
      .description("Value of the filter field")
  }),
  requestQuery: () => {
    const schema = Joi.object(self.responseSchema()).describe();
    const availableFilters = Object.entries(schema.keys)
      .filter(
        ([key, itm]) => itm.type === "number" || itm.type === "string"
      )
      .map(([key, itm]) => key);

    return Joi.string().regex(
      new RegExp("(" + availableFilters.join("|") + "):[a-zA-Z0-9 -_/?]{1,500}")
    );
  },
  responseSchema: () => ({
    id: Joi.number().required(),
    region_id: Joi.number().required(),
    name: Joi.string().required()
  }),
  savePayload: () => {
    return Joi.alternatives().try(
      Joi.array()
        .label("City")
        .items(self.responseSchema()),
      Joi.object()
        .label("City")
        .keys(self.responseSchema())
    );
  }
});
