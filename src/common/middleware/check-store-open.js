import BadRequestException from "../exception/bad-request.exception";
import knex from "../config/database.config";
import moment from "moment-timezone";

const checkStoreOpen = () => {
  return async (req, res, next) => {
    const todayDay = new Date().getDay();

    const store = await knex("store_items")
      .select(
        "store_items.*",
        knex.raw(
          `(SELECT id FROM stores_timing WHERE storeId = store_items.storeId AND day = ${todayDay}+1) AS storeTimingId`
        )
      )
      .where("id", req.body.storeItemId);

    const currentTime = new moment().format("HH:mm:ss");

    const newData = await Promise.all(
      store.map(async (value) => {
        let isStoreOpen = false;
        if (value.storeTimingId) {
          const timing = await knex("stores_timing")
            .select("opensAt", "closesAt")
            .where("id", value.storeTimingId)
            .andWhereRaw(
              "opensAt  <= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            )
            .andWhereRaw(
              "closesAt >= TIME(CONVERT_TZ(now(), '+00:00','+05:30'))"
            );
          if (timing.length > 0) {
            isStoreOpen = true;
          }
          value.isStoreOpen = isStoreOpen;
        }

        return { ...value, isStoreOpen };
      })
    );

    if (!newData[0].isStoreOpen) {
      return res.status(400).send({
        message: "Store is closed currently , please do after some time.",
      });
    }

    next();
  };
};

export default checkStoreOpen;
