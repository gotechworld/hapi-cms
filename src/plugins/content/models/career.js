import Validation from "../validate/career";

module.exports = settings => {
  return {
    name: "CareerModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
