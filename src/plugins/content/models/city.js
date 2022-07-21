import Validation from "../validate/city";

module.exports = settings => {
  return {
    name: "CityModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload()
  };
};
