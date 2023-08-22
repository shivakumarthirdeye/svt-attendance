import {
  ClockCircleOutlined,
  CheckOutlined,
  UsergroupDeleteOutlined,
  RocketOutlined,
  NotificationFilled,
  TrophyFilled,
  SubnodeOutlined,
  CalendarOutlined,
  FileDoneOutlined,
  PieChartFilled,
  FileOutlined,
  FlagFilled,
  HomeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
  FileSyncOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { disable } from 'workbox-navigation-preload';
import getPermissions from '../../utils/getPermissions';
import getUserFromToken from '../../utils/getUserFromToken';
// import styles from "./Sidenav.module.css";

const Sidenav = ({ color, sideNavOpenKeys }) => {
  const user = getUserFromToken();
  const permissions = getPermissions();
  const hasPermission = item => {
    return permissions.includes(item);
  };
  // console.log("haspermission", hasPermission("create-user"));
  const menu = [
    {
      label: (
        <NavLink to='/admin/dashboard'>
          <span>Dashboard</span>
        </NavLink>
      ),
      key: 'dashboard',
      icon: <HomeOutlined />,
    },

    (hasPermission('create-user') ||
      hasPermission('read-user') ||
      hasPermission('read-role') ||
      hasPermission('read-designation') ||
      hasPermission('read-department')) && {
      label: 'HR',
      key: 'hr',
      icon: <UserOutlined />,
      children: [
        hasPermission('create-user') && {
          label: (
            <NavLink to='/admin/hr/staffs/new'>
              <span>New Employee</span>
            </NavLink>
          ),

          key: 'staffs',
          icon: <UsergroupAddOutlined />,
        },
        hasPermission('read-user') && {
          label: (
            <NavLink to='/admin/hr/staffs'>
              <span>Employee List</span>
            </NavLink>
          ),
          key: 'users',
          icon: <UsergroupAddOutlined />,
        },
        hasPermission('read-role') && {
          label: (
            <NavLink to='/admin/role'>
              <span>Role & Permissions</span>
            </NavLink>
          ),
          key: 'roleAndPermissions',
          icon: <UserSwitchOutlined />,
        },
        hasPermission('read-designation') && {
          label: (
            <NavLink to='/admin/designation/'>
              <span>Designation</span>
            </NavLink>
          ),
          key: 'designation',
          icon: <UserSwitchOutlined />,
        },
        hasPermission('read-department') && {
          label: (
            <NavLink to='/admin/department'>
              <span>Department</span>
            </NavLink>
          ),
          key: 'department',
          icon: <UserSwitchOutlined />,
        },
        hasPermission('read-department') && {
          label: (
            <NavLink to='/admin/branch'>
              <span>Branch</span>
            </NavLink>
          ),
          key: 'department',
          icon: <UserSwitchOutlined />,
        },
      ],
    },

    (hasPermission('create-attendance') ||
      hasPermission('read-attendance')) && {
      label: 'ATTENDANCE',
      key: 'attendance',
      icon: <ClockCircleOutlined />,
      children: [
        hasPermission('create-attendance') && {
          label: (
            <NavLink to='/admin/attendance'>
              <span>Attendance</span>
            </NavLink>
          ),
          key: 'attendance',
          icon: <FileDoneOutlined />,
        },
        hasPermission('read-attendance') && {
          label: (
            <NavLink to={`/admin/attendance/user/${user}`}>
              <span>My Attendance</span>
            </NavLink>
          ),
          key: 'myAttendance',
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission('create-payroll') || hasPermission('read-payroll')) && {
      label: 'PAYROLL',
      key: 'payroll',
      icon: <WalletOutlined />,
      children: [
        hasPermission('create-payroll') && {
          label: (
            <NavLink to='/admin/payroll/new'>
              <span>Calculate Payroll</span>
            </NavLink>
          ),
          key: 'calculatePayroll',
          icon: <FileDoneOutlined />,
        },
        hasPermission('read-payroll') && {
          label: (
            <NavLink to='/admin/payroll/list'>
              <span>Payslip List</span>
            </NavLink>
          ),
          key: 'payslipList',
          icon: <FileOutlined />,
        },
      ],
    },

    hasPermission('read-shift') && {
      label: 'SHIFT',
      key: 'shift',
      icon: <ClockCircleOutlined />,
      children: [
        hasPermission('read-shift') && {
          label: (
            <NavLink to='/admin/shift'>
              <span>Shift</span>
            </NavLink>
          ),
          key: 'newShift',
          icon: <FileDoneOutlined />,
        },
      ],
    },

    hasPermission('read-employmentStatus') && {
      label: 'EMPLOYEMENT',
      key: 'employementStatus',
      icon: <RocketOutlined />,
      children: [
        hasPermission('read-employmentStatus') && {
          label: (
            <NavLink to='/admin/office-time-policy'>
              <span>Office time policy</span>
            </NavLink>
          ),
          key: 'office-time-policy',
          icon: <FileDoneOutlined />,
        },
        hasPermission('read-employmentStatus') && {
          label: (
            <NavLink to='/admin/employment-status'>
              <span>Status</span>
            </NavLink>
          ),
          key: 'employementStatus',
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission('create-leaveApplication') ||
      hasPermission('read-leaveApplication')) && {
      label: 'LEAVE ',
      key: 'leave',
      icon: <UsergroupDeleteOutlined />,
      children: [
        hasPermission('create-leaveApplication') && {
          label: (
            <NavLink to='/admin/leave/new'>
              <span> New Leave </span>
            </NavLink>
          ),
          key: 'newLeave',
          icon: <SubnodeOutlined />,
        },
        hasPermission('read-leaveApplication') && {
          label: (
            <NavLink to='/admin/leave'>
              <span>Leave Status</span>
            </NavLink>
          ),
          key: 'leaveStatus',
          icon: <FileDoneOutlined />,
        },
        hasPermission('read-leaveApplication') && {
          label: (
            <NavLink to={`/admin/leave/user/${user}`}>
              <span>My Leaves</span>
            </NavLink>
          ),
          key: 'myLeaves',
          icon: <FileDoneOutlined />,
        },
      ],
    },

    (hasPermission('read-weeklyHoliday') ||
      hasPermission('read-publicHoliday')) && {
      label: 'HOLIDAY',
      key: 'holiday',
      icon: <CalendarOutlined />,
      children: [
        hasPermission('read-weeklyHoliday') && {
          label: (
            <NavLink to='/admin/holiday/week'>
              <span>Weekly Holiday</span>
            </NavLink>
          ),
          key: 'weeklyHoliday',
          icon: <PieChartFilled />,
        },
        hasPermission('read-publicHoliday') && {
          label: (
            <NavLink to='/admin/holiday/public'>
              <span>Public Holiday</span>
            </NavLink>
          ),
          key: 'publicHoliday',
          icon: <PieChartFilled />,
        },
      ],
    },

    hasPermission('read-leavePolicy') && {
      label: 'LEAVE POLICY',
      key: 'leavePolicy',
      icon: <CalendarOutlined />,
      children: [
        hasPermission('read-leavePolicy') && {
          label: (
            <NavLink to='/admin/leave-policy'>
              <span>Leave Policy</span>
            </NavLink>
          ),
          key: 'leavePolicy',
          icon: <PieChartFilled />,
        },
      ],
    },

    hasPermission('read-announcement') && {
      label: 'ANNOUNCEMENT',
      key: 'announcement',
      icon: <NotificationFilled />,
      children: [
        hasPermission('read-announcement') && {
          label: (
            <NavLink to='/admin/announcement'>
              <span>Announcement</span>
            </NavLink>
          ),
          key: 'newLeave',
          icon: <FlagFilled />,
        },
      ],
    },

    (hasPermission('read-account') ||
      hasPermission('read-transaction') ||
      hasPermission('create-transaction')) && {
      label: 'ACCOUNTS',
      key: 'accounts',
      icon: <WalletOutlined />,
      children: [
        hasPermission('read-account') && {
          label: (
            <NavLink to='/admin/account/'>
              <span>Account</span>
            </NavLink>
          ),
          key: 'accountList',
          icon: <UnorderedListOutlined />,
        },
        hasPermission('create-transaction') && {
          label: (
            <NavLink to='/admin/transaction/create'>
              <span>New Transaction</span>
            </NavLink>
          ),
          key: 'newTransaction',
          icon: <CheckOutlined />,
        },
        hasPermission('read-transaction') && {
          label: (
            <NavLink to='/admin/transaction/'>
              <span>Transaction List</span>
            </NavLink>
          ),
          key: 'transactionList',
          icon: <UnorderedListOutlined />,
        },
      ],
    },

    hasPermission('read-account') && {
      label: 'FINANCE REPORT',
      key: 'report',
      icon: <FlagOutlined />,
      children: [
        hasPermission('read-account') && {
          label: (
            <NavLink to='/admin/account/trial-balance'>
              <span>Trial Balance</span>
            </NavLink>
          ),
          key: 'trialBalance',
          icon: <FileDoneOutlined />,
        },
        hasPermission('read-account') && {
          label: (
            <NavLink to='/admin/account/balance-sheet'>
              <span>Balance Sheet</span>
            </NavLink>
          ),
          key: 'balanceSheet',
          icon: <FileOutlined />,
        },
        hasPermission('read-account') && {
          label: (
            <NavLink to='/admin/account/income'>
              <span>Income Statement</span>
            </NavLink>
          ),
          key: 'incomeStatement',
          icon: <FileSyncOutlined />,
        },
      ],
    },

    (hasPermission('crate-award') || hasPermission('read-award')) && {
      label: 'AWARDS',
      key: 'award',
      icon: <TrophyFilled />,
      children: [
        hasPermission('create-award') && {
          label: (
            <NavLink to='/admin/award/new'>
              <span>New Award</span>
            </NavLink>
          ),
          key: 'newAward',
          icon: <TrophyFilled />,
        },

        hasPermission('read-award') && {
          label: (
            <NavLink to='/admin/award'>
              <span>Award</span>
            </NavLink>
          ),
          key: 'award',
          icon: <TrophyFilled />,
        },
      ],
    },

    hasPermission('read-setting') && {
      label: 'SETTINGS',
      key: 'settings',
      icon: <SettingOutlined />,
      children: [
        hasPermission('read-setting') && {
          label: (
            <NavLink to='/admin/company-setting'>
              <span>Company Settings</span>
            </NavLink>
          ),
          key: 'invoiceSetting',
          icon: <SettingOutlined />,
        },
      ],
    },
  ];

  return (
    <div>
      <Menu
        theme='dark'
        mode='inline'
        items={menu}
        className='sidenav-menu'
        // openKeys={[sideNavOpenKeys]}
        // style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default Sidenav;
