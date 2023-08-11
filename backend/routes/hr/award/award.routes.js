const express = require("express");
const {
  createSingleAward,
  getAllAward,
  getSingleAward,
  updateSingleAward,
  deleteSingleAward,
} = require("./award.controllers");
const authorize = require("../../../utils/authorize"); // authentication middleware

const awardRoutes = express.Router();
awardRoutes.post("/", authorize("create-award"), createSingleAward);
awardRoutes.get("/", authorize("read-award"), getAllAward);
awardRoutes.get("/:id", authorize("read-award"), getSingleAward);
awardRoutes.put("/:id", authorize("update-award"), updateSingleAward);

awardRoutes.patch("/:id", authorize("delete-award"), deleteSingleAward);

module.exports = awardRoutes;
