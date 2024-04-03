import { HTTP_NOT_FOUND } from "../config/constants.config";

class NotFoundException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = HTTP_NOT_FOUND;
  }
}

export default NotFoundException;
