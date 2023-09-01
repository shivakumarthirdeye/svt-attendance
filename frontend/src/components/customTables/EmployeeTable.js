import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import { Table } from 'antd';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { CSVLink } from 'react-csv';
import ViewBtn from '../Buttons/ViewBtn';
import AttendBtn from '../Buttons/AttendBtn';

const EmployeeTable = ({ list }) => {
  const [columnsToShow, setColumnsToShow] = useState([]);

  const { loading } = useSelector(state => state.users);

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

      key: 'fullName',
      render: ({ firstName, lastName }) =>
        (firstName + ' ' + lastName).toUpperCase(),
    },
    {
      id: 3,
      title: 'Usr Name',
      dataIndex: 'userName',
      key: 'userName',
    },

    // {
    // 	id: 4,
    // 	title: "Role",
    // 	dataIndex: "role",
    // 	key: "role",
    // 	render: (role) => role.name,
    // },
    {
      id: 5,
      title: 'Designation',
      dataIndex: 'designationHistory',
      key: 'designationHistory',
      render: record =>
        record.length > 0 ? record[0].designation.name : 'N/A',
    },

    // TODO: fix this column to show the correct data

    {
      id: 6,
      title: 'E-Status',
      dataIndex: 'employmentStatus',
      key: 'employmentStatus',
      render: record => (record?.name ? record?.name : 'N/A'),
    },
    {
      id: 7,
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: record => (record?.name ? record?.name : 'N/A'),
    },
    {
      id: 8,
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: record => (record?.name ? record?.name : 'N/A'),
    },

    {
      id: 9,
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
      render: record => (record?.name ? record?.name : 'N/A'),
    },

    {
      id: 7,
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: id => (
        <div className='flex justify-start'>
          <ViewBtn path={`/admin/hr/staffs/${id}/`} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setColumnsToShow(columns);
  }, []);

  const columnsToShowHandler = val => {
    setColumnsToShow(val);
  };

  const addKeys = arr => arr.map(i => ({ ...i, key: i.id }));
  return (
    <div className='ant-card p-4 rounded mt-5'>
      <div className='flex my-2 justify-between'>
        <div className='w-50'>
          <h4 className='text-2xl mb-2'>Employee List</h4>
        </div>
        {list && (
          <div className='flex justify-end mr-4'>
            <div className='mt-0.5'>
              <CsvLinkBtn>
                <CSVLink
                  data={list}
                  className='btn btn-dark btn-sm'
                  style={{ marginTop: '5px' }}
                  filename='staffs'
                >
                  Download CSV
                </CSVLink>
              </CsvLinkBtn>
            </div>
          </div>
        )}
      </div>
      <div className='flex items-center space-x-10 mb-6'>
        {list && (
          <div>
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            />
          </div>
        )}
      </div>

      <Table
        scroll={{ x: true }}
        loading={loading}
        pagination={false}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
};

export default EmployeeTable;
