import { HTTP_UNPROCESSABLE } from "../config/constants.config";

class UnprocessableException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = HTTP_UNPROCESSABLE;
  }
}

export default UnprocessableException;
