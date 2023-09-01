import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import { Card, Table } from 'antd';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { CSVLink } from 'react-csv';
import ViewBtn from '../Buttons/ViewBtn';

const ShiftTable = ({ list }) => {
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
      dataIndex: 'name',
      key: 'name',
    },

    {
      id: 3,
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: startTime => moment(startTime).format('hh:mm A'),
    },

    {
      id: 4,
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: endTime => moment(endTime).format('hh:mm A'),
    },
    {
      id: 5,
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: id => <ViewBtn path={`/admin/shift/${id}/`} />,
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
    <Card>
      <div className='text-center my-2 flex justify-between'>
        <h5 className='department-list-title text-color-2 text-xl mb-2'>
          Shift List
        </h5>
        {list && (
          <div>
            <CsvLinkBtn>
              <CSVLink
                data={list}
                className='btn btn-dark btn-sm mb-1'
                filename='shift'
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

      <Table
        scroll={{ x: true }}
        loading={!list}
        pagination={false}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </Card>
  );
};

export default ShiftTable;
