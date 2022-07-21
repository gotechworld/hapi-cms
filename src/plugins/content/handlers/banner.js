import BaseHandler from "./base";

class Banner extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.banner.index;
    this._esType = settings.banner.type;
  }
}

module.exports = settings => {
  const controller = new Banner(settings, "Banner");
  return controller.routes();
};
