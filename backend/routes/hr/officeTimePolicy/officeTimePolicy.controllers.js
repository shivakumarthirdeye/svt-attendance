const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createSingleTimePolicy = async (req, res) => {
  try {
    const createdOfficeTimePolicy = await prisma.officeTimePolicy.create({
      data: req.body,
    });
    console.log(
      '🚀 ~ file: officeTimePolicy.controllers.js:6 ~ createSingleTimePolicy ~ createdOfficeTimePolicy:',
      createdOfficeTimePolicy
    );

    return res.status(201).json(createdOfficeTimePolicy);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllTimePolicy = async (req, res) => {
  try {
    const officeTimePolicy = await prisma.officeTimePolicy.findMany({
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

    return res.status(201).json(officeTimePolicy);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getSingleTimePolicy = async (req, res) => {
  try {
    const singleTimePolicy = await prisma.officeTimePolicy.findUnique({
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
    return res.status(200).json(singleTimePolicy);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSingleTimePolicy,
  getAllTimePolicy,
  getSingleTimePolicy,
};
