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
        ([key, itm]) =>
          itm.type === "number" ||
          itm.type === "string" ||
          itm.type === "boolean"
      )
      .map(([key, itm]) => key);

    return Joi.string().regex(
      new RegExp("(" + availableFilters.join("|") + "):[a-zA-Z0-9 -_/?]{1,500}")
    );
  },
  responseSchema: () => ({
    id: Joi.number().required(),
    name: Joi.string().required(),
    status: Joi.number().required(),
    company_name: Joi.string().required(),
    company_cui: Joi.string().required(),
    company_fiscal_number: Joi.string().required(),
    address: Joi.string().required(),
    bank_name: Joi.string().required(),
    bank_account: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    description: Joi.string().required(),
    warranty_info: Joi.string().required(),
    rma_info: Joi.string().required(),
    shipping_info: Joi.string().required(),
    customer_confidentiality_info: Joi.string().required(),
    seller_image: Joi.string()
      .optional()
      .allow(null)
      .allow(""),
    url_key: Joi.string().optional(),
    erp_id: Joi.string().optional().allow("")
  }),
  savePayload: () => {
    return Joi.alternatives().try(
      Joi.array()
        .label("Seller")
        .items(self.responseSchema()),
      Joi.object()
        .label("Seller")
        .keys(self.responseSchema())
    );
  }
});
