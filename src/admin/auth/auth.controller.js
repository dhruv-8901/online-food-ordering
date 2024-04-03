import JWT from "jsonwebtoken";
import BcryptHelper from "../../common/helper/bcrypt.helper";
import { APP_KEY as SECRET } from "../../common/config/constants.config";
import AuthService from "./auth.service";

class AuthController {
  /**
   * login form
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async showLoginPage(req, res) {
    // console.log(await BcryptHelper.bcryptPassword("macd*65^45"));
    if (req.session.token) {
      JWT.verify(req.session.token, SECRET, function (err, decoded) {
        if (err) return res.render("admin/auth/login");

        return res.redirect("dashboard");
      });
    }
    return res.render("admin/auth/login");
  }

  /**
   * admin login
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async login(req, res) {
    const user = await AuthService.findFromEmail(req.body.email);
    if (user) {
      const hashedPasswordMatch = await BcryptHelper.matchHashedPassword(
        req.body.password,
        user.password
      );
      if (hashedPasswordMatch) {
        const payload = {
          user: user,
        };
        await JWT.sign(
          payload,
          SECRET,
          { expiresIn: 31536000 },
          (err, token) => {
            if (err) {
              console.log(err);
              return res.render("errors/500");
            }
            req.session.token = token;
            return res.status(200).json({
              message: "Login successfully.",
              status: "success",
            });
          }
        );
      } else {
        return res.status(422).json({
          message: "Please enter valid Email ID/Password.",
          status: "error",
        });
      }
    } else {
      return res.status(422).json({
        message: "Please enter valid Email ID/Password.",
        status: "error",
      });
    }
  }

  /**
   * admin logout
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static async logout(req, res) {
    delete req.session.token;
    return res.redirect("login");
  }
}

export default AuthController;
