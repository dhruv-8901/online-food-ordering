import knex from "../common/config/database.config";
import ConflictRequestException from "../common/exception/conflict-request.exception";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, ROLE } from "../common/constant";
import Helper from "../common/helper/helper";
import StoreItemsService from "../store-items/store-items.service";
import StoreService from "../stores/store.service";
import BadRequestException from "../common/exception/bad-request.exception";

class SearchHistoryService {
  /**
   * Get Search History
   * @param {*} userId
   * @returns
   */
  static async getSearchHistory(userId) {
    const items = await knex("search_history")
      .select(
        "search_history.type AS type",
        "search_history.id AS searchId",
        "store_items.id AS storeItemId",
        "store_items.name AS storeItemName",
        "store_items.image AS storeItemImage",
        "users.id AS storeId",
        "users.storeName AS storeName",
        "users.profileImage AS storeImage"
      )
      .leftJoin("store_items", function () {
        this.on("store_items.id", "search_history.storeItemId").onNull(
          "search_history.storeId"
        );
      })
      .leftJoin("users", function () {
        this.on("users.id", "search_history.storeId").onNull(
          "search_history.storeItemId"
        );
      })
      .whereNull("store_items.deletedAt")
      // .where("users.role", ROLE.STORE)
      .where({ userId })
      .orderBy("search_history.createdAt", "desc")
      .limit(10);
    return items;
  }

  /**
   * Add search history
   * @param {*} storeId
   * @param {*} storeItemId
   * @param {*} type
   */
  static async addSearchHistory(userId, storeId, storeItemId, type) {
    let data = { userId, type };
    const exist = await this.checkSearchHistoryExist(
      userId,
      type,
      storeId,
      storeItemId
    );
    if (exist) return;

    if (type === 1) {
      const store = await StoreService.checkStoreExist(storeId);
      if (!store) {
        throw new BadRequestException("store not found");
      }
      data.storeId = storeId;
    } else {
      const storeItem = await StoreItemsService.findById(storeItemId);
      if (!storeItem) {
        throw new BadRequestException("store item not found");
      }
      data.storeItemId = storeItemId;
    }
    return await knex("search_history").insert(data);
  }

  /**
   * Check Search History exist or not
   * @param {*} userId
   * @param {*} type
   * @param {*} storeId
   * @param {*} storeItemId
   */
  static async checkSearchHistoryExist(userId, type, storeId, storeItemId) {
    if (type === 1) {
      const existStore = await knex("search_history")
        .where("type", type)
        .where("storeId", storeId)
        .where("userId", userId)
        .first();
      if (existStore) {
        await this.updateAlreadySearched(existStore.id);
      }
      return existStore;
    } else {
      const existStoreItem = await knex("search_history")
        .where("type", type)
        .where("storeItemId", storeItemId)
        .where("userId", userId)
        .first();
      if (existStoreItem) {
        await this.updateAlreadySearched(existStoreItem.id);
      }
      return existStoreItem;
    }
  }

  static async updateAlreadySearched(id) {
    await knex("search_history")
      .update("createdAt", new Date())
      .where("id", id);
  }
}

export default SearchHistoryService;

// if (type === 1) {
//   const store = await knex("search_history")
//     .where("search_history.type", type)
//     .where("search_history.storeId", storeId)
//     .where("search_history.userId", userId);
//   return store;
// } else {
//   const storeItem = await knex("search_history")
//     .where("search_history.type", type)
//     .where("search_history.storeItemId", storeItemId)
//     .where("search_history.userId", userId);

//   console.log(storeItem);
//   if (storeItem.length > 0) {
//     console.log(storeItem.id);
//     await knex("search_history")
//       .update("search_history.createdAt", new Date())
//       .where("search_history.id", storeItem[0].id);
//   }
//   return storeItem;
// }
