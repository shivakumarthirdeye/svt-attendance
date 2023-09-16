import React from 'react';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { CSVLink } from 'react-csv';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import { loadAllAttendancePaginated } from '../../redux/rtk/features/attendance/attendanceSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import moment from 'moment';
import { Table, Tag } from 'antd';
import { useEffect } from 'react';
import { attendanceStatus } from '../../utils/constant';
import { combineToSingleObject } from '../../utils/helpers';

const AttendanceTable = ({
  list,
  total,
  status,
  setStatus,
  loading,
  startdate,
  enddate,
}) => {
  const [columnsToShow, setColumnsToShow] = useState([]);

  const dispatch = useDispatch();

  const columns = [
    {
      id: 1,
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      id: 10,
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      render: user => `${user?.firstName} ${user?.lastName}`,
    },
    {
      id: 2,
      title: 'In Time',
      dataIndex: 'inTime',
      key: 'inTime',
      render: inTime => moment(inTime).format('DD-MM-YYYY, h:mm A') || 'NONE',
    },
    {
      id: 3,
      title: 'Out Time ',
      dataIndex: `outTime`,
      key: 'outTime',
      render: outTime => moment(outTime).format('DD-MM-YYYY, h:mm A') || 'NONE',
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
      id: 6,
      title: 'Total Hour',
      dataIndex: 'totalHour',
      key: 'totalHour',
      render: totalHour => totalHour || 'Not Checked',
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
      id: 7,
      title: 'Attendance',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        return (
          <span
            className={'text-white py-1 px-2 capitalize rounded-sm'}
            style={{
              background: attendanceStatus[status],
            }}
          >
            {status}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  const columnsToShowHandler = val => {
    setColumnsToShow(val);
  };

  const addKeys = arr => arr.map(i => ({ ...i, key: i.id }));

  const CSVlist = list?.map(i => ({
    ...i,
    supplier: i?.supplier?.name,
  }));

  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className='mt-5'>
      {list && (
        <div className='text-center my-2 flex justify-end'>
          <CsvLinkBtn>
            <CSVLink data={combineToSingleObject(CSVlist)} filename='purchase'>
              Download CSV
            </CSVLink>
          </CsvLinkBtn>

          {/*<div>
						<Segmented
							className='text-center rounded text-red-500 mt-0.5'
							size='middle'
							options={[
								{
									label: (
										<span>
											<i className='bi bi-person-lines-fill'></i> Active
										</span>
									),
									value: "true",
								},
								{
									label: (
										<span>
											<i className='bi bi-person-dash-fill'></i> Inactive
										</span>
									),
									value: "false",
								},
							]}
							value={status}
							onChange={onChange}
						/>
            </div> */}
        </div>
      )}
      {list && (
        <div style={{ marginBottom: '30px' }}>
          <ColVisibilityDropdown
            options={columns}
            columns={columns}
            columnsToShowHandler={columnsToShowHandler}
          />
        </div>
      )}
      <Table
        scroll={{ x: true }}
        loading={loading}
        pagination={{
          defaultPageSize: 30,
          pageSizeOptions: [30, 40, 50, 100, 200],
          showSizeChanger: true,
          total: total ? total : 100,

          // onChange: (page, limit) => {
          //   dispatch(
          //     loadAllAttendancePaginated({ page, limit, startdate, enddate })
          //   );
          // },
        }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
};

export default AttendanceTable;
