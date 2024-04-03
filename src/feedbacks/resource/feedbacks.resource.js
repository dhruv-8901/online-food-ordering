import constantsConfig from "../../common/config/constants.config";

export default class FeedbackModel {
  constructor(feedbacks) {
    return feedbacks.map((data) => ({
      feedbackId: data.id,
      userId: data.userId,
      userName : data.firstName ? data.firstName : null,
      profileImage: data.profileImage
        ? constantsConfig.baseUrl(data.profileImage)
        : null,
      rating: data.rating,
      review: data.review,
    }))
  }
}
