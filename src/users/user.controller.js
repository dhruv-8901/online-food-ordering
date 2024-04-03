import UserService from "./user.service";
import fileHelper from "../common/helper/file.helper";
import fcmConfig from "../common/config/fcm.config";
import ConflictRequestException from "../common/exception/conflict-request.exception";

// resource
import UserResource from "./resource/user.resource";
import AddressResource from "../customer-addresses/resource/address.resource";
import { ROLE } from "../common/constant";
import BadRequestException from "../common/exception/bad-request.exception";
import AddressService from "../customer-addresses/customer-addresses.service";
import knex from "../common/config/database.config";

class UserController {
  /**
   * get user details
   * @param {object} req
   * @param {object} res
   */
  static async getUser(req, res) {
    const user = await UserService.find(req.user.id);
    const userDefaultAddress = await UserService.findDefaultAddress(
      req.user.id
    );
    if (userDefaultAddress) {
      user.defaultAddress = new AddressResource(userDefaultAddress);
    }
    if (req.user.role === ROLE.STORE) {
      user.defaultAddress = new AddressResource(
        await AddressService.storeAddress(req.user.id)
      );
    }
    res.json({
      data: new UserResource(user),
    });
  }

  /**
   * update user details
   * @param {object} req
   * @param {object} res
   */
  static async update(req, res) {
    const data = {
      firstName: req.body.firstName ? req.body.firstName : req.user.firstName,
      lastName: req.body.lastName ? req.body.lastName : req.user.lastName,
      storeName: req.body.storeName ? req.body.storeName : req.user.storeName,
      email: req.body.email ? req.body.email : req.user.email,
      storeCountryCode: req.body.storeCountryCode
        ? req.body.storeCountryCode
        : req.user.storeCountryCode,
      storeContactNumber: req.body.storeContactNumber
        ? req.body.storeContactNumber
        : req.user.storeContactNumber,
      isDetailsSkip:
        req.body.isDetailsSkip && req.body.isDetailsSkip === "true" ? 1 : 0,
      isAddressSkip:
        req.body.isAddressSkip && req.body.isAddressSkip === "true" ? 1 : 0,
    };
    if (req.body.idToken && req.user.role === ROLE.STORE) {
      throw new BadRequestException(
        "You are not able to change your mobile number , please contact admin."
      );
    }

    const userDetails = await knex("users").where({ id: req.user.id }).first();

    if (userDetails.profileStatus == 0) {
      data.profileStatus = 1;
    }
    if (req.user.role === ROLE.STORE) {
      const storeAddressExist = await AddressService.checkStoreAddressexist(
        req.user.id
      );
      if (!storeAddressExist) {
        if (!req.body.addressLine1) {
          throw new BadRequestException("address is required");
        }
        data.profileStatus = 1;
        await AddressService.storeAddressCreateOrUpdate(req.user, req.body);
      } else {
        await AddressService.storeAddressCreateOrUpdate(req.user, req.body);
      }
    }

    if (req.body.idToken !== "" && req.body.idToken !== undefined) {
      const decodedToken = await fcmConfig
        .auth()
        .verifyIdToken(req.body.idToken);
      const user = await UserService.findUserByPhoneWithotId(
        decodedToken.firebase.identities.phone[0],
        req.user.id
      );
      if (user) {
        throw new ConflictRequestException(
          "This phone number is already register with us"
        );
      }

      if (req.user.phone !== decodedToken.firebase.identities.phone[0]) {
        data.phone = decodedToken.firebase.identities.phone[0];
        // data.phone = "+91955868874521";
      }
    }

    if (req.files) {
      if (req.files.profileImage) {
        if (req.user.profileImage) {
          await fileHelper.deleteFile(req.user.profileImage);
        }
        data.profileImage = await fileHelper.uploadFile(
          "user",
          req.files.profileImage.data,
          req.files.profileImage.mimetype
        );
      }
      if (req.files.bgImage && req.user.role == ROLE.STORE) {
        if (req.user.bgImage) {
          await fileHelper.deleteFile(req.user.bgImage);
        }
        await fileHelper.deleteFile(req.user.bgImage);
        data.bgImage = await fileHelper.uploadFile(
          "user",
          req.files.bgImage.data,
          req.files.bgImage.mimetype
        );
      }
    }

    const user = await UserService.updateUser(data, req.user.id);
    const userDefaultAddress = await UserService.findDefaultAddress(
      req.user.id
    );
    if (userDefaultAddress) {
      user.defaultAddress = new AddressResource(userDefaultAddress);
    }
    if (req.user.role === ROLE.STORE) {
      user.defaultAddress = new AddressResource(
        await AddressService.storeAddress(req.user.id)
      );
    }
    res.json({ data: new UserResource(user) });
  }

  /**
   * logout user
   * @param {object} req
   * @param {object} res
   */
  static async logout(req, res) {
    await UserService.logout(req.user);
    res.json({
      message: "Logout successfully.",
    });
  }
}

export default UserController;
