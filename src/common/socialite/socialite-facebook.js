import axios from "axios";

require("dotenv").config();

class SocialiteFacebook {
  constructor(token) {
    this.token = token;
  }

  async generateUserFromToken() {
    try {
      const payload = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
          fields: ["id", "email", "first_name", "last_name", "picture"].join(
            ","
          ),
          access_token: this.token,
        },
      });

      const data = {
        providerKey: payload.data.id,
        email: payload.data.email,
        firstName: payload.data.first_name,
        lastName: payload.data.last_name,
        profilePicture: `https://graph.facebook.com/${payload.data.id}/picture?type=large`,
      };

      return data;
    } catch (err) {
      console.log(err);
      throw new Error("Error while authenticating facebook user");
    }
  }
}

module.exports = SocialiteFacebook;
