import knex from "../common/config/database.config";
import { DROP_DOWN } from "../common/constant";
import DropdownModel from "./resource/dropdowns.resource";
import DropdownOptionsModel from "./resource/dropdown-options.resource";

class DropdownService {

  /**
   * For user dashboard on global search
   * @param {*} search 
   * @returns 
   */
  static async getCuisine(search) {
    return await knex("dropdown_options")
      .where({ dropdownId: DROP_DOWN.CUISINE })
      .where("name", "like", `%${search || ""}%`);
  }

  /**
   * dropdpwn list
   * @returns 
   */
  static async getDropdown() {
    return new DropdownModel(await knex("dropdowns"));
  }


  /**
   * drop down option list by id
   * @param {*} id 
   * @returns 
   */
  static async getDropDownOption(id) {
    return new DropdownOptionsModel(
      await knex("dropdown_options")
        .where({ dropdownId: id })
    )
  }

  /**
   * Get cuisine name by their ids
   * @param {*} cuisines 
   * @returns 
   */
  static async getCuisineByCuisineIds(cuisines) {
    const cuisineIds = cuisines.split(",").map((value) => Number(value));
    return await knex("dropdown_options")
      .where({ dropdownId: DROP_DOWN.CUISINE })
      .whereIn("id", cuisineIds);
  }

  /**
   * When Store Add cuisine validation
   * @param {*} cuisines 
   * @returns 
   */
  static async addedCuisineIdsValidate(cuisines) {
    const cuisineIds = cuisines.split(",").map((value) => Number(value));
    const existCuisines = await knex("dropdown_options").where({
      dropdownId: DROP_DOWN.CUISINE,
    });
    const existCuisineIds = existCuisines.map((cuisine) => {
      return cuisine.id;
    });
    return cuisineIds.every((r) => existCuisineIds.includes(r));
  }
}

export default DropdownService;
