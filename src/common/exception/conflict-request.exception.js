import { HTTP_CONFLICT } from "../config/constants.config";

class ConflictRequestException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = HTTP_CONFLICT;
  }
}

export default ConflictRequestException;
