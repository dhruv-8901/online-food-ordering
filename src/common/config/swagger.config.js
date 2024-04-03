import express from "express";
import { serve, setup } from "swagger-ui-express";
import constantsConfig from "./constants.config";
import path from "path";

const YAML = require("yamljs");

const router = express.Router();
const swaggerDocument = YAML.load(path.join(__dirname, "../../../swagger.yml"));


if (constantsConfig.ENVIRONMENT !== "production") {
  router.use(
    "/api/documentation",
    (req, res, next) => {
      swaggerDocument.info.title = `${constantsConfig.APP_NAME}`;
      swaggerDocument.info.version = "1.0";
      swaggerDocument.servers = [
        {
          url: constantsConfig.apiBaseUrl(),
          description: "API base url",
        },
      ];
      req.swaggerDoc = swaggerDocument;
      next();
    },
    serve,
    setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );
}

export default router;
