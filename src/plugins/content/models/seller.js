import Validation from "../validate/seller";

module.exports = settings => {
  return {
    name: "SellerModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
