const express = require("express");

const {
  createSingleDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateSingleDepartment,
  deletedDepartment,
} = require("./department.controller");
const authorize = require("../../../utils/authorize"); // authentication middleware

const departmentRoutes = express.Router();

departmentRoutes.post(
  "/",
  authorize("create-department"),
  createSingleDepartment
);
departmentRoutes.get("/", authorize("read-department"), getAllDepartment);
departmentRoutes.get("/:id", authorize("read-department"), getSingleDepartment);
departmentRoutes.put(
  "/:id",
  authorize("update-department"),
  updateSingleDepartment
);
departmentRoutes.patch(
  "/:id",
  authorize("delete-department"),
  deletedDepartment
);

module.exports = departmentRoutes;
