import BaseHandler from "./base";

class Company extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.company.index;
    this._esType = settings.company.type;
  }
}

module.exports = settings => {
  const controller = new Company(settings, "Company");
  return controller.routes();
};
