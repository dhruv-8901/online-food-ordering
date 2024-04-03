
import DropdownService from "./dropdowns.service";

class DropdownController {
  /**
   * dropdown list
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  static async getDropdown(req, res) {

    const dropDownId = req.query.id;

    let data = {}
    if (dropDownId) {
      data = await DropdownService.getDropDownOption(dropDownId);
    } else {
      data = await DropdownService.getDropdown();
    }
    return res.send({ data });
  }

}

export default DropdownController;
