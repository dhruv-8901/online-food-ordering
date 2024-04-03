// Service
import StoreItemByCuisineIdModel from "./resource/stores-items-byCuisineId.resource";
import StoreItemModel from "./resource/store-items.resource";
import StoreItemService from "./store-items.service";
import SpecialItemModel from "./resource/special-items.resource";
import NewStoreItemByCuisineIdModel from "./resource/new-stores-items-byCuisineId.resource";

class StoreItemsController {
  /**
   * store items details
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async getItems(req, res) {
    // const isSpecial = req.query.isSpecial.toString();
    const data = await StoreItemService.getItems(
      req.user.id,
      req.query.storeItemId,
      // isSpecial,
      req.query.isSpecial
    );
    return res.json({ data: new StoreItemModel(data) });
  }

  /**
   * Get store Items By Cuisine
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async getItemsByCuisineId(req, res) {
    const { data, pagination } = await StoreItemService.getItemsByCuisineId(
      req.query.perPage,
      req.query.currentPage,
      req.params.cuisineId,
      req.user.id
    );

    return res.send({
      data: new NewStoreItemByCuisineIdModel(data),
      meta: pagination,
    });
  }

  /**
   * Get Previous Special Item lIst
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async getPreviousSpecialItem(req, res) {
    const data = await StoreItemService.getPreviousSpecialItem(
      req.user.id,
      req.query.storeItemId
    );

    return res.json({ data: new SpecialItemModel(data) });
  }

  static async reusePreviousSpecialItem(req, res) {
    await StoreItemService.reusePreviousSpecialItem(
      req.user.id,
      req.body.storeItemId,
      req.body.valid_from,
      req.body.valid_until
    );
    return res.json({ message: "SpecialItem Reuse Successfully" });
  }

  /**
   * Add store item
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async addItem(req, res) {
    await StoreItemService.addItem(
      req.user,
      req.body,
      req.files.image,
      req.files.bgimage
    );
    return res.json({ message: "Item added successfully" });
  }

  /**
   * Update stores item
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async updateItem(req, res) {
    await StoreItemService.updateItem(req.params.id, req.body, req.files);
    return res.json({ message: "Item updated successfully" });
  }

  /**
   * Delete stores items
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deleteItems(req, res) {
    await StoreItemService.deleteItems(req.params.ids);
    return res.json({ message: "Item deleted successfully" });
  }
}

export default StoreItemsController;
