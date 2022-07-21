module.exports = settings => {
  const PageCtrl = require("./handlers/page")(settings);
  const BlockCtrl = require("./handlers/block")(settings);
  const BannerCtrl = require("./handlers/banner")(settings);
  const RegionsCtrl = require("./handlers/region")(settings);
  const CitiesCtrl = require("./handlers/city")(settings);
  const StoresCtrl = require("./handlers/store")(settings);
  const CompaniesCtrl = require("./handlers/companies")(settings);
  const SellersCtrl = require("./handlers/seller")(settings);
  const CareersCtrl = require("./handlers/career")(settings);

  return [
    {
      method: "GET",
      path: "/pages/{id}",
      config: PageCtrl.findById
    },
    {
      method: "GET",
      path: "/pages",
      config: PageCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/pages",
      config: PageCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/pages",
      config: PageCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/blocks/{id}",
      config: BlockCtrl.findById
    },
    {
      method: "GET",
      path: "/blocks",
      config: BlockCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/blocks",
      config: BlockCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/blocks",
      config: BlockCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/banners/{id}",
      config: BannerCtrl.findById
    },
    {
      method: "GET",
      path: "/banners",
      config: BannerCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/banners",
      config: BannerCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/banners",
      config: BannerCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/regions/{id}",
      config: RegionsCtrl.findById
    },
    {
      method: "GET",
      path: "/regions",
      config: RegionsCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/regions",
      config: RegionsCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/regions",
      config: RegionsCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/cities/{id}",
      config: CitiesCtrl.findById
    },
    {
      method: "GET",
      path: "/cities",
      config: CitiesCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/cities",
      config: CitiesCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/cities",
      config: CitiesCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/stores/{id}",
      config: StoresCtrl.findById
    },
    {
      method: "GET",
      path: "/stores",
      config: StoresCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/stores",
      config: StoresCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/stores",
      config: StoresCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/companies/{id}",
      config: CompaniesCtrl.findById
    },
    {
      method: "GET",
      path: "/companies",
      config: CompaniesCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/companies",
      config: CompaniesCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/companies",
      config: CompaniesCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/sellers/{id}",
      config: SellersCtrl.findById
    },
    {
      method: "GET",
      path: "/sellers",
      config: SellersCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/sellers",
      config: SellersCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/sellers",
      config: SellersCtrl.bulkDelete
    },
    {
      method: "GET",
      path: "/careers/{id}",
      config: CareersCtrl.findById
    },
    {
      method: "GET",
      path: "/careers",
      config: CareersCtrl.findByFilters
    },
    {
      method: "POST",
      path: "/careers",
      config: CareersCtrl.bulkSave
    },
    {
      method: "DELETE",
      path: "/careers",
      config: CareersCtrl.bulkDelete
    }
  ];
};
