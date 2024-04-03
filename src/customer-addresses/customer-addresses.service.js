import knex from "../common/config/database.config";
import NotFoundException from "../common/exception/not-found.exception";

class AddressService {
  /**
   * get all login user address
   * @param {integer} userId
   */
  static async get(userId) {
    return await knex("customer_addresses").where("userId", userId);
  }

  /**
   * get address from id
   * @param {integer} addressId
   * @returns
   */
  static async find(addressId) {
    return await knex("customer_addresses").where("id", addressId).first();
  }

  static async findByUserId(addressId, userId) {
    return await knex("customer_addresses")
      .where("id", addressId)
      .where("userId", userId)
      .first();
  }

  /**
   * create / update address
   * @param {object} body
   * @param {integer} addressId
   */
  static async createOrUpdate(body, addressId = null) {
    if (addressId === null) {
      const [id] = await knex("customer_addresses").insert(body);
      addressId = id;
    } else {
      const address = await this.find(addressId);
      if (!address) {
        throw new NotFoundException("address not found.");
      }
      await knex("customer_addresses").where("id", addressId).update(body);
    }
    // Set selected
    if (body.isDefault) {
      await knex("customer_addresses")
        .where({ userId: body.userId })
        .update({ isDefault: false });
      await knex("customer_addresses")
        .where({ id: addressId })
        .update({ isDefault: true });
    }
    return await knex("customer_addresses").where("id", addressId).first();
  }

  /**
   * delete a address
   * @param {integer} addressId
   */
  static async delete(addressId, userId) {
    const address = await this.find(addressId);
    if (!address) {
      throw new NotFoundException("address not found.");
    }
    await knex("customer_addresses").where("id", addressId).del();
    const checkDefaultAddress = await this.checkDefaultAddress(userId);
    if (checkDefaultAddress) return;
    const oldAddress = await knex("customer_addresses")
      .where("userId", userId)
      .orderBy("createdAt", "desc");
    if (oldAddress[0]) {
      await knex("customer_addresses")
        .where({ id: oldAddress[0].id })
        .update({ isDefault: true });
    }
    return;
  }

  /**
   * Store address create or update
   * @param {*} authUser
   * @param {*} reqData
   * @returns
   */
  static async storeAddressCreateOrUpdate(authUser, reqData) {
    const { addressLine1, addressLine2, latitude, longitude } = reqData;
    const updatedData = {
      userId: authUser.id,
      addressLine1,
      addressLine2,
      latitude,
      longitude,
    };
    const addressExist = await this.checkStoreAddressexist(authUser.id);
    if (addressExist)
      return await knex("store_addresses")
        .where({ userId: authUser.id })
        .update(updatedData);
    return await knex("store_addresses").insert(updatedData);
  }

  static async checkDefaultAddress(userId) {
    return await knex("customer_addresses")
      .where("userId", userId)
      .where("isDefault", 1)
      .first();
  }

  static async checkStoreAddressexist(storeId) {
    return await knex("store_addresses").where({ userId: storeId }).first();
  }

  static async storeAddress(userId) {
    return (
      (await knex("store_addresses").where("userId", userId).first()) || {}
    );
  }
}

export default AddressService;
