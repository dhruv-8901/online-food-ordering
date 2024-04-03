import knex from "../common/config/database.config";
import { ROLE } from "../common/constant";
import NotFoundException from "../common/exception/not-found.exception";
import SpecialItemsService from "../special-items/special-items.service";
import StoreItemsService from "../store-items/store-items.service";
import StoreService from "../stores/store.service";

class FavouriteService {
  /**
   * Get favourite store list
   * @param {integer} id
   * @returns
   */
  static async getFavouriteStores(
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    userId
  ) {
    return await knex("users")
      .select("users.*", "favourite_stores.type AS type")
      .leftJoin("favourite_stores", "users.id", "favourite_stores.storeId")
      .where({
        "favourite_stores.userId": userId,
      })
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });
  }

  /**
   * Add/Remove favourite store
   * @param {integer} userId
   * @param {integer} storeId
   */
  static async addRemoveFavouriteStore(userId, storeId) {
    const checkstore = await StoreService.checkStoreExist(storeId);

    if (!checkstore) {
      throw new NotFoundException("store Not found.");
    }

    const checkstoreFavourite = await knex("favourite_stores").where({
      userId,
      storeId,
    });
    if (checkstoreFavourite.length > 0) {
      await knex("favourite_stores")
        .where({
          userId,
          storeId,
        })
        .del();
      return false;
    } else {
      await knex("favourite_stores").insert({
        userId,
        storeId,
      });
      return true;
    }
  }

  /**
   * Get favourite store item list
   * @param {integer} id
   * @returns
   */
  static async getFavouriteStoreItem(
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    userId
  ) {
    return await knex("store_items")
      .leftJoin(
        "favourite_storeitems",
        "store_items.id",
        "favourite_storeitems.storeItemId"
      )
      .where({
        "favourite_storeitems.userId": userId,
      })
      .whereNull("deletedAt")
      .select(
        "store_items.*",
        knex.raw(
          `(SELECT storeName FROM users WHERE users.id = store_items.storeId ) AS storeName`
        ),
        "favourite_storeitems.type AS type"
      )
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });
  }

  /**
   * Add/Remove favourite store item
   * @param {integer} userId
   * @param {integer} storeId
   */
  static async addRemoveFavouriteStoreItem(userId, storeItemId) {
    const checkstoreitem = await StoreItemsService.findById(storeItemId);

    if (!checkstoreitem) {
      throw new NotFoundException("storeItem Not found.");
    }

    const checkStoreItemFavourite = await knex("favourite_storeitems").where({
      userId,
      storeItemId,
    });
    if (checkStoreItemFavourite.length > 0) {
      await knex("favourite_storeitems")
        .where({
          userId,
          storeItemId,
        })
        .del();
      return false;
    } else {
      await knex("favourite_storeitems").insert({
        userId,
        storeItemId,
      });
      return true;
    }
  }

  /**
   * Get favourite special item list
   * @param {integer} id
   * @returns
   */
  static async getFavouriteSpecialItem(
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    userId
  ) {
    return await knex("special_items")
      .leftJoin(
        "favourite_specialitems",
        "special_items.id",
        "favourite_specialitems.specialItemId"
      )
      .where({
        "favourite_specialitems.userId": userId,
      })
      .select(
        "special_items.*",
        knex.raw(
          `(SELECT storeName FROM users WHERE users.id = special_items.storeId ) AS storeName`
        ),
        "favourite_specialitems.type AS type"
      )
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });
  }

  /**
   * Add/Remove favourite store item
   * @param {integer} userId
   * @param {integer} storeId
   */
  static async addFavouriteSpecialItemDto(userId, specialItemId) {
    const checkspecialitem = await SpecialItemsService.findById(specialItemId);

    if (!checkspecialitem) {
      throw new NotFoundException("specialItem Not found.");
    }

    const checkSpecialItemFavourite = await knex(
      "favourite_specialitems"
    ).where({
      userId,
      specialItemId,
    });
    if (checkSpecialItemFavourite.length > 0) {
      await knex("favourite_specialitems")
        .where({
          userId,
          specialItemId,
        })
        .del();
      return false;
    } else {
      await knex("favourite_specialitems").insert({
        userId,
        specialItemId,
      });
      return true;
    }
  }
}

export default FavouriteService;
