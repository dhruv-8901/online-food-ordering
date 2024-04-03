// Service
import FavouriteService from "./favourite.service";
import FavouriteStoreModel from "./resource/favourite-store.response";
import FavouriteStoreItemModel from "./resource/favourite-storeItem.response";
import FavouriteSpecialItemModel from "./resource/favourite-specialItem.response";

class FavouriteController {
  /**
   * Get favourite stores
   * @param {object} req
   * @param {object} res
   */
  static async getFavouriteStores(req, res) {
    const { data: storeData } = await FavouriteService.getFavouriteStores(
      req.query.perPage,
      req.query.currentPage,
      req.user.id
    );
    const { data: storeItemData } =
      await FavouriteService.getFavouriteStoreItem(
        req.query.perPage,
        req.query.currentPage,
        req.user.id
      );

    const favouriteStoreResponse = new FavouriteStoreModel(storeData);
    const favouriteStoreItemResponse = new FavouriteStoreItemModel(
      storeItemData
    );

    const allRecords = [];

    const data = allRecords.concat(
      favouriteStoreResponse,
      favouriteStoreItemResponse
    );

    return res.json({
      data,
    });
  }

  /**
   * Add-Remove Favourite Store
   * @param {object} req
   * @param {object} res
   */
  static async addRemoveFavouriteStore(req, res) {
    const data = await FavouriteService.addRemoveFavouriteStore(
      req.user.id,
      req.body.storeId
    );
    if (data) {
      res.status(200).json({ message: "Store added in favourite list.", data });
    } else {
      res
        .status(200)
        .json({ message: "Store remove from favourite list.", data });
    }
  }

  /**
   * Get favourite store item
   * @param {object} req
   * @param {object} res
   */
  static async getFavouriteStoreItem(req, res) {
    const { data, pagination: meta } =
      await FavouriteService.getFavouriteStoreItem(
        req.query.perPage,
        req.query.currentPage,
        req.user.id
      );

    return res.json({
      data,
      data: new FavouriteModel(data),
      meta,
    });
  }

  /**
   * Add-Remove Favourite Store Item
   * @param {object} req
   * @param {object} res
   */
  static async addRemoveFavouriteStoreItem(req, res) {
    const data = await FavouriteService.addRemoveFavouriteStoreItem(
      req.user.id,
      req.body.storeItemId
    );
    if (data) {
      res
        .status(200)
        .json({ message: "Storeitem added in favourite list.", data });
    } else {
      res
        .status(200)
        .json({ message: "Storeitem remove from favourite list.", data });
    }
  }

  /**
   * Add-Remove Favourite Special Item
   * @param {object} req
   * @param {object} res
   */
  static async addFavouriteSpecialItemDto(req, res) {
    const data = await FavouriteService.addFavouriteSpecialItemDto(
      req.user.id,
      req.body.specialItemId
    );
    if (data) {
      res
        .status(200)
        .json({ message: "specialItem added in favourite list.", data });
    } else {
      res
        .status(200)
        .json({ message: "specialItem remove from favourite list.", data });
    }
  }
}

export default FavouriteController;
