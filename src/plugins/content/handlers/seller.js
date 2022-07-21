import BaseHandler from "./base";

class Seller extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.seller.index;
    this._esType = settings.seller.type;
  }
}

module.exports = settings => {
  const controller = new Seller(settings, "Seller");
  return controller.routes();
};
