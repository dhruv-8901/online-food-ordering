import SocialiteGoogle from "./socialite-google";
import SocialiteFacebook from "./socialite-facebook";
import SocialiteApple from "./socialite-apple";
import { PROVIDER } from "../config/constants.config";

class SocialiteFactory {
  constructor(providerType, token, request) {
    if (providerType === PROVIDER.GOOGLE) {
      return new SocialiteGoogle(token, request);
    }

    if (providerType === PROVIDER.FACEBOOK) {
      return new SocialiteFacebook(token);
    }

    if (providerType === PROVIDER.APPLE) {
      return new SocialiteApple(token, request);
    }
  }
}

module.exports = SocialiteFactory;
