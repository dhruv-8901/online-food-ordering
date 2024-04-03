import express from "express";
import asyncHandler from "express-async-handler";
import validator from "../common/config/validator.config";

// Controller
import SearchHistorysController from "./search-history.controller";
import SearchHistoryDto from "./dto/search-history.dto";

// Validation
import role from "../common/middleware/role";
import { ROLE } from "../common/constant";

const router = express.Router();

/**
 * search history [User]
 */
router.get(
  "/",
  role([ROLE.CUSTOMER]),
  asyncHandler(SearchHistorysController.getSearchHistory)
);

/**
 * search history [User]
 */
router.post(
  "/",
  role([ROLE.CUSTOMER]),
  validator.body(SearchHistoryDto),
  asyncHandler(SearchHistorysController.addSearchHistory)
);
export default router;
