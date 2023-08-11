const { getPagination } = require("../../../utils/query");
const { PrismaClient } = require("@prisma/client");
const { query } = require("express");
const prisma = new PrismaClient();

const createSingleSalaryHistory = async (req, res) => {
  try {
    if (req.query.query === "deletemany") {
      const deletedSalaryHistory = await prisma.salaryHistory.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      res.json(deletedSalaryHistory);
    } else if (req.query.query === "createmany") {
      const createdSalaryHistory = await prisma.salaryHistory.createMany({
        data: req.body,
      });
      res.status(200).json(createdSalaryHistory);
    } else {
      const createdSalaryHistory = await prisma.salaryHistory.create({
        data: {
          userId: req.body.userId,
          salary: req.body.salary,
          startDate: new Date(req.body.salaryStartDate),
          endDate: new Date(req.body.salaryEndDate),
          comment: req.body.salaryComment,
        },
      });
      res.status(200).json(createdSalaryHistory);
    }
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

const getAllSalaryHistory = async (req, res) => {
  if (req.query.query === "all") {
    const allSalaryHistory = await prisma.salaryHistory.findMany({
      orderBy: [
        {
          id: "asc",
        },
      ],
    });
    res.json(allSalaryHistory);
  } else if (req.query.status === "false") {
    try {
      const { skip, limit } = getPagination(req.query);
      const allSalaryHistory = await prisma.salaryHistory.findMany({
        where: {
          status: false,
        },
        orderBy: [
          {
            id: "asc",
          },
        ],
        skip: Number(skip),
        take: Number(limit),
      });
      res.json(allSalaryHistory);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  } else {
    const { skip, limit } = getPagination(req.query);
    try {
      const allSalaryHistory = await prisma.salaryHistory.findMany({
        where: {
          status: true,
        },
        orderBy: [
          {
            id: "asc",
          },
        ],
        skip: Number(skip),
        take: Number(limit),
      });
      res.json(allSalaryHistory);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error.message);
    }
  }
};

const getSingleSalaryHistory = async (req, res) => {
  try {
    const singleSalaryHistory = await prisma.salaryHistory.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
          },
        },
      },
    });
    res.json(singleSalaryHistory);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

const updateSingleSalaryHistory = async (req, res) => {
  try {
    const updatedSalaryHistory = await prisma.salaryHistory.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        salary: req.body.salary,
        startDate: new Date(req.body.salaryStartDate),
        endDate: new Date(req.body.salaryEndDate),
        comment: req.body.salaryComment,
      },
    });
    res.json(updatedSalaryHistory);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

const deleteSingleSalaryHistory = async (req, res) => {
  try {
    const deletedSalaryHistory = await prisma.salaryHistory.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(deletedSalaryHistory);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
  }
};

module.exports = {
  createSingleSalaryHistory,
  getAllSalaryHistory,
  getSingleSalaryHistory,
  updateSingleSalaryHistory,
  deleteSingleSalaryHistory,
};
