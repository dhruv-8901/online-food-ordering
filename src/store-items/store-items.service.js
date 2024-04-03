import CartService from "../carts/carts.service";
import knex from "../common/config/database.config";
import BadRequestException from "../common/exception/bad-request.exception";
import NotFoundException from "../common/exception/not-found.exception";
import moment from "moment-timezone";
import fileHelper from "../common/helper/file.helper";
import DropdownService from "../dropdowns/dropdowns.service";
import { DROP_DOWN } from "../common/constant";

class StoreItemsService {
  /**
   * Store item find by id
   * @param {*} id
   * @returns
   */
  static async findById(id) {
    return await knex("store_items")
      .where("id", id)
      .whereNull("deletedAt")
      .where((qb) => {
        qb.orWhere("valid_until", ">", new Date());
        qb.orWhere("valid_until", null);
      })
      .first();
  }

  /**
   * Store items details
   * @param {number} storeId
   * @param {number} storeItemId
   * @param {boolean} isSpecial
   * @returns
   */
  static async getItems(storeId, storeItemId, isSpecial, customerId) {
    const currentTime = new moment().format("HH:mm:ss");
    const storeItems = await knex("store_items")
      .select(
        "*",
        knex.raw(
          "(SELECT quantity FROM carts WHERE customerId = ? AND storeItemId = store_items.id) AS itemInCartQuantity",
          customerId || null
        ),
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_storeitems WHERE favourite_storeitems.storeItemId = store_items.id AND userId = ?) AS isFavourite`,
          customerId || null
        )
      )
      .where({
        storeId: storeId,
      })
      .where((qb) => {
        if (isSpecial) {
          if (isSpecial === "true") {
            qb.where("valid_until", ">", new Date());
          }
          qb.where({ isSpecial: isSpecial === "true" ? true : false });
        } else {
          qb.orWhere("valid_until", ">", new Date());
          qb.orWhere("valid_until", null);
        }
      })
      .where((qb) => {
        if (storeItemId) {
          qb.where("id", storeItemId);
        }
      })
      .whereNull("deletedAt")
      .orderBy("store_items.createdAt", "desc");

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
      .where((qb) => {
        qb.orWhere("store_items.valid_until", ">", new Date());
        qb.orWhere("store_items.valid_until", null);
      })
      .orderBy("store_items.createdAt", "desc")
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });

    const data = await Promise.all(
      cuisine.data.map(async (data) => ({
        ...data,
        cuisines: await DropdownService.getCuisineByCuisineIds(data.cuisineIds),
      }))
    );

    return { data, meta: cuisine.pagination };
  }

  /**
   * Get Store Items
   * @param {*} req
   * @returns
   */
  static async getStoreItems(search, userId) {
    const storeItems = await knex("store_items")
      .select(
        "store_items.*",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_storeitems WHERE favourite_storeitems.storeItemId = store_items.id AND userId = ?) AS isFavourite`,
          [userId]
        )
      )
      .where("name", "like", `%${search || ""}%`)
      .where((qb) => {
        qb.orWhere("store_items.valid_until", ">", new Date());
        qb.orWhere("store_items.valid_until", null);
      })
      .orderBy("store_items.createdAt", "desc")
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
   * Get store item list
   * @param {*} search
   * @param {*} userId
   * @returns
   */
  static async getStoreItemsList(
    search,
    userId,
    perPage = DEFAULT_PER_PAGE,
    currentPage = DEFAULT_PAGE
  ) {
    const storeItems = await knex("store_items")
      .select(
        "store_items.*",
        knex.raw(
          `(SELECT COUNT(*) FROM favourite_storeitems WHERE favourite_storeitems.storeItemId = store_items.id AND userId = ?) AS isFavourite`,
          [userId]
        )
      )
      .where("name", "like", `%${search || ""}%`)
      .where((qb) => {
        qb.orWhere("store_items.valid_until", ">", new Date());
        qb.orWhere("store_items.valid_until", null);
      })
      .orderBy("store_items.createdAt", "desc")
      .whereNull("deletedAt")
      .paginate({
        perPage: Number(perPage),
        currentPage: Number(currentPage),
        isLengthAware: true,
      });

    const data = await Promise.all(
      storeItems.data.map(async (data) => ({
        ...data,
        cuisines: await DropdownService.getCuisineByCuisineIds(data.cuisineIds),
      }))
    );

    return { data, meta: storeItems.pagination };
  }

  /**
   * Store items details
   * @param {number} storeId
   * @param {number} storeItemId
   * @param {boolean} isSpecial
   * @returns
   */
  static async getPreviousSpecialItem(storeId, storeItemId) {
    const storeItems = await knex("store_items")
      .select("*")
      .where({
        storeId,
        isSpecial: true,
      })
      .where("valid_until", "<", new Date())
      .where((qb) => {
        if (storeItemId) {
          qb.where("id", storeItemId);
        }
      })
      .orderBy("createdAt", "desc")
      .whereNull("deletedAt");

    const data = await Promise.all(
      storeItems.map(async (data) => ({
        ...data,
        cuisines: await DropdownService.getCuisineByCuisineIds(data.cuisineIds),
      }))
    );

    return data;
  }

  static async reusePreviousSpecialItem(
    storeId,
    storeItemId,
    validFrom,
    validUntil
  ) {
    const specialItemExist = await this.getPreviousSpecialItem(
      storeId,
      storeItemId
    );
    if (specialItemExist.length === 0) {
      throw new NotFoundException("Special Item Not Found");
    }
    const valid_from = new Date(validFrom * 1000);
    const valid_until = new Date(validUntil * 1000);

    if (valid_from < new Date() || valid_until <= valid_from) {
      throw new BadRequestException("Date Is Not Valid");
    }

    await knex("store_items")
      .update({
        valid_from,
        valid_until,
      })
      .where("id", storeItemId);
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

    let valid_from;
    let valid_until;
    if (data.isSpecial === true) {
      valid_from = new Date(data.valid_from * 1000);
      valid_until = new Date(data.valid_until * 1000);

      if (valid_until <= valid_from) {
        throw new BadRequestException("Date Is Not Valid");
      }
    }

    const file = await fileHelper.uploadFile(
      "store-items",
      image.data,
      image.mimetype
    );

    await knex("store_items").insert({
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
    if (storeItem.isSpecial === 1)
      throw new BadRequestException("You Cannot Update Special Item");
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

export default StoreItemsService;
