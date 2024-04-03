import BadRequestException from "../exception/bad-request.exception";

const role = (validRole) => {
  return (req, res, next) => {
    const authUserRole = req.user.role
    if (!validRole.includes(authUserRole)) {
      throw new BadRequestException("You are unable to do this operation.")
    }
    next();
  }
}

export default role;
