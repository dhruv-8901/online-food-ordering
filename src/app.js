import express from "express";
import cors from "cors";
import apiRouter from "./routes/api.route";
import webRoute from "./routes/web.route";
import errorHandler from "./common/middleware/error-handler.middleware";
import swaggerConfig from "./common/config/swagger.config";
import passport from "passport";
import path from "path";
import fileUpload from "express-fileupload";
import session from "express-session";
import constantsConfig from "./common/config/constants.config";
import "./common/helper/passport.helper";
import fs from "fs";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(`${__dirname}../../src`, "views"));

app.use(
  session({ secret: "hjs89d", resave: "false", saveUninitialized: "true" })
);

app.use("/api/v1", apiRouter);
app.get("/api/changelogs", (req, res) => {
  return res.render("api/changelog");
});
app.use("/", swaggerConfig);
app.use("/", webRoute);

app.get("/otp", function (req, res) {
  res.render("otp");
});

app.use(errorHandler);

if (constantsConfig.isSSLEnable === "true") {
  // SSL certificate path
  var options = {
    key: fs.readFileSync(`${constantsConfig.SSL_CERT_BASE_PATH}/privkey.pem`),
    cert: fs.readFileSync(
      `${constantsConfig.SSL_CERT_BASE_PATH}/fullchain.pem`
    ),
  };
  var https = require("https").Server(options, app);

  https.listen(constantsConfig.PORT, () => {
    console.log(`Listening on (HTTPS) ${constantsConfig.baseUrl()}`);
  });
} else {
  app.listen(constantsConfig.PORT, () => {
    console.log(`Listening on (HTTP) ${constantsConfig.baseUrl()}`);
  });
}
