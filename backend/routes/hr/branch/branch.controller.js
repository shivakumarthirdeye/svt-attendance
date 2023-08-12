const { getPagination } = require('../../../utils/query');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create a new employee
const createSingleBranch = async (req, res) => {
  if (req.query.query === 'deletemany') {
    try {
      // delete many designation at once
      const deletedBranch = await prisma.branch.deleteMany({
        where: {
          id: {
            in: req.body,
          },
        },
      });
      return res.status(200).json(deletedBranch);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.query.query === 'createmany') {
    try {
      // create many designation from an array of objects
      const createdBranch = await prisma.branch.createMany({
        data: req.body,
        skipDuplicates: true,
      });
      return res.status(201).json(createdBranch);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    try {
      const createdBrach = await prisma.branch.create({
        data: {
          name: req.body.name,
        },
      });

      return res.status(201).json(createdBrach);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

const getAllBranch = async (req, res) => {
  if (req.query.query === 'all') {
    const allBranch = await prisma.branch.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            role: {
              select: {
                name: true,
                id: true,
              },
            },
            designationHistory: {
              orderBy: [
                {
                  id: 'desc',
                },
              ],
              take: 1,

              select: {
                designation: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
    return res.status(200).json(allBranch);
  } else {
    const { skip, limit } = getPagination(req.query);
    try {
      const allBranch = await prisma.branch.findMany({
        orderBy: [
          {
            id: 'asc',
          },
        ],
        skip: Number(skip),
        take: Number(limit),
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              userName: true,
              role: {
                select: {
                  name: true,
                  id: true,
                },
              },
              designationHistory: {
                orderBy: [
                  {
                    id: 'desc',
                  },
                ],
                take: 1,

                select: {
                  designation: {
                    select: {
                      name: true,
                      id: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return res.status(200).json(allBranch);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
};

const getSingleBranch = async (req, res) => {
  try {
    const singleBranch = await prisma.branch.findUnique({
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
            role: {
              select: {
                name: true,
                id: true,
              },
            },
            designationHistory: {
              orderBy: [
                {
                  id: 'desc',
                },
              ],
              take: 1,

              select: {
                designation: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return res.status(200).json(singleBranch);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateSingleBranch = async (req, res) => {
  try {
    const updatedBranch = await prisma.Branch.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
      },
    });
    return res.status(200).json(updatedBranch);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deletedBranch = async (req, res) => {
  try {
    const deletedBranch = await prisma.Branch.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: req.body.status,
      },
    });
    return res.status(200).json(deletedBranch);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSingleBranch,
  getAllBranch,
  getSingleBranch,
  updateSingleBranch,
  deletedBranch,
};
