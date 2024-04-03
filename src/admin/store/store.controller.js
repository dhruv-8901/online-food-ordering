import StoreService from "./store.service";
import UserResource from "../../users/resource/user.resource";
import { sendMail } from "../../common/helper/send-mail.helper";

import storeService from "../../stores/store.service";

class StoreController {
  /**
   * store list
   * @param {object} req
   * @param {object} res
   */
  static async getStore(req, res) {
    if (req.xhr) {
      const data = await StoreService.getStore(req);
      return res.json(data);
    }
    return res.render("admin/store", { page: "stores" });
  }

  /**
   * store details by id
   * @param {object} req
   * @param {object} res
   */
  static async getStoreById(req, res) {
    const data = await StoreService.getStoreById(req);
    return res.json({
      data: new UserResource(data),
    });
  }

  /**
   * store request list
   * @param {object} req
   * @param {object} res
   */
  static async getStoreRequest(req, res) {
    const storeApproveOrReject = await StoreService.storeApproveOrReject(
      req.params.storeId,
      req.query.status
    );

    const storeData = await storeService.checkStoreExist(req.params.storeId);

    const obj = {
      subject: "Restaurant Approval Status",
      to: storeData.email,
      data: {
        status: req.query.status,
      },
    };

    sendMail(obj);

    return res.redirect("/admin/store-request");
  }
}

export default StoreController;
