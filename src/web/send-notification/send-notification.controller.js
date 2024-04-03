import SendNotificationService from "./send-notification.service";

class SendNotificationController {
  /**
   * Send notification page
   * @param {object} req
   * @param {object} res
   */
  static async index(req, res) {
    return res.render("admin/send-notification", { page: "send-notification" });
  }

  static async send(req, res) {
    await SendNotificationService.send(req.body);
    res.send({ message: "Notification sent successfully." });
  }
}

export default SendNotificationController;
