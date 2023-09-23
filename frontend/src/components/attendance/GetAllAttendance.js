import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Navigate } from 'react-router-dom';

import { Card, DatePicker, Segmented, Table, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch, useSelector } from 'react-redux';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';

import { CsvLinkBtn, TableHeraderh2 } from '../UI/CsvLinkBtn';
import {
  loadAllAttendancePaginated,
  clearAttendanceList,
} from '../../redux/rtk/features/attendance/attendanceSlice';
import BtnSearchSvg from '../UI/Button/btnSearchSvg';
import { VioletLinkBtn } from '../UI/AllLinkBtn';
import BtnViewSvg from '../UI/Button/btnViewSvg';
import { MdEdit } from 'react-icons/md';
import AttendancePopup from '../UI/PopUp/AttendancePopup';
import EditAttendancePopup from '../UI/PopUp/EditAttendancePopup';
import { allColors, attendanceStatus } from '../../utils/constant';
import { combineToSingleObject } from '../../utils/helpers';

//Date fucntinalities
let startdate = moment().startOf('month');
let enddate = moment().endOf('month');

function CustomTable({ list, total, status, setStatus, loading }) {
  const [columnsToShow, setColumnsToShow] = useState([]);

  const dispatch = useDispatch();

  const onChange = value => {
    setStatus(value);
    dispatch(
      loadAllAttendancePaginated({
        page: 1,
        limit: 30,
        startdate,
        enddate,
      })
    );
  };

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

    {
      id: 8,
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id, data) => {
        return (
          <button
            onClick={() => {
              setShowModal(prev => !prev);
              setUserInfo(data);
            }}
          >
            <MdEdit />
          </button>
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
      {showModal && (
        <EditAttendancePopup
          isModalVisible={showModal}
          userInfo={userInfo}
          handleModalClose={handleModalClose}
        />
      )}
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

          onChange: (page, limit) => {
            dispatch(
              loadAllAttendancePaginated({ page, limit, startdate, enddate })
            );
          },
        }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}

const GetAllAttendance = props => {
  const dispatch = useDispatch();

  const { list, loading } = useSelector(state => state.attendance);
  const [status, setStatus] = useState('true');

  // const [total, setTotal] = useState(0);

  const { RangePicker } = DatePicker;

  useEffect(() => {
    dispatch(
      loadAllAttendancePaginated({
        page: 1,
        limit: 30,
        startdate,
        enddate,
      })
    );
  }, []);

  const onCalendarChange = dates => {
    if (!dates || !dates?.[0] || !dates?.[1]) return;

    startdate = dates?.[0];

    enddate = dates?.[1];
  };

  const onClickSearch = () => {
    // dispatch(clearAttendanceList());

    dispatch(
      loadAllAttendancePaginated({
        page: 1,
        limit: 30,
        startdate,
        enddate,
      })
    );
  };

  // TODO : Add Search functionality here

  const isLogged = Boolean(localStorage.getItem('isLogged'));

  if (!isLogged) {
    return <Navigate to={'/admin/auth/login'} replace={true} />;
  }
  return (
    <>
      <Card className='card card-custom mt-3 '>
        <div className='card-body'>
          <div className='flex justify-between'>
            <TableHeraderh2>Attendance List</TableHeraderh2>
            <div className='flex justify-end'>
              <RangePicker
                onCalendarChange={onCalendarChange}
                defaultValue={[startdate, enddate]}
                format={'DD-MM-YYYY'}
                className='range-picker mr-3'
                style={{ maxWidth: '400px' }}
              />
              <VioletLinkBtn>
                <button onClick={onClickSearch}>
                  <BtnSearchSvg size={25} title={'SEARCH'} loading={loading} />
                </button>
              </VioletLinkBtn>
            </div>
          </div>
          {/*TODO : ADD TOTAL AMOUNT HERE */}
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
          <CustomTable
            list={list}
            loading={loading}
            total={100}
            startdate={startdate}
            enddate={enddate}
            status={status}
            setStatus={setStatus}
          />
        </div>
      </Card>
    </>
  );
};

export default GetAllAttendance;
