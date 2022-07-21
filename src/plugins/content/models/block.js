import Validation from "../validate/block";

module.exports = settings => {
  return {
    name: "BlockModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
