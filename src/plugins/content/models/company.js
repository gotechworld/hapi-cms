import Validation from "../validate/company";

module.exports = settings => {
  return {
    name: "CompanyModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
