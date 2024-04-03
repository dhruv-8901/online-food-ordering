import constantsConfig from "../../common/config/constants.config";
import Helper from "../../common/helper/helper";

export default class SpecialItemModel {
  constructor(data) {
    return data.map((items) => ({
      storeItemId: items.id,
      storeId: items.storeId,
      name: items.name,
      description: items.description,
      price: items.price,
      categoryId: +items.categoryId,
      image: items.image ? constantsConfig.baseUrl(items.image) : null,
      isSpecial: Boolean(items.isSpecial),
      isFavourite: Boolean(items.isFavourite),
      startedOn: Helper.convertInUnixTimestamp(items.valid_from),
      expiredOn: Helper.convertInUnixTimestamp(items.valid_until),
      cuisines: items.cuisines.map((value) => ({
        id: value.id,
        name: value.name,
      })),
    }));
  }
}
