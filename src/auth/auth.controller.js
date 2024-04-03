import moment from "moment";
import AuthService from "./auth.service";
import fcmConfig from "../common/config/fcm.config";

// Service
import UserService from "../users/user.service";

// Helper
import AccessTokensHelper from "../common/helper/access-tokens.helper";

// resources
import UserResource from "../users/resource/user.resource";
import AddressResource from "../customer-addresses/resource/address.resource";
import StoreLoginModel from "./resource/stores-login.resource";
import BadRequestException from "../common/exception/bad-request.exception";
import { ROLE } from "../common/constant";
import AddressService from "../customer-addresses/customer-addresses.service";
import knex from "../common/config/database.config";

class AuthController {
  /**
   * Register user
   * @param {object} req
   * @param {object} res
   */
  static async loginWithPhone(req, res) {
    const { role, idToken } = req.body;
    const decodedToken = await fcmConfig.auth().verifyIdToken(idToken);
    let user = await AuthService.findUserByPhone(
      decodedToken.firebase.identities.phone[0],
      // "+919558688745",
      role
    );
    if (user) {
      if (user.role === ROLE.STORE) {
        if (user.profileStatus === 2) {
          if (user.isApproved === 3) {
            return res.send({
              message:
                "Your restaurant requires approval. You will be notified via email when your restaurant is approved or rejected.",
            });
          }
          if (user.isApproved === 2) {
            return res.send({
              message: "Your restaurant rejected by the admin.",
            });
          }
        }
      }
    }
    if (!user) {
      user = await AuthService.register({
        phone: decodedToken.firebase.identities.phone[0],
        // phone: "+919558688745",
        role,
      });
    }

    user.authentication = await AccessTokensHelper.generateTokenPairs(
      user.id,
      user.phone,
      role
    );

    if (role === ROLE.CUSTOMER) {
      const userDefaultAddress = await UserService.findDefaultAddress(user.id);
      if (userDefaultAddress) {
        user.defaultAddress = new AddressResource(userDefaultAddress);
      }
    } else {
      const userDefaultAddress = await AddressService.storeAddress(user.id);
      if (userDefaultAddress.id) {
        user.defaultAddress = new AddressResource(userDefaultAddress);
      }
      const userFeedback = await knex("users")
        .select(
          knex.raw(
            `(SELECT AVG(rating) FROM feedbacks WHERE storeId = ${user.id}) AS avgRating`
          ),
          knex.raw(
            `(SELECT COUNT(*) FROM feedbacks WHERE storeId = ${user.id}) AS totalRating`
          )
        )
        .where("id", user.id);
      user.avgRating = userFeedback[0].avgRating;
      user.totalRating = userFeedback[0].totalRating;
    }

    res.send({ data: new UserResource(user) });
  }

  /**
   * Refresh token
   * @param {object} req
   * @param {object} res
   */
  static async refreshToken(req, res) {
    const data = await AuthService.refreshToken(req.body);
    res.json({ data: data });
  }

  /**
   * Social login without verification
   * @param {object} req
   * @param {object} res
   */
  static async socialLoginWithoutVerification(req, res) {
    const user = await AuthService.socialLoginWithoutVerification(req);
    user.authentication = await AccessTokensHelper.generateTokenPairs(
      user.id,
      user.email
    );
    res.json({ data: new UserResource(user) });
  }

  /**
   * social login with authentication
   * @param {object} req
   * @param {object} res
   */
  static async socialLogin(req, res) {
    const user = await AuthService.socialLogin(req);
    user.authentication = await AccessTokensHelper.generateTokenPairs(
      user.id,
      user.email
    );
    res.json({ data: new UserResource(user) });
  }

  static async phoneVerification(req, res) {
    const idToken = req.query.idToken;
    const role = ROLE.STORE;
    const decodedToken = await fcmConfig.auth().verifyIdToken(idToken);
    let user = await AuthService.findUserByPhone(
      decodedToken.firebase.identities.phone[0],
      // "+919558688745",
      role
    );
    if (user) {
      // return res.send({ userExist: true });
      return res.send({
        userExist: true,
        completedStep: user.profileStatus,
        id: user.id,
      });
    } else {
      // await AuthService.register({
      //   phone: decodedToken.firebase.identities.phone[0],
      //   role,
      // });
      return res.send({ userExist: false });
    }
  }
}
export default AuthController;
