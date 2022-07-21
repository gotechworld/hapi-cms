import BaseHandler from "./base";

class Region extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.region.index;
    this._esType = settings.region.type;
  }
}

module.exports = settings => {
  const controller = new Region(settings, "Region");
  return controller.routes();
};
