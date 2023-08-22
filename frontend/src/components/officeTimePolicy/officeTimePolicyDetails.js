import { Button, Card, Popover, Table } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loader from '../loader/loader';
import PageTitle from '../page-header/PageHeader';
import BtnDeleteSvg from '../UI/Button/btnDeleteSvg';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { CSVLink } from 'react-csv';
import ViewBtn from '../Buttons/ViewBtn';
import moment from 'moment';
import { loadSingelEmploymentStatus } from '../../redux/rtk/features/employemntStatus/employmentStatusSlice';
import EmploymentStatusEditPopup from '../UI/PopUp/EmploymentStatusEditPopup';
import UserPrivateComponent from '../PrivateRoutes/UserPrivateComponent';
import { getSingleOfficeTimePolicy } from './officeTimePolicyApis';

//PopUp

const CustomTable = ({ list }) => {
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
      title: ' Name',
      key: 'firstName',
      render: ({ firstName, lastName }) => firstName + ' ' + lastName,
    },

    {
      id: 6,
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      id: 5,
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: role => role?.name,
    },

    {
      id: 6,
      title: 'Designation',
      dataIndex: 'designationHistory',
      key: 'designationHistory',
      render: designationHistory =>
        designationHistory[0]?.designation?.name || 'N/A',
    },

    {
      id: 4,
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: id => <ViewBtn path={`/admin/hr/staffs/${id}/`} />,
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
    <div>
      <div className='text-center my-2 flex justify-between'>
        <h5 className='department-list-title text-color-2 text-xl mb-2'>
          Employee List
        </h5>

        {list && (
          <div>
            <CsvLinkBtn>
              <CSVLink data={list} filename='user_branch'>
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
        loading={!list}
        columns={columnsToShow}
        dataSource={addKeys(list)}
        pagination={{ pageSize: 5 }}
        scroll={{ x: 720 }}
      />
    </div>
  );
};

const OfficeTimePolicyDetails = () => {
  const { id } = useParams();

  const [timePolicy, setTimePolicy] = useState();

  //Delete Supplier

  useEffect(() => {
    getSingleOfficeTimePolicy(id)
      .then(data => {
        setTimePolicy(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const isLogged = Boolean(localStorage.getItem('isLogged'));

  if (!isLogged) {
    return <Navigate to={'/admin/auth/login'} replace={true} />;
  }

  return (
    <div>
      <PageTitle title=' Back  ' />
      <UserPrivateComponent permission={'read-employmentStatus'}>
        <Card className='mr-top mt-5'>
          {timePolicy ? (
            <Fragment key={timePolicy.id}>
              <div>
                <div className='flex justify-between '>
                  <h3 className={'text-xl'}>
                    ID : {timePolicy.id} | {timePolicy.name}
                  </h3>
                  {/* <UserPrivateComponent permission={'update-department'}>
                    <div className='flex justify-end items-center'>
                      <BranchEditPopup data={timePolicy} />
                      <Popover
                        className='m-2'
                        content={
                          <a onClick={onDelete}>
                            <Button
                              // disabled={true}
                              type='primary'
                              danger
                              className='text-white'
                            >
                              Yes Please !
                            </Button>
                          </a>
                        }
                        title='Are you sure you want to delete ?'
                        trigger='click'
                        // visible={visible}
                        // onVisibleChange={handleVisibleChange}
                      >
                        <button className='mt-[2.2px]'>
                          <BtnDeleteSvg size={30} />
                        </button>
                      </Popover>
                    </div>
                  </UserPrivateComponent> */}
                </div>
                <CustomTable list={timePolicy.user} />
              </div>
            </Fragment>
          ) : (
            <Loader />
          )}
        </Card>{' '}
        {/* {timePolicy ? <CustomTable list={timePolicy?.user} /> : <Loader />} */}
      </UserPrivateComponent>
    </div>
  );
};

export default OfficeTimePolicyDetails;
