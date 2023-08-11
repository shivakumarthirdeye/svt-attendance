const express = require("express");
const {
  createSingleAwardHistory,
  getAllAwardHistory,
  getSingleAwardHistory,
  updateSingleAwardHistory,
  deleteSingleAwardHistory,
} = require("./awardHistory.controllers");
const authorize = require("../../../utils/authorize"); // authentication middleware

const awardHistoryRoutes = express.Router();

awardHistoryRoutes.post(
  "/",
  authorize("create-awardHistory"),
  createSingleAwardHistory
);
awardHistoryRoutes.get("/", authorize("read-awardHistory"), getAllAwardHistory);
awardHistoryRoutes.get(
  "/:id",
  authorize("read-awardHistory"),
  getSingleAwardHistory
);
awardHistoryRoutes.put(
  "/:id",
  authorize("update-awardHistory"),
  updateSingleAwardHistory
);
awardHistoryRoutes.delete(
  "/:id",
  authorize("delete-awardHistory"),
  deleteSingleAwardHistory
);

module.exports = awardHistoryRoutes;
