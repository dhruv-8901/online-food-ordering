import StoreService from "./store-request.service";

class StoreController {
  /**
   * store request list
   * @param {object} req
   * @param {object} res
   */
  static async getStoreRequest(req, res) {
    if (req.xhr) {
      const data = await StoreService.getStoreRequest(req);
      return res.json(data);
    }
    return res.render("admin/request", { page: "REQUESTS" });
  }
}

export default StoreController;
