import knex from "../../common/config/database.config";
import FcmHelper from "../../common/helper/fcm.helper";

class SendNotificationService {
  static async send(body) {
    const tokens = await knex("fcm_tokens").pluck("token");
    const payload = {
      notification: {
        title: body.title,
        body: body.message,
      },
    };
    await FcmHelper.sendNotification(tokens, payload);
  }
}

export default SendNotificationService;
