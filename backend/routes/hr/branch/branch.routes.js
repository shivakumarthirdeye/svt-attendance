const express = require('express');

const {
  createSingleBranch,
  getAllBranch,
  getSingleBranch,
  updateSingleBranch,
  deletedBranch,
} = require('./branch.controller');
const authorize = require('../../../utils/authorize'); // authentication middleware

const branchRoutes = express.Router();

branchRoutes.post('/', authorize('create-department'), createSingleBranch);
branchRoutes.get('/', authorize('read-department'), getAllBranch);
branchRoutes.get('/:id', authorize('read-department'), getSingleBranch);
branchRoutes.put('/:id', authorize('update-department'), updateSingleBranch);
branchRoutes.patch('/:id', authorize('delete-department'), deletedBranch);

module.exports = branchRoutes;
