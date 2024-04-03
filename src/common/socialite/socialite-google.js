import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../config/constants.config";

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class SocialiteGoogle {
  constructor(token, request) {
    this.token = token;
    this.request = request;
  }

  async generateUserFromToken() {
    try {
      const ticket = await client.verifyIdToken({
        idToken: this.token,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      console.log(payload);

      const data = {
        providerKey: payload.sub,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        profilePicture: payload.picture,
      };

      return data;
    } catch (err) {
      throw new Error("Error while authenticating google user");
    }
  }
}

module.exports = SocialiteGoogle;
