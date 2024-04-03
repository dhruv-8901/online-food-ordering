import { HTTP_BAD_REQUEST } from "../config/constants.config";

class BadRequestException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = HTTP_BAD_REQUEST;
  }
}

export default BadRequestException;
