import FcmTokenService from "./fcm-token.service";
import FcmHelper from "../common/helper/fcm.helper";

class FcmTokenController {
  /**
   * register token
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async register(req, res) {
    await FcmTokenService.store(req);
    return res.send({ message: "Token added successfully." });
  }

  /**
   * send push
   * @param {object} req
   * @param {object} res
   */
  static async sendPush(req, res) {
    let tokens = [req.body.token];
    const payload = {
      notification: {
        title: req.body.title,
        body: req.body.message,
      },
    };
    await FcmHelper.sendNotification(tokens, payload);
    res.json({ data: req.body });
  }
}

export default FcmTokenController;
