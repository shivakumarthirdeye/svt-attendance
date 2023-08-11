const express = require("express");

const {
  createSingleWeeklyHoliday,
  getAllWeeklyHoliday,
  getSingleWeeklyHoliday,
  updateSingleWeeklyHoliday,
  deleteSingleWeeklyHoliday,
} = require("./weeklyHoliday.controller");
const authorize = require("../../../utils/authorize"); // authentication middleware

const weeklyHolidayRoutes = express.Router();

weeklyHolidayRoutes.post(
  "/",
  authorize("create-weeklyHoliday"),
  createSingleWeeklyHoliday
);
weeklyHolidayRoutes.get(
  "/",
  authorize("read-weeklyHoliday"),
  getAllWeeklyHoliday
);
weeklyHolidayRoutes.get(
  "/:id",
  authorize("read-weeklyHoliday"),
  getSingleWeeklyHoliday
);
weeklyHolidayRoutes.put(
  "/:id",
  authorize("update-weeklyHoliday"),
  updateSingleWeeklyHoliday
);
weeklyHolidayRoutes.delete(
  "/:id",
  authorize("delete-weeklyHoliday"),
  deleteSingleWeeklyHoliday
);

module.exports = weeklyHolidayRoutes;
