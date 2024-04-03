import AppVersionService from "./app-version.service";
import FcmHelper from "../common/helper/fcm.helper";
import Helper from "../common/helper/helper";
import {
  APP_VERSION_STATUS,
  APP_VERSION_MSG,
} from "../common/config/constants.config";

class AppVersionController {
  static async checkVersion(req, res) {
    const version = await AppVersionService.checkVersion(
      req.body.appVersion,
      req.body.type
    );
    let message = APP_VERSION_MSG.NO_UPDATE;
    if (version.flag === APP_VERSION_STATUS.FORCE_UPDATE) {
      message = APP_VERSION_MSG.FORCE_UPDATE;
    } else if (version.flag === APP_VERSION_STATUS.OPTIONAL_UPDATE) {
      message = APP_VERSION_MSG.OPTIONAL_UPDATE;
    }
    return res.send({
      message: message,
      status: version.flag,
      app_link: version.appVersion.appLink
    });
  }
}

export default AppVersionController;
