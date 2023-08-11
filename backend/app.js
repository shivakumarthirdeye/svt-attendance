const rateLimit = require('express-rate-limit');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

/* variables */
// express app instance
const app = express();

// holds all the allowed origins for cors access
let allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://4.227.140.35:3001',
  'http://4.227.140.35:3000',
];

// limit the number of requests from a single IP address
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // Limit each IP to 20 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Disable rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/* Middleware */
// for compressing the response body
app.use(compression());
// helmet: secure express app by setting various HTTP headers. And serve cross origin resources.
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
// morgan: log requests to console in dev environment
app.use(morgan('dev'));
// allows cors access from allowedOrigins array
app.use(
  cors({
    // origin: function (origin, callback) {
    //   // allow requests with no origin (like mobile apps or curl requests)
    //   if (!origin) return callback(null, true);
    //   if (allowedOrigins.indexOf(origin) === -1) {
    //     let msg =
    //       "The CORS policy for this site does not " +
    //       "allow access from the specified Origin.";
    //     return callback(new Error(msg), false);
    //   }
    //   return callback(null, true);
    // },
  })
);

// parse requests of content-type - application/json
app.use(express.json({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    )
  );
}

/* Routes */
app.use(
  '/api/role-permission',
  require('./routes/hr/rolePermission/rolePermission.routes')
);
app.use(
  '/api/transaction',
  require('./routes/accounting/transaction/transaction.routes')
);
app.use('/api/permission', require('./routes/hr/permission/permission.routes'));
app.use('/api/user', limiter, require('./routes/user/user.routes'));
app.use('/api/role', require('./routes/hr/role/role.routes'));
app.use(
  '/api/designation',
  require('./routes/hr/designation/designation.routes')
);
app.use('/api/account', require('./routes/accounting/account/account.routes'));
app.use('/api/setting', require('./routes/setting/setting.routes'));
app.use('/api/email', require('./routes/email/email.routes'));
app.use('/api/department', require('./routes/hr/department/department.routes'));
app.use(
  '/api/employment-status',
  require('./routes/hr/employmentStatus/employmentStatus.routes')
);
app.use(
  '/api/announcement',
  require('./routes/hr/announcement/announcement.routes')
);
app.use(
  '/api/leave-application',
  require('./routes/hr/leaveApplication/leaveApplication.routes')
);
app.use('/api/attendance', require('./routes/hr/attendance/attendance.routes'));
app.use('/api/payroll', require('./routes/hr/payroll/payroll.routes'));
app.use('/api/education', require('./routes/hr/education/education.routes'));
app.use(
  '/api/salaryHistory',
  require('./routes/hr/salaryHistory/salaryHistory.routes')
);
app.use(
  '/api/designationHistory',
  require('./routes/hr/designationHistory/designationHistory.routes')
);
app.use('/api/dashboard', require('./routes/dashboard/dashboard.routes'));
app.use('/api/shift', require('./routes/hr/shift/shift.routes'));
app.use('/api/files', require('./routes/files/files.routes'));
app.use(
  '/api/leave-policy',
  require('./routes/hr/leavePolicy/leavePolicy.routes')
);
app.use(
  '/api/weekly-holiday',
  require('./routes/hr/weeklyHoliday/weeklyHoliday.routes')
);
app.use(
  '/api/public-holiday',
  require('./routes/hr/publicHoliday/publicHoliday.routes')
);
app.use('/api/award', require('./routes/hr/award/award.routes'));
app.use(
  '/api/awardHistory',
  require('./routes/hr/awardHistory/awardHistory.routes')
);
module.exports = app;
