import BaseHandler from "./base";

class Page extends BaseHandler {
  constructor(settings, type) {
    super(settings, type);
    this._esIndex = settings.page.index;
    this._esType = settings.page.type;
  }

  async getBanners(pandaEsOrm, pandaEs, data, ids) {
    const bannerModel = pandaEsOrm.getModel("BannerModel");
    const result = await bannerModel.find(
      new pandaEs.query({
        query: {
          constant_score: {
            filter: {
              terms: {
                id: ids
              }
            }
          }
        }
      })
    );
    data.banners = result.map(itm => itm._data);
  }

  async after_findById(pandaEsOrm, pandaEs, data) {
    const bannerIds = data.banners;

    if (bannerIds) {
      await this.getBanners(pandaEsOrm, pandaEs, data, bannerIds);
    }
  }

  async after_findByFilters(pandaEsOrm, pandaEs, response) {
    for (const page of response) {
      const bannerIds = page._data.banners;
      if (bannerIds) {
        await this.getBanners(pandaEsOrm, pandaEs, page._data, bannerIds);
      }
    }
  }
}

module.exports = settings => {
  const controller = new Page(settings, "Page");
  return controller.routes();
};
