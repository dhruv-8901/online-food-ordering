import SearchHistoryService from "./search-history.service";
import SearchHistoryModel from "./resource/search-history.resource";

class SearchHistorysController {
  /**
   * Get search history
   * @param {object} req
   * @param {object} res
   */
  static async getSearchHistory(req, res) {
    const data = await SearchHistoryService.getSearchHistory(req.user.id);
    // return res.json({
    //   data,
    // });
    return res.json({
      data: new SearchHistoryModel(data),
    });
  }

  /**
   * Add search history
   * @param {object} req
   * @param {object} res
   */
  static async addSearchHistory(req, res) {
    const data = await SearchHistoryService.addSearchHistory(
      req.user.id,
      req.body.storeId,
      req.body.storeItemId,
      req.body.type
    );
    return res.json({
      message: "success",
    });
  }
}

export default SearchHistorysController;
