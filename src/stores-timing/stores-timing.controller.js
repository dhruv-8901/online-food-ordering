import StoreTimingService from "./stores-timing.service";


class StoreTimingController {
  /**
   * Store timing details
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  static async getTiming(req, res) {
    const data = await StoreTimingService.getTiming(req.user)
    return res.json({ data })
  }

  /**
   * Update Store timing details
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  static async updateTiming(req, res) {
    await StoreTimingService.updateTiming(req.user, req.body)
    return res.json({ message: 'success' })
  }
}

export default StoreTimingController;
