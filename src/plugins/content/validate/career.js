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
    department_name: Joi.string().required(),
    emails: Joi.array().required(),
    jobs: Joi.array().required()
  }),
  savePayload: () => {
    return Joi.alternatives().try(
      Joi.array()
        .label("Career")
        .items(self.responseSchema()),
      Joi.object()
        .label("Career")
        .keys(self.responseSchema())
    );
  }
});
