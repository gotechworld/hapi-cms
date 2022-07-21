import BaseHandler from "./base";

class Career extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.career.index;
    this._esType = settings.career.type;
  }
}

module.exports = settings => {
  const controller = new Career(settings, "Career");
  return controller.routes();
};
