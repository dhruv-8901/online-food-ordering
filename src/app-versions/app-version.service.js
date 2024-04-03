import compareVersions from "compare-versions";
import knex from "../common/config/database.config";
import { APP_VERSION_STATUS } from "../common/config/constants.config";
import BadRequestException from "../common/exception/bad-request.exception";

class AppVersionService {
  static async checkVersion(version, type) {
    let flag = false;
    const appVersion = await knex("app_versions").where({ type }).first();

    if (!appVersion) {
      throw new BadRequestException(
        "No version record exist in the database to compare against"
      );
    }

    const minVersionCompare = compareVersions.compare(
      version,
      appVersion.minVersion,
      "<"
    );

    if (minVersionCompare) {
      flag = APP_VERSION_STATUS.FORCE_UPDATE;
    } else if (
      compareVersions.compare(appVersion.minVersion, version, "<=") &&
      compareVersions.compare(version, appVersion.currentVersion, "<")
    ) {
      flag = APP_VERSION_STATUS.OPTIONAL_UPDATE;
    } else {
      flag = APP_VERSION_STATUS.NO_UPDATE;
    }

    return { flag, appVersion };
  }
}

export default AppVersionService;
