import FeedbackService from "./feedbacks.service";
import FeedbackModel from "./resource/feedbacks.resource";

class FeedbacksController {
  /**
   * post feedback
   * @param {object} req
   * @param {object} res
   */
  static async postFeedBack(req, res) {
    await FeedbackService.postFeedback(req.user, req.body);
    res.send({ message: "success" });
  }

  /**
   * Stores feedback list by id
   * @param {*} req
   * @param {*} res
   */
  static async getFeedBack(req, res) {
    const { data, pagination } = await FeedbackService.getFeedBack(
      req.query.perPage,
      req.query.currentPage,
      req.params.storeId,
      req.query.filter
    );

    res.send({
      data: new FeedbackModel(data),
      totalReview: data[0] ? data[0].totalRating : 0,
      avgReview: data[0] ? data[0].avgRating : 0,
      meta: pagination,
    });
  }
}

export default FeedbacksController;
