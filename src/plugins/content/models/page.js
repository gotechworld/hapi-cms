import Validation from "../validate/page";

module.exports = settings => {
  return {
    name: "PageModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
