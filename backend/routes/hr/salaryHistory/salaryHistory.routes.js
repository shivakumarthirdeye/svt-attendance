const express = require("express");
const {
  createSingleSalaryHistory,
  getAllSalaryHistory,
  getSingleSalaryHistory,
  updateSingleSalaryHistory,
  deleteSingleSalaryHistory,
} = require("./salaryHistory.controllers");
const authorize = require("../../../utils/authorize"); // authentication middleware

const salaryHistoryRoutes = express.Router();

salaryHistoryRoutes.post(
  "/",
  authorize("create-role"),
  createSingleSalaryHistory
);
salaryHistoryRoutes.get("/", authorize("read-role"), getAllSalaryHistory);
salaryHistoryRoutes.get("/:id", authorize("read-role"), getSingleSalaryHistory);
salaryHistoryRoutes.put(
  "/:id",
  authorize("update-role"),
  updateSingleSalaryHistory
);
salaryHistoryRoutes.delete(
  "/:id",
  authorize("delete-role"),
  deleteSingleSalaryHistory
);

module.exports = salaryHistoryRoutes;
