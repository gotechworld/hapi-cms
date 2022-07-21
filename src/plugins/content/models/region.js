import Validation from "../validate/region";

module.exports = settings => {
  return {
    name: "RegionModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
