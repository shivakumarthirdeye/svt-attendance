const express = require('express');
const {
  createSingleTimePolicy,
  getAllTimePolicy,
  getSingleTimePolicy,
} = require('./officeTimePolicy.controllers');
const authorize = require('../../../utils/authorize');

const officeTimePolicy = express.Router();
officeTimePolicy.post(
  '/',
  authorize('create-department'),
  createSingleTimePolicy
);
officeTimePolicy.get('/', authorize('read-department'), getAllTimePolicy);
officeTimePolicy.get('/:id', authorize('read-department'), getSingleTimePolicy);

module.exports = officeTimePolicy;
