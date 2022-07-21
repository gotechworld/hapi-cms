import BaseHandler from "./base";

class City extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.city.index;
    this._esType = settings.city.type;
  }
}

module.exports = settings => {
  const controller = new City(settings, "City");
  return controller.routes();
};
