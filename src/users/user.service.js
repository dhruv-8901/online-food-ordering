import knex from "../common/config/database.config";
import { ROLE } from "../common/constant";

class UserService {
  /**
   * find user using id
   * @param {integer} userId
   * @returns
   */
  static async find(userId) {
    return await knex("users")
      .select(
        "users.*",
        knex.raw(
          `(SELECT AVG(rating) FROM feedbacks WHERE storeId = ${userId}) AS avgRating`
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = ${userId}) AS totalRating`
        )
      )
      .where({ id: userId })
      .first();
  }

  /**
   * find user (customer) using id
   * @param {integer} userId
   * @returns
   */
  static async findCustomerById(userId) {
    return await knex("users")
      .where({ id: userId })
      .where("role", ROLE.CUSTOMER)
      .first();
  }

  static async findDefaultAddress(userId) {
    return await knex("customer_addresses")
      .where({ userId, isDefault: true })
      .first();
  }

  /**
   * find user using phone and id
   * @param {integer} phone
   * @param {integer} userId
   * @returns
   */
  static async findUserByPhoneWithotId(phone, userId) {
    return await knex("users")
      .where("phone", phone)
      .whereNot("id", userId)
      .first();
  }

  /**
   * update user
   * @param {object} data
   * @param {integer} userId
   * @returns
   */
  static async updateUser(data, userId) {
    await knex("users").where({ id: userId }).update(data);
    return await knex("users").where({ id: userId }).first();
  }

  /**
   * logout user
   * @param {object} user
   */
  static async logout(user) {
    await knex("access_tokens").where({ id: user.jti }).update({ revoked: 1 });
    await knex("refresh_tokens")
      .where({ accessTokenId: user.jti })
      .update({ revoked: 1 });
  }
}

export default UserService;
