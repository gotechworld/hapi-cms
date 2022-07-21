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
    title: Joi.string().required(),
    content_heading: Joi.string().optional(),
    keywords: Joi.string()
      .optional()
      .allow(null),
    description: Joi.string()
      .optional()
      .allow(null),
    template: Joi.string().optional(),
    identifier: Joi.string().required(),
    content: Joi.string()
      .optional()
      .allow(""),
    content_object: Joi.string()
      .optional()
      .allow("")
      .allow(null),
    banners: Joi.array()
      .optional()
      .allow(null),
    update_xml: Joi.any().optional()
  }),
  savePayload: () => {
    return Joi.alternatives().try(
      Joi.array()
        .label("Page")
        .items(self.responseSchema()),
      Joi.object()
        .label("Page")
        .keys(self.responseSchema())
    );
  }
});
