const express = require('express');

const {
  calculatePayroll,
  generatePayslip,
  getAllPayslip,
  getSinglePayslip,
  updatePayslip,
  makePayment,
  addAdvance,
  getAdvanceHistory,
} = require('./payroll.controller');
const authorize = require('../../../utils/authorize'); // authentication middleware

const payrollRoutes = express.Router();

payrollRoutes.get('/', authorize('read-payroll'), calculatePayroll);
payrollRoutes.post('/', authorize('create-payroll'), generatePayslip);
payrollRoutes.post('/add-advance', authorize('create-payroll'), addAdvance);
payrollRoutes.get(
  '/advance-history',
  authorize('create-payroll'),
  getAdvanceHistory
);
payrollRoutes.get('/all', authorize('read-payroll'), getAllPayslip);
payrollRoutes.get('/:id', authorize('read-payroll'), getSinglePayslip);
payrollRoutes.put('/:id', authorize('update-payroll'), updatePayslip);
payrollRoutes.put('/payment/:id', authorize('update-payroll'), makePayment);
module.exports = payrollRoutes;
