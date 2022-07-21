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
    cui: Joi.number().required(),
    registration_number: Joi.string()
      .required()
      .allow(null),
    name: Joi.string()
      .required()
      .allow(null),
    region: Joi.string()
      .required()
      .allow(null),
    city: Joi.string()
      .required()
      .allow(null),
    street: Joi.string()
      .required()
      .allow(null),
    phone: Joi.string()
      .required()
      .allow(null),
    type_id: Joi.number()
      .required()
      .allow(null),
    region_id: Joi.number()
      .required()
      .allow(null)
  }),
  savePayload: () => {
    return Joi.alternatives().try(
      Joi.array()
        .label("Company")
        .items(self.responseSchema()),
      Joi.object()
        .label("Company")
        .keys(self.responseSchema())
    );
  }
});
