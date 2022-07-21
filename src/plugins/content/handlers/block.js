import BaseHandler from "./base";

class Block extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.block.index;
    this._esType = settings.block.type;
  }
}

module.exports = settings => {
  const controller = new Block(settings, "Block");
  return controller.routes();
};
