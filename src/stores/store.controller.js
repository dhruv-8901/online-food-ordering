// resource
import StoreResource from "./resource/store.resource";
import knex from "../common/config/database.config";
import LatestStoreResource from "./resource/Store4.resource";

import { HTTP_BAD_REQUEST } from "../common/config/constants.config";

// Service
import StoreService from "./store.service";
import StoreItemsService from "../store-items/store-items.service";
import DropdownService from "../dropdowns/dropdowns.service";
import StoreItemModel from "../store-items/resource/store-items.resource";
import CuisineModel from "../store-items/resource/get-cuisine.resource";
import StoreOrder from "./resource/store.order.resource";
import customerStoreItemModel from "../store-items/resource/customer-store-items.resource";
import SearchHistoryModel from "./resource/search_history.response";
import AddressService from "../customer-addresses/customer-addresses.service";
import StoreReviewedModel from "./resource/Store2.resource";
import LatestStoreDeatilsByIdModel from "./resource/store5.resource";

class StoreController {
  /**
   * Get stores
   * @param {object} req
   * @param {object} res
   */
  static async getStores(req, res) {
    const data = await StoreService.getStores(req.user.id);
    const storeItems = await StoreItemsService.getStoreItems(
      req.query.search,
      req.user.id
    );
    const cuisine = await DropdownService.getCuisine(req.query.search);

    return res.json({
      data: {
        stores: new LatestStoreResource(data),
        storeItems: new StoreItemModel(storeItems),
        cuisines: new CuisineModel(cuisine),
      },
    });
  }

  /**
   * Get store item list
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getStoresList(req, res) {
    const { data, meta } = await StoreService.getStoresList(
      req.user.id,
      req.query.perPage,
      req.query.currentPage
    );
    return res.send({ data: new LatestStoreResource(data), meta });
  }

  /**
   * Get store list
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getStoreItemsList(req, res) {
    const { data, meta } = await StoreItemsService.getStoreItemsList(
      req.query.search,
      req.user.id,
      req.query.perPage,
      req.query.currentPage
    );
    return res.send({ data: new StoreItemModel(data), meta });
  }

  /**
   * Get stores by sorting
   * @param {object} req
   * @param {object} res
   */
  static async getStoreBySorting(req, res) {
    const data = await StoreService.getStoreBySorting(
      req.user.id,
      req.query.search,
      req.query.sort
    );

    return res.json({
      data: new StoreResource(data),
    });
  }

  /**
   * Global search
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getStoresBySearch(req, res) {
    const stores = await StoreService.getStoreBySorting(
      req.user.id,
      req.query.search,
      req.query.sort
    );
    const storeItems = await StoreItemsService.getStoreItems(
      req.query.search,
      req.user.id
    );
    const cuisines = await DropdownService.getCuisine(req.query.search);

    const storeResponse = new StoreResource(stores);
    const storeItemResponse = new StoreItemModel(storeItems);
    const cuisineResponse = new CuisineModel(cuisines);

    const allRecords = [];
    const data = allRecords.concat(
      storeResponse,
      storeItemResponse,
      cuisineResponse
    );

    return res.send({ data });
  }

  /**
   * Get storeItem
   * @param {object} req
   * @param {object} res
   */
  static async getStoresItems(req, res) {
    const storeItems = await StoreItemsService.getItems(
      req.params.storeId,
      req.query.storeItemId,
      req.query.isSpecial,
      req.user.id
    );
    const store = await StoreService.getStoreByIdForHome(
      req.params.storeId,
      req.user.id
    );

    return res.json({
      data: {
        storeDetails: new LatestStoreDeatilsByIdModel(store),
        storeItems: new customerStoreItemModel(storeItems),
      },
    });
  }

  /**
   * Get store by id
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async getStoreDetails(req, res) {
    const data = await StoreService.getStoreDetails(req.user.id);
    return res.json(new StoreResource(data));
  }

  /**
   * Update stores
   * @param {object} req
   * @param {object} res
   */
  static async updateStoreDetails(req, res) {
    await StoreService.updateStoreDetails(req.user, req.body, req.files);
    return res.json({
      message: "success",
    });
  }

  /**
   * Get store details
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async getDetails(req, res) {
    const store = await StoreService.findById(
      req.params.storeId,
      req.query.userId
    );
    if (!store) {
      return res.status(HTTP_BAD_REQUEST).json({
        message: "No store found.",
      });
    }
    return res.json({
      data: new StoreResource(store),
    });
  }

  /**
   * Get store Order Details
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getStoreOrders(req, res) {
    const { data, meta } = await StoreService.getStoreOrders(
      req.query.status,
      req.query.perPage,
      req.query.currentPage,
      req.user.id
    );

    return res.send({ data: new StoreOrder(data), meta });
  }

  /**
   * Update Order Status
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async updateStoreOrder(req, res) {
    const data = await StoreService.updateStoreOrder(
      req.body.orderId,
      req.body.status,
      req.user.id
    );

    return res.send({ data: new StoreOrder(data) });
  }

  /**
   * Get Previous Orders details
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getPreviousOrders(req, res) {
    const { data, meta } = await StoreService.getPreviousOrders(
      req.query.perPage,
      req.query.currentPage,
      req.user.id
    );
    return res.send({ data: new StoreOrder(data), meta });
  }

  /**
   * Get search history
   * @param {object} req
   * @param {object} res
   */
  static async getSearchHistory(req, res) {
    const data = await StoreService.getSearchHistory(req.user.id);
    return res.json({
      data,
    });
    // return res.json({
    //   data: new SearchHistoryModel(data),
    // });
  }

  /**
   * Add search history
   * @param {object} req
   * @param {object} res
   */
  static async addSearchHistory(req, res) {
    const data = await StoreService.addSearchHistory(
      req.user.id,
      req.body.storeId,
      req.body.storeItemId,
      req.body.type
    );
    return res.json({
      message: "success",
    });
  }

  /**
   * Popular Store Listing
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getPopularStores(req, res) {
    const data = await StoreService.getPopularStores(req.user.id);
    return res.json({ data: new StoreResource(data) });
  }
}

export default StoreController;
