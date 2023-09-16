import { Card, Table } from 'antd';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { CSVLink } from 'react-csv';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import { useEffect, useState } from 'react';
import moment from 'moment';
import ViewBtn from '../Buttons/ViewBtn';
import { combineToSingleObject } from '../../utils/helpers';

const BranchTable = ({ list }) => {
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
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'addrcreatedAtess',
      render: createdAt => moment(createdAt).format('YYYY-MM-DD'),
    },
    {
      id: 4,
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: id => <ViewBtn path={`/admin/branch/${id}/`} />,
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
          Branch List
        </h5>
        {list && (
          <div>
            <CsvLinkBtn>
              <CSVLink
                data={combineToSingleObject(list)}
                className='btn btn-dark btn-sm mb-1'
                filename='branch'
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
        pagination={false}
        loading={!list}
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </Card>
  );
};

export default BranchTable;
