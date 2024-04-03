import { HTTP_UNAUTHORIZE } from "../config/constants.config";

class UnauthorizedException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = HTTP_UNAUTHORIZE;
  }
}

export default UnauthorizedException;
