import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import knex from "../config/database.config";
import moment from "moment";
import Helper from "./helper";
import { APP_KEY } from "../config/constants.config";

const expiresIn = "365 days";

class AccessTokensHelper {
  /**
   * Generate access & refresh token
   * @param {integer} userId
   * @param {string} phone
   * @returns
   */
  static async generateTokenPairs(userId, phone, role) {
    const accessToken = await this.createAccessToken(userId, phone, role);
    const decodedToken = jwt.decode(accessToken);
    const refreshToken = await this.createRefreshToken(
      decodedToken.jti,
      decodedToken.exp,
      role
    );
    return {
      accessToken,
      refreshToken,
      expireAt: decodedToken.exp,
    };
  }

  /**
   * Generate access tokens
   * @param {integer} userId
   * @param {string} email
   */
  static async createAccessToken(userId, phone, role) {
    const jti = randomBytes(32).toString("hex");
    const jwtToken = jwt.sign({ sub: userId, jti: jti, phone: phone, role: role }, APP_KEY, {
      expiresIn: expiresIn,
    });

    // save
    const decodedJwtToken = jwt.decode(jwtToken);

    await knex("access_tokens").insert({
      id: jti,
      userId,
      expiresAt: moment.unix(decodedJwtToken.exp).format("YYYY-MM-DD"),
    });

    return jwtToken;
  }

  /**
   * Generate refresh token
   * @param {string} jti
   * @param {timestamp} expiresAt
   * @returns
   */
  static async createRefreshToken(jti, expiresAt, role) {
    const id = randomBytes(32).toString("hex");
    await knex("refresh_tokens").insert({
      id,
      accessTokenId: jti,
      expiresAt: moment
        .unix(expiresAt)
        .add("21 days")
        .format("YYYY-MM-DD HH:mm:ss"),
    });
    return Helper.encrypt(id);
  }
}

export default AccessTokensHelper;
