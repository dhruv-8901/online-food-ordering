// Service
import StoreItemByCuisineIdModel from "./resource/stores-items-byCuisineId.resource";
import SpecialItemModel from "./resource/special-items.resource";
import SpecialItemService from "./special-items.service";

class SpecialItemsController {
  /**
   * store items details
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async getItems(req, res) {
    const data = await SpecialItemService.getItems(req.user.id);
    return res.json({ data: new SpecialItemModel(data) });
  }

  /**
   * Get store Items By Cuisine
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async getItemsByCuisineId(req, res) {
    const { data, pagination } = await SpecialItemService.getItemsByCuisineId(
      req.query.perPage,
      req.query.currentPage,
      req.params.cuisineId,
      req.user.id
    );

    return res.send({
      data: new StoreItemByCuisineIdModel(data),
      meta: pagination,
    });
  }

  /**
   * Add store item
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async addItem(req, res) {
    await SpecialItemService.addItem(req.user, req.body, req.files.image);
    return res.json({ message: "Item added successfully" });
  }

  /**
   * Update stores item
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async updateItem(req, res) {
    await SpecialItemService.updateItem(req.params.id, req.body, req.files);
    return res.json({ message: "Item updated successfully" });
  }

  /**
   * Delete stores items
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deleteItems(req, res) {
    await SpecialItemService.deleteItems(req.params.ids);
    return res.json({ message: "Item deleted successfully" });
  }
}

export default SpecialItemsController;
