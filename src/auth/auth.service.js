import knex from "../common/config/database.config";
import BcryptHelper from "../common/helper/bcrypt.helper";
import AccessTokensHelper from "../common/helper/access-tokens.helper";
import BadRequestException from "../common/exception/bad-request.exception";
import Helper from "../common/helper/helper";
import SocialiteFactory from "../common/socialite/socialite";
import { ROLE } from "../common/constant";

class AuthService {
  /**
   * create new user
   * @param {object} request
   * @returns
   */
  static async createNewAccount(request) {
    try {
      const user = await knex("users")
        .insert(request)
        .then((result) => knex("users").where("id", result[0]).first());
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /**
   * find user using phone
   * @param {string} phone
   */
  static async findUserByPhone(phone, role) {
    return await knex("users").where({ phone, role }).first();
  }

  static async findStoreByPhone(phone) {
    return await knex("stores").where({ phone }).first();
  }

  /**
   * Register user
   * @param {object} data
   * @returns
   */
  static async register(data) {
    // Create user
    return this.createNewAccount({
      ...data,
    });
  }

  /**
   * Refresh token
   * @param {object} data
   * @returns
   */
  static async refreshToken(data) {
    const refreshToken = await Helper.decrypt(data.refreshToken);
    const user = await knex("refresh_tokens")
      .select("users.*", "refresh_tokens.accessTokenId")
      .where("refresh_tokens.id", refreshToken)
      .where("refresh_tokens.revoked", false)
      .join(
        "access_tokens",
        "refresh_tokens.accessTokenId",
        "=",
        "access_tokens.id"
      )
      .innerJoin("users", "access_tokens.userId", "=", "users.id")
      .first();

    if (!user) {
      throw new BadRequestException(
        "This refresh token is expired, please login"
      );
    }

    await knex("refresh_tokens")
      .where("id", refreshToken)
      .update({ revoked: true });

    await knex("access_tokens")
      .where("id", user.accessTokenId)
      .update({ revoked: true });

    return {
      authentication: await AccessTokensHelper.generateTokenPairs(
        user.id,
        user.email
      ),
    };
  }

  /**
   * Social login without verification
   * @param {object} req
   * @returns
   */
  static async socialLoginWithoutVerification(req) {
    req.body.socialEmail = req.body.email ? req.body.email : null;
    req.body.email = `${req.body.providerKey}@${req.body.providerType}.com`;
    req.body.password = await BcryptHelper.bcryptPassword(req.body.providerKey);

    let user = await knex("users")
      .where("providerType", req.body.providerType)
      .where("providerKey", req.body.providerKey)
      .first();

    if (!user) {
      user = await this.createNewAccount(req.body);
    } else {
      await this.updateAccount(user, req.body);
    }
    const userInfo = await knex("users").where("id", user.id).first();
    return userInfo;
  }

  /**
   * Social login with authentication
   * @param {object} req
   */
  static async socialLogin(req) {
    const socialite = new SocialiteFactory(
      req.body.providerType,
      req.body.token,
      req.body
    );

    const socialUser = await socialite.generateUserFromToken();

    socialUser.providerType = req.body.providerType;
    socialUser.socialEmail = socialUser.email ? socialUser.email : null;
    socialUser.email = `${socialUser.providerKey}@${socialUser.providerType}.com`;

    let user = await knex("users")
      .where("providerType", req.body.providerType)
      .where("providerKey", socialUser.providerKey)
      .first();

    if (!user) {
      user = await this.createNewAccount(socialUser);
    } else {
      await this.updateAccount(user, socialUser);
    }

    const userInfo = await knex("users").where("id", user.id).first();
    return userInfo;
  }
}

export default AuthService;
