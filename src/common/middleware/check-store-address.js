import BadRequestException from "../exception/bad-request.exception";
import knex from "../config/database.config";

const checkStoreAddress = () => {
  return async (req, res, next) => {
    const checkStoreAddress = await knex("store_addresses")
      .where("userId", req.user.id)
      .first();
    if (!checkStoreAddress) {
      return res
        .status(400)
        .send({ message : "You Can't Do This Operation , Add Your Store Address First."});
    }
    next();
  };
};

export default checkStoreAddress;
