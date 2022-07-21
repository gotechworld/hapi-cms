import BaseHandler from "./base";

class Store extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.store.index;
    this._esType = settings.store.type;
  }
}

module.exports = settings => {
  const controller = new Store(settings, "Store");
  return controller.routes();
};
