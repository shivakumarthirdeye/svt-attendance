import { Card, Table } from 'antd';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { CSVLink } from 'react-csv';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ViewBtn from '../Buttons/ViewBtn';
import { combineToSingleObject } from '../../utils/helpers';

const DesignationTable = ({ list, loading }) => {
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
      render: (name, { id }) => (
        <Link to={`/admin/designation/${id}`}>{name}</Link>
      ),
    },
    {
      id: 3,
      title: 'Action',
      key: 'action',
      render: ({ id }) => <ViewBtn path={`/admin/designation/${id}`} />,
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
    <div className='mt-4'>
      <div className='text-center my-2 flex justify-between'>
        <h5 className='text-xl ml-4'>Designation List</h5>
        {list && (
          <div>
            <CsvLinkBtn>
              <CSVLink
                data={combineToSingleObject(list)}
                className='btn btn-dark btn-sm mb-1'
                filename='designation'
              >
                Download CSV
              </CSVLink>
            </CsvLinkBtn>
          </div>
        )}
      </div>

      {list && (
        <div style={{ marginBottom: '30px' }} className='ml-4 mt-3'>
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
        pagination={false}
        // pagination={{
        // 	defaultPageSize: 20,
        // 	pageSizeOptions: [10, 20, 50, 100, 200],
        // 	showSizeChanger: true,

        // 	onChange: (page, limit) => {
        // 		dispatch(loadAllDesignation({ page, limit }));
        // 	},
        // }}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
};

export default DesignationTable;
