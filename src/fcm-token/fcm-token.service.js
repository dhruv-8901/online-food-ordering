import knex from "../common/config/database.config";

class FcmTokenService {
  static async store(req) {
    const token = await knex("fcm_tokens")
      .where({ userId: req.user.id, deviceId: req.body.deviceId })
      .first();
    if (!token) {
      await knex("fcm_tokens").insert({
        token: req.body.token,
        deviceId: req.body.deviceId,
        userId: req.user.id,
      });
    } else {
      await knex("fcm_tokens")
        .update({
          token: req.body.token,
          deviceId: req.body.deviceId,
        })
        .where({ userId: req.user.id, deviceId: req.body.deviceId });
    }
  }
}

export default FcmTokenService;
