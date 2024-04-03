import {
  APP_KEY as SECRET,

} from "../config/constants.config";
import JWT from "jsonwebtoken";

const authenticateAdmin = async (req, res, next) => {
  if (req.session.token) {
    JWT.verify(req.session.token, SECRET, function (err, decoded) {
      if (err) {
        if (req.xhr) {
          return res.status(401).send("unauthorized");
        }
        res.redirect("/admin/login");
      } else {
        next();
      }
    });
  } else {
    if (req.xhr) {
      return res.status(401).send("unauthorized");
    }
    return res.redirect("/admin/login");
  }
}

export default authenticateAdmin;
