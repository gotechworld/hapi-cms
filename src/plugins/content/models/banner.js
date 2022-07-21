import Validation from "../validate/banner";
import { isUndefined } from "lodash";

const parseBanner = banner => {
  if (!isUndefined(banner.images)) {
    banner.images.map(image => {
      image.file = "/media/ibanner" + image.file;

      return true;
    });
  }

  if (!isUndefined(banner.images_mobile)) {
    banner.images_mobile.map(image => {
      image.file = "/media/ibanner" + image.file;

      return true;
    });
  }

  if (!isUndefined(banner.images_tablet)) {
    banner.images_tablet.map(image => {
      image.file = "/media/ibanner" + image.file;

      return true;
    });
  }
};

module.exports = settings => {
  return {
    name: "BannerModel",
    index: settings.index,
    idKey: "id",
    validation: Validation.savePayload(),
    listeners: {
      after_find_one_by_id: evtData => parseBanner(evtData.result),
      after_find: evtData => {
        evtData.items.forEach(banner => parseBanner(banner));
      }
    }
  };
};
