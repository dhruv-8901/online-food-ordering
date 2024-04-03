import dotenv from "dotenv";
dotenv.config();

module.exports = {
  // App info
  APP_NAME: process.env.APP_NAME || "NODE JS",
  APP_KEY: process.env.APP_KEY || "SgJ45D^6J*8",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.ENVIRONMENT || "development",

  isSSLEnable: process.env.isSSLEnable || false,
  SSL_CERT_BASE_PATH: process.env.SSL_CERT_BASE_PATH || "",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID || "",

  AES_ENC_KEY:
    process.env.AES_ENC_KEY ||
    "aa5da0d21b01447253ae947ffe81b6e3f48d3d8b25a3f8ff8e3fdabfa8148375",
  AES_IV: process.env.AES_IV || "cf55e913db45b815efcaedd30649c52e",

  baseUrl(path = null) {
    let url = `http://${process.env.HOST}:${process.env.PORT}`;
    if (process.env.isSSLEnable === 'true') {
      url = `https://${process.env.HOST}:${process.env.PORT}`;
    }
    return url + (path ? `/${path}` : '');
  },

  apiBaseUrl(path = null) {
    let url = `http://${process.env.HOST}:${process.env.PORT}/api/v1`;
    if (process.env.isSSLEnable === 'true') {
      url = `https://${process.env.HOST}:${process.env.PORT}/api/v1`;
    }
    return url + (path ? `/${path}` : '');
  },

  // Provider
  PROVIDER: Object.freeze({
    FACEBOOK: "facebook",
    GOOGLE: "google",
    APPLE: "apple",
  }),

  // Platform
  PLATFORM: Object.freeze({
    ANDROID: "Android",
    IOS: "iOS",
  }),

  // App version status
  APP_VERSION_STATUS: Object.freeze({
    FORCE_UPDATE: 2,
    OPTIONAL_UPDATE: 1,
    NO_UPDATE: 0,
  }),

  // App version message
  APP_VERSION_MSG: Object.freeze({
    FORCE_UPDATE:
      "You are not using the latest version of the app, please update to the latest version of the app to use it",
    OPTIONAL_UPDATE:
      "Your app is outdated, please update to the latest version of the app.",
    NO_UPDATE: "Your app is up to date.",
  }),

  // Status Code
  HTTP_INTERNAL_SERVER: 500,
  HTTP_UNPROCESSABLE: 422,
  HTTP_CONFLICT: 409,
  HTTP_NOT_FOUND: 404,
  HTTP_FORBIDDEN: 403,
  HTTP_UNAUTHORIZE: 401,
  HTTP_BAD_REQUEST: 400,
  HTTP_PRECONDITION_FAIL: 412,
};
