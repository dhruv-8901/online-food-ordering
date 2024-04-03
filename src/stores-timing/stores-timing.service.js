import knex from "../common/config/database.config";
import BadRequestException from "../common/exception/bad-request.exception";
import StoreService from "../stores/store.service";

class storeTimingService {
  /**
   * Find timing by day & id
   * @param {number} day
   * @param {number} storeId
   * @returns
   */
  static async findByDays(day, storeId) {
    return await knex("stores_timing")
      .where({
        storeId,
        day: day.toString(),
      })
      .first();
  }

  /**
   * Insert timing of stores
   * @param {number} days
   * @param {number} storeId
   * @returns
   */
  static async insertTimingOfstores(days, storeId, data) {
    days.map(async (day) => {
      await knex("stores_timing").insert({
        day: day.toString(),
        opensAt: data.opensAt,
        closesAt: data.closesAt,
        storeId: storeId,
      });
    });
  }

  /**
   * Update stores Timimg
   * @param {number} days
   * @param {number} storeId
   * @param {object} data
   */
  static async updateTimingOfstores(days, storeId, data) {
    days.map(async (day) => {
      await knex("stores_timing")
        .where("storeId", storeId)
        .where("day", day.toString())
        .update({
          opensAt: data.opensAt,
          closesAt: data.closesAt,
        });
    });
  }

  /**
   * Delete timing of stores
   * @param {number} days
   * @param {number} storeId
   * @returns
   */
  static async deleteTimingOfstores(days, storeId) {
    await knex("stores_timing")
      .where("storeId", storeId)
      .whereIn("day", days.map(String))
      .delete();
  }

  /**
   * Get store timing by authUser
   * @param {object} authUser
   * @returns
   */
  static async getTiming(authUser) {
    const data = await knex("stores_timing")
      .select("stores_timing.*", "users.preparationTime")
      .innerJoin("users", "users.id", "=", authUser.id)
      .where({
        "stores_timing.storeId": authUser.id,
      });

    let days = [];
    data.map((value) => {
      days.push(+value.day);
    });
    return {
      days,
      opensAt: data.length ? data[0].opensAt : null,
      closesAt: data.length ? data[0].closesAt : null,
      preparationTime: data.length ? data[0].preparationTime : null,
    };
  }

  /**
   * Update timing of store
   * @param {object} authUser
   * @param {object} data
   */
  static async updateTiming(authUser, data) {
    const newDays = data.days;
    const {
      days: oldDays,
      opensAt: oldOpenTime,
      closesAt: oldClosedTime,
    } = await this.getTiming(authUser);

    if (data.opensAt >= data.closesAt) {
      throw new BadRequestException("Invalid restaurant opening time");
    }

    await StoreService.addPreparationTime(data.preparationTime, authUser.id);

    let newAddedDays = newDays.filter((x) => !oldDays.includes(x));
    let removeAddedDays = oldDays.filter((x) => !newDays.includes(x));

    if (oldOpenTime !== data.opensAt || oldClosedTime !== data.closesAt) {
      await this.updateTimingOfstores(oldDays, authUser.id, data);
    }

    if (newAddedDays.length > 0) {
      await this.insertTimingOfstores(newAddedDays, authUser.id, data);
    }
    if (removeAddedDays.length > 0) {
      await this.deleteTimingOfstores(removeAddedDays, authUser.id);
    }
  }
}

export default storeTimingService;
