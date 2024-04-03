import knex from "../../common/config/database.config";

class AuthService {
  /**
   * find using email
   * @param {string} email
   * @returns
   */
  static async findFromEmail(email) {
    return await knex("admins").where("email", email).first();
  }
}

export default AuthService;
