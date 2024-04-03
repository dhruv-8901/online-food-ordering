import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import moment from "moment";
import knex from "../config/database.config";
import { APP_KEY } from "../config/constants.config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: APP_KEY,
};

passport.use(
  // JWT strategy for check login user
  new JwtStrategy(options, async (jwtPayload, done) => {

    try {
      if (moment.utc().unix() > jwtPayload.exp) {
        return done(null, false);
      }

      const checkToken = await knex("access_tokens")
        .where("access_tokens.id", jwtPayload.jti)
        .where({ userId: jwtPayload.sub, revoked: false })
        .innerJoin("users", "access_tokens.userId", "=", "users.id")
        .first();

      if (
        !checkToken ||
        moment.utc().unix() > moment.unix(checkToken.expiresAt)
      ) {
        return done("Unauthorized", false);
      }
      let user = {}
      user.id = jwtPayload.sub
      user.jti = jwtPayload.jti;
      user.role = jwtPayload.role;
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);
