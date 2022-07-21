import Validation from "../validate/store";

module.exports = settings => {
  return {
    name: "StoreModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
