const express = require("express");
const {
  createSingleDesignation,
  getAllDesignation,
  getSingleDesignation,
  updateSingleDesignation,
  allDesignationWiseEmployee,
  singleDesignationWiseEmployee,
  deleteSingleDesignation,
} = require("./designation.controllers");
const authorize = require("../../../utils/authorize"); // authentication middleware

const designationRoutes = express.Router();
designationRoutes.get(
  "/employee",
  authorize("read-designation"),
  allDesignationWiseEmployee
);
designationRoutes.get(
  "/employee/:id",
  authorize("read-designation"),
  singleDesignationWiseEmployee
);
designationRoutes.post(
  "/",
  authorize("create-designation"),
  createSingleDesignation
);
designationRoutes.get("/", authorize("read-designation"), getAllDesignation);
designationRoutes.get(
  "/:id",
  authorize("read-designation"),
  getSingleDesignation
);
designationRoutes.put(
  "/:id",
  authorize("update-designation"),
  updateSingleDesignation
);

designationRoutes.delete(
  "/:id",
  authorize("delete-designation"),
  deleteSingleDesignation
);

module.exports = designationRoutes;
