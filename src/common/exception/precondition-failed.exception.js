import { HTTP_PRECONDITION_FAIL } from "../config/constants.config";

class PreconditionFailedException extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = HTTP_PRECONDITION_FAIL;
  }
}

export default PreconditionFailedException;
