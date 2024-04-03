import bcrypt from "bcryptjs";

const saltRounds = 10;

class BcryptHelper {
  /**
   * Compare password and hash password
   * @param {string} password
   * @param {string} hashPassword
   * @returns
   */
  static async matchHashedPassword(password, hashPassword) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(password, hashPassword, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
    return hashedPassword;
  }

  /**
   * Generate bcrypt password
   * @param {string} password
   * @returns
   */
  static async bcryptPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
    return hashedPassword;
  }
}
export default BcryptHelper;
