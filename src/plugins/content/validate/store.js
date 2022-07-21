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
    name: Joi.string().required(),
    erp_id: Joi.number().required(),
    network: Joi.number().required(),
    region_id: Joi.number().required(),
    region_name: Joi.string().optional(),
    city_id: Joi.number().required(),
    city_name: Joi.string().optional(),
    image: Joi.string()
      .optional()
      .allow(null),
    address: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    manager_picture: Joi.string()
      .required()
      .allow(null),
    url_key: Joi.string().required(),
    meta_title: Joi.string()
      .required()
      .allow(null),
    meta_keywords: Joi.string()
      .required()
      .allow(null),
    meta_description: Joi.string()
      .required()
      .allow(null),
    schedule: Joi.any().optional(),
    special_schedule: Joi.any().optional(),
    password: Joi.string()
      .required()
      .allow(null),
    credit_emails: Joi.string().required(),
    flow: Joi.number().optional(),
    is_subscription: Joi.number().optional(),
    customer_ship_to_store: Joi.number().optional().default(0),
    rating_count: Joi.number().optional(),
    rating: Joi.number().optional()
  }),
  savePayload: () => {
    return Joi.alternatives().try(
      Joi.array()
        .label("Store")
        .items(self.responseSchema()),
      Joi.object()
        .label("Store")
        .keys(self.responseSchema())
    );
  }
});
