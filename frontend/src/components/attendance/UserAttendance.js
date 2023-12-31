import React, { useEffect, useState } from 'react';
import ViewBtn from '../Buttons/ViewBtn';
import moment from 'moment';
import { Card, Table, Tag } from 'antd';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { CSVLink } from 'react-csv';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import PageTitle from '../page-header/PageHeader';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadAttendanceByUserId,
  clearAttendanceList,
} from '../../redux/rtk/features/attendance/attendanceSlice';
import { loadSingleStaff } from '../../redux/rtk/features/user/userSlice';
import jwtDecode from 'jwt-decode';
import { Link, useParams } from 'react-router-dom';
import BtnViewSvg from '../UI/Button/btnViewSvg';
import AttendBtn from '../Buttons/AttendBtn';
import UserPrivateComponent from '../PrivateRoutes/UserPrivateComponent';
import { allColors } from '../../utils/constant';

function CustomTable({ list, loading }) {
  const [columnsToShow, setColumnsToShow] = useState([]);

  const columns = [
    {
      id: 1,
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      id: 2,
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      render: ({ firstName, lastName }) => firstName + ' ' + lastName,
    },

    {
      id: 3,
      title: 'inTime',
      dataIndex: 'inTime',
      key: 'inTime',
      render: inTime => moment(inTime).format('DD-MM-YYYY, h:mm A'),
    },

    {
      id: 4,
      title: 'Out Time',
      dataIndex: 'outTime',
      key: 'outTime',
      render: outTime => moment(outTime).format('DD-MM-YYYY, h:mm A'),
    },
    {
      id: 4,
      title: 'In Status',
      dataIndex: 'inTimeStatus',
      key: 'inTimeStatus',
      render: inTimeStatus => {
        // use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
        if (inTimeStatus === 'Late') {
          return <Tag color='red'>{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === 'Early') {
          return <Tag color='blue'>{inTimeStatus.toUpperCase()}</Tag>;
        } else if (inTimeStatus === 'On Time') {
          return <Tag color='green'>{inTimeStatus.toUpperCase()}</Tag>;
        } else {
          return <Tag style={{ color: 'orange' }}>NONE</Tag>;
        }
      },
    },
    {
      id: 5,
      title: 'Out Status',
      dataIndex: 'outTimeStatus',
      key: 'outTimeStatus',
      render: outTimeStatus => {
        // use Tag component from antd to show status in different colors like green, red, yellow etc based on the status value
        if (outTimeStatus === 'Late') {
          return <Tag color='red'>{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === 'Early') {
          return <Tag color='blue'>{outTimeStatus.toUpperCase()}</Tag>;
        } else if (outTimeStatus === 'On Time') {
          return <Tag color='green'>{outTimeStatus.toUpperCase()}</Tag>;
        } else {
          return <Tag style={{ color: 'orange' }}>NONE</Tag>;
        }
      },
    },
    {
      id: 7,
      title: 'Punch By',
      dataIndex: 'punchBy',
      key: 'punchBy',
      render: punchBy => (
        <span>
          {punchBy[0]?.firstName + ' ' + punchBy[0]?.lastName || 'Not Checked'}
        </span>
      ),
    },
    {
      id: 6,
      title: 'Total Hour',
      dataIndex: 'totalHour',
      key: 'totalHour',
      render: totalHour => totalHour || 'Not Checked',
    },

    // {
    // 	id: 8,
    // 	title: "Action",
    // 	dataIndex: "id",
    // 	key: "id",
    // 	render: (id) => (
    // 		<AttendBtn
    // 			path={`/admin/attendance/${id}`}
    // 			text='View'
    // 			icon={<BtnViewSvg />}
    // 		/>
    // 	),
    // },
  ];

  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  const columnsToShowHandler = val => {
    setColumnsToShow(val);
  };

  const addKeys = arr => arr.map(i => ({ ...i, key: i.id }));

  return (
    <Card className='mt-5'>
      <div className='text-center my-2 flex justify-between'>
        <h5 className='department-list-title text-color-2 text-xl mb-2'>
          Attendance History
        </h5>
        {list && (
          <div>
            <CsvLinkBtn>
              <CSVLink
                data={list}
                className='btn btn-dark btn-sm mb-1'
                filename='attendance_user'
              >
                Download CSV
              </CSVLink>
            </CsvLinkBtn>
          </div>
        )}
      </div>

      {list && (
        <div style={{ marginBottom: '30px' }}>
          <ColVisibilityDropdown
            options={columns}
            columns={columns}
            columnsToShowHandler={columnsToShowHandler}
          />
        </div>
      )}

      <div className='flex flex-wrap gap-5 my-5 '>
        {[
          {
            id: 1,
            name: 'present',
            count: 10,
          },
          {
            id: 2,
            name: 'absent',
            count: 5,
          },
          {
            id: 3,
            name: 'halfDay',
            count: 1,
          },
          {
            id: 4,
            name: 'dayOff',
            count: 8,
          },
          {
            id: 5,
            name: 'paidLeave',
            count: 2,
          },
          {
            id: 6,
            name: 'unpaidLeave',
            count: 11,
          },
          {
            id: 7,
            name: 'halfDayLeave',
            count: 10,
          },
        ].map(item => {
          return (
            <div
              key={item.id}
              className='bg-[#f2f2f2] min-w-[150px]  max-w-[180px] flex-1 rounded-2xl px-4 flex flex-col items-center justify-center py-6'
            >
              <h1 className='text-3xl font-bold'>{item.count}</h1>
              <div className='mt-2  flex items-center gap-2'>
                <div
                  className='w-fit rounded-full'
                  style={{
                    border: `1px solid ${allColors[item.name]}`,
                  }}
                >
                  <div
                    className='w-4 h-4 rounded-full'
                    style={{
                      background: `${allColors[item.name]}`,
                      border: `2.5px solid #fff`,
                    }}
                  ></div>
                </div>
                <div>
                  <p className='capitalize text-lg '>
                    {' '}
                    {item.name.split(/(?=[A-Z][a-z0-9])/).join(' ')}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Table
        scroll={{ x: true }}
        loading={loading}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </Card>
  );
}

const UserAttendance = () => {
  const { list, loading } = useSelector(state => state.attendance);
  const { id } = useParams('id');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAttendanceByUserId(id));

    return () => {
      dispatch(clearAttendanceList());
    };
  }, [id]);

  return (
    <UserPrivateComponent permission='read-attendance'>
      <div>
        <PageTitle title='Back' />
        {!loading && <CustomTable list={list} loading={loading} />}
      </div>
    </UserPrivateComponent>
  );
};

export default UserAttendance;
