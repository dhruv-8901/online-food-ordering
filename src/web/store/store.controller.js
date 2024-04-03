import StoreService from "./store.service";
import UserResource from "../../users/resource/user.resource";
import BadRequestException from "../../common/exception/bad-request.exception";
import UserService from "../../users/user.service";
import fcmConfig from "../../common/config/fcm.config";
import { ROLE } from "../../common/constant";
import knex from "../../common/config/database.config";
import ConflictRequestException from "../../common/exception/conflict-request.exception";
import NotFoundException from "../../common/exception/not-found.exception";
import storeTimingService from "../../stores-timing/stores-timing.service";

class StoreController {
  /**
   * store list
   * @param {object} req
   * @param {object} res
   */
  static async getStore(req, res) {
    if (req.xhr) {
      const data = await StoreService.getStore(req);
      return res.json(data);
    }
    return res.render("admin/store", { page: "stores" });
  }

  /**
   * store details by id
   * @param {object} req
   * @param {object} res
   */
  static async getStoreById(req, res) {
    const data = await StoreService.getStoreById(req);
    return res.json({
      data: new UserResource(data),
    });
  }

  /**
   * store request list
   * @param {object} req
   * @param {object} res
   */
  static async getStoreRequest(req, res) {
    const storeApproveOrReject = await StoreService.storeApproveOrReject(
      req.params.storeId,
      req.query.action
    );

    return res.redirect("/admin/store-request");
  }

  /**
   * Register Restaurant
   * @param {*} res
   * @param {*} res
   */
  static async registerRestaurant(req, res) {
    try {
      const decodedToken = await fcmConfig
        .auth()
        .verifyIdToken(req.body.idToken);

      // const restaurant = await await knex("users")
      //   .where({
      //     phone: decodedToken.firebase.identities.phone[0],
      //     role: ROLE.STORE,
      //   })
      //   .first();
      // console.log("step 3");

      // if (restaurant) {
      //   throw new BadRequestException(
      //     "This phone number is already register with us"
      //   );
      // }
      // console.log("step 4");

      const restaurantData = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        storeName: req.body.restaurant_name,
        email: req.body.owner_email,
        isAddressSkip: false,
        isDetailsSkip: false,
        role: ROLE.STORE,
        phone: decodedToken.firebase.identities.phone[0],
        profileStatus: 1,
      };
      const addRestaurant = await knex("users")
        .insert(restaurantData)
        .then((result) => knex("users").where("id", result[0]).first());
      const addressData = {
        userId: addRestaurant.id,
        addressLine1: req.body.restaurant_address1,
        addressLine2: req.body.restaurant_address2,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      };
      const storeAddresss = await knex("store_addresses").insert(addressData);

      return res.send({ id: addRestaurant.id });
    } catch (error) {
      throw new BadRequestException("Internal Server Error");
    }
  }

  static async addStoreTiming(req, res) {
    const data = req.body;
    const addStoreTiming = await storeTimingService.insertTimingOfstores(
      data.openingDays,
      data.storeId,
      data
    );

    const addPreparationTime = await knex("users")
      .update({ preparationTime: data.preparationTime, profileStatus: 2 })
      .where("id", data.storeId);

    return res.send({ success: true });
  }
}

export default StoreController;
