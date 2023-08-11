const { getPagination } = require("../../../utils/query");
const { PrismaClient } = require("@prisma/client");
const { query } = require("express");
const prisma = new PrismaClient();

const createSingleDesignationHistory = async (req, res) => {
  try {
    if (req.query.query === "deletemany") {
      const deletedDesignationHistory =
        await prisma.designationHistory.deleteMany({
          where: {
            id: {
              in: req.body,
            },
          },
        });
      res.json(deletedDesignationHistory);
    } else if (req.query.query === "createmany") {
      const createdDesignationHistory =
        await prisma.designationHistory.createMany({
          data: req.body,
          skipDuplicates: true,
        });
      res.status(200).json(createdDesignationHistory);
    } else {
      const createdDesignationHistory = await prisma.designationHistory.create({
        data: {
          userId: req.body.userId,
          designationId: req.body.designationId,
          startDate: new Date(req.body.designationStartDate),
          endDate: new Date(req.body.designationEndDate),
          comment: req.body.designationComment,
        },
      });
      res.status(200).json(createdDesignationHistory);
    }
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

const getAllDesignationHistory = async (req, res) => {
  try {
    const allDesignationHistory = await prisma.designationHistory.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });
    res.json(allDesignationHistory);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

const getSingleDesignationHistory = async (req, res) => {
  try {
    const singleDesignationHistory = await prisma.designationHistory.findUnique(
      {
        where: {
          id: Number(req.params.id),
        },
      }
    );
    res.json(singleDesignationHistory);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

const updateSingleDesignationHistory = async (req, res) => {
  try {
    const updatedDesignationHistory = await prisma.designationHistory.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        designationId: req.body.designationId,
        startDate: new Date(req.body.designationStartDate),
        endDate: new Date(req.body.designationEndDate),
        comment: req.body.designationComment,
      },
    });
    res.json(updatedDesignationHistory);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

const deleteSingleDesignationHistory = async (req, res) => {
  try {
    const deletedDesignationHistory = await prisma.designationHistory.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(deletedDesignationHistory);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

module.exports = {
  createSingleDesignationHistory,
  getAllDesignationHistory,
  getSingleDesignationHistory,
  updateSingleDesignationHistory,
  deleteSingleDesignationHistory,
};
