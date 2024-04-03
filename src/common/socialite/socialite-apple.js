import verifyAppleToken from "verify-apple-id-token";
import { APPLE_CLIENT_ID } from "../config/constants.config";

class SocialiteApple {
  constructor(token, req) {
    this.token = token;
    this.request = req;
  }

  async generateUserFromToken() {
    try {
      const jwtClaims = await verifyAppleToken({
        idToken: this.token,
        clientId: APPLE_CLIENT_ID,
      });

      const data = {
        providerKey: jwtClaims.sub,
        email: jwtClaims.email,
      };

      return data;
    } catch (err) {
      throw new Error("Error while authenticating apple user");
    }
  }
}

module.exports = SocialiteApple;
