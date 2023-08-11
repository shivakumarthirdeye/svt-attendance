import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "../features/dashboard/dashboardSlice";
import designationReducer from "../features/designation/designationSlice";
import userReducer from "../features/user/userSlice";
import payrollSlice from "../features/payroll/payrollSlice";
import paymentSlice from "../features/payment/paymentSlice";
import shiftSlice from "../features/shift/shiftSlice";
import employmentStatusSlice from "../features/employemntStatus/employmentStatusSlice";
import attendanceReducer from "../features/attendance/attendanceSlice";
import leaveSlice from "../features/leave/leaveSlice";
import accountSlice from "../features/account/accountSlice";
import transactionSlice from "../features/transaction/transactionSlice";
import announcementSlice from "../features/announcement/announcementSlice";
import awardSlice from "../features/award/awardSlice";
import awardHistorySlice from "../features/awardHistory/awardHistorySlice";
import leavePolicySlice from "../features/leavePolicy/leavePolicySlice";
import weeklyHolidaySlice from "../features/weeklyHoliday/weeklyHolidaySlice";
import publicHolidaySlice from "../features/publicHoliday/publicHolidaySlice";

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const store = configureStore({
	reducer: {
		users: userReducer,

		dashboard: dashboardReducer,

		designations: designationReducer,
		payroll: payrollSlice,
		payment: paymentSlice,
		shift: shiftSlice,
		employmentStatus: employmentStatusSlice,
		attendance: attendanceReducer,
		leave: leaveSlice,
		accounts: accountSlice,
		transactions: transactionSlice,
		announcement: announcementSlice,
		award: awardSlice,
		awardHistory: awardHistorySlice,
		leavePolicy: leavePolicySlice,
		weeklyHoliday: weeklyHolidaySlice,
		publicHoliday: publicHolidaySlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
