import moment from "moment";
import CartService from "../carts/carts.service";
import knex from "../common/config/database.config";
import BadRequestException from "../common/exception/bad-request.exception";

import fileHelper from "../common/helper/file.helper";
import DropdownService from "../dropdowns/dropdowns.service";

class SpecialItemsService {
  /**
   * Store item find by id
   * @param {*} id
   * @returns
   */
  static async findById(id) {
    return await knex("special_items")
      .where("id", id)
      .where("valid_until", ">", new Date())
      .first();
  }

  /**
   * Store items details
   * @param {number} storeId
   * @param {number} storeItemId
   * @param {boolean} isSpecial
   * @returns
   */
  static async getItems(storeId, storeItemId, customerId, search) {
    const storeItems = await knex("special_items")
      .select(
        "*",
        knex.raw(
          "(SELECT quantity FROM carts WHERE customerId = ? AND specialItemId = special_items.id) AS itemInCartQuantity",
          customerId || null
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_specialitems WHERE favourite_specialitems.specialItemId = special_items.id AND userId = ?) AS isFavourite`,
          customerId || null
        )
      )
      .where({
        storeId: storeId,
        isSpecial: isSpecial === "true" ? true : false,
      })
      .where((qb) => {
        if (storeItemId) {
          qb.where("id", storeItemId);
        }
      })
      .whereNull("deletedAt");

    const data = await Promise.all(
      storeItems.map(async (data) => ({
        ...data,
        cuisines: await DropdownService.getCuisineByCuisineIds(data.cuisineIds),
      }))
    );

    return data;
  }

  /**
   *
   *
   * Store Items by cuisine id
   * @param {object} req
   * @returns
   */
  static async getItemsByCuisineId(
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE,
    cuisineId,
    userId
  ) {
    const cuisine = await knex("store_items")
      .select(
        "store_items.*",
        "dropdown_options.name AS categoryName",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_storeitems WHERE favourite_storeitems.storeItemId = store_items.id AND userId = ?) AS isFavourite`,
          [userId]
        )
      )
      .whereRaw(`FIND_IN_SET(?, store_items.cuisineIds)`, cuisineId)
      .innerJoin(
        "dropdown_options",
        "dropdown_options.id",
        "=",
        "store_items.categoryId"
      )
      .whereNull("deletedAt")
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });

    return cuisine;
  }

  /**
   * Get Store Items
   * @param {*} req
   * @returns
   */
  static async getSpecialItems(search, userId) {
    const storeItems = await knex("special_items")
      .select(
        "store_items.*",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_storeitems WHERE favourite_storeitems.storeItemId = store_items.id AND userId = ?) AS isFavourite`,
          [userId]
        )
      )
      .where("name", "like", `%${search || ""}%`)
      .where("valid_until", ">", new Date())
      .where({
        storeId,
      });

    const data = await Promise.all(
      storeItems.map(async (data) => ({
        ...data,
        cuisines: await DropdownService.getCuisineByCuisineIds(data.cuisineIds),
      }))
    );

    return data;
  }

  /**
   * Add item of store
   * @param {object} authUser
   * @param {object} data
   * @param {file} image
   */
  static async addItem(authUser, data, image) {
    const isValid = await DropdownService.addedCuisineIdsValidate(
      data.cuisineIds
    );
    if (!isValid) {
      throw new BadRequestException("cuisineIds is Invalid");
    }
    const file = await fileHelper.uploadFile(
      "store-items",
      image.data,
      image.mimetype
    );
    const valid_from = new Date(data.valid_from * 1000);
    const valid_until = new Date(data.valid_until * 1000);

    await knex("special_items").insert({
      ...data,
      price: Number(data.price),
      storeId: authUser.id,
      image: file,
      valid_from,
      valid_until,
    });
  }

  /**
   * Update item of store
   * @param {object} authUser
   * @param {object} data
   * @param {file} files
   */
  static async updateItem(storeItemId, data, files) {
    const isValid = await DropdownService.addedCuisineIdsValidate(
      data.cuisineIds
    );
    if (!isValid) {
      throw new BadRequestException("cuisineIds is Invalid");
    }
    const image = files ? files.image : null;
    const storeItem = await this.findById(storeItemId);
    if (!storeItem) {
      throw new BadRequestException("store item not found");
    }
    if (image) {
      await fileHelper.deleteFile(storeItem.image);
      data.image = await fileHelper.uploadFile(
        "store-items",
        image.data,
        image.mimetype
      );
    }
    await knex("store_items").update(data).where("id", storeItemId);
  }

  /**
   * Delete store items
   * @param {string} storeItemIds
   */
  static async deleteItems(storeItemIds) {
    await knex("store_items")
      .update("deletedAt", new Date())
      .whereIn("id", storeItemIds.split(","));
  }
}

export default SpecialItemsService;
