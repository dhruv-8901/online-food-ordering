import knex from "../common/config/database.config";
import ConflictRequestException from "../common/exception/conflict-request.exception";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE, ROLE } from "../common/constant";
import Helper from "../common/helper/helper";

class FeedbacksService {
  /**
   * post feedback
   * @param {integer} userId
   * @returns
   */
  static async postFeedback(authUser, data) {
    const { storeId } = data;
    const storeExist = await knex("users")
      .where({ id: storeId, role: ROLE.STORE })
      .first();
    if (!storeExist) {
      throw new ConflictRequestException("Store is not exist");
    }
    const givenFeedback = await knex("feedbacks")
      .where({
        storeId,
        userId: authUser.id,
      })
      .first();

    if (givenFeedback) {
      throw new ConflictRequestException(
        "You already given feedback this store."
      );
    }
    await knex("feedbacks").insert({ ...data, userId: authUser.id });
  }

  /**
   * Store feedback list by id
   * @param {*} id
   */
  static async getFeedBack(
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    storeId,
    filter
  ) {
    const feedbackFilter = Helper.feedbackFilterOption(filter);

    return await knex("feedbacks")
      .select(
        "feedbacks.*",
        "users.profileImage",
        "users.firstName",
        "users.lastname",
        knex.raw(
          `(SELECT AVG(rating) FROM feedbacks WHERE storeId = ${storeId}) AS avgRating`
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM feedbacks WHERE storeId = ${storeId}) AS totalRating`
        )
      )
      .leftJoin("users", "users.id", "=", "feedbacks.userId")
      .where({ storeId })
      .orderByRaw(`${feedbackFilter.row}  ${feedbackFilter.order}`)
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });
  }
}

export default FeedbacksService;
