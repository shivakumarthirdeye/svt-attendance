import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';

import { useEffect, useState } from 'react';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTitle from '../page-header/PageHeader';
import UserPrivateComponent from '../PrivateRoutes/UserPrivateComponent';
import { loadAllDesignation } from '../../redux/rtk/features/designation/designationSlice';
import { loadAllEmploymentStatus } from '../../redux/rtk/features/employemntStatus/employmentStatusSlice';
import { loadAllShift } from '../../redux/rtk/features/shift/shiftSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '@testing-library/react';
import { getDepartments } from '../department/departmentApis';
import { getBranch } from '../branch/BranchApis';
import { loadAllStaff } from '../../redux/rtk/features/user/userSlice';
import EmployeeTable from '../customTables/EmployeeTable';
import ShiftTable from '../customTables/ShiftTable';
import DepartmentTable from '../customTables/DepartmentTable';
import BranchTable from '../customTables/BranchTable';
import DesignationTable from '../customTables/DesignationTable';

const MasterData = () => {
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
    setLoader(false);
  };

  const dispatch = useDispatch();

  const handleChange = value => {};

  const isLogged = Boolean(localStorage.getItem('isLogged'));

  const [value, setValue] = useState('');

  const setChecked = (object, value) => {
    Object.keys(object).forEach(key => {
      console.log('🚀 ~ file: master-data.js:51 ~ Object.keys ~ key:', key);

      object[key] = value;
    });
  };

  const onChange = e => {
    if (e.target.value === 'All Branch') {
      setChecked(branchCheck, true);
    } else {
      setChecked(branchCheck, false);
    }
    if (e.target.value === 'All Department') {
      setChecked(departmentCheck, true);
    } else {
      setChecked(departmentCheck, false);
    }
    if (e.target.value === 'All Designation') {
      setChecked(designationCheck, true);
    } else {
      setChecked(designationCheck, false);
    }
    if (e.target.value === 'All Shift') {
      setChecked(shiftCheck, true);
    } else {
      setChecked(shiftCheck, false);
    }
    if (e.target.value === 'All Employees') {
      setChecked(employeesCheck, true);
    } else {
      setChecked(employeesCheck, false);
    }
    setValue(e.target.value);
  };

  const [department, setDepartment] = useState(null);

  const [branch, setBranch] = useState(null);

  const designation = useSelector(state => state.designations?.list);

  const employmentStatus = useSelector(state => state.employmentStatus?.list);

  const shift = useSelector(state => state.shift?.list);

  const allEmployees = useSelector(state => state.users.list);

  const [branchCheck, setBranchChecked] = useState({});
  const [departmentCheck, setDepartmentChecked] = useState({});
  const [designationCheck, setDesignationChecked] = useState({});
  const [shiftCheck, setShiftChecked] = useState({});
  const [employeesCheck, setEmployeesChecked] = useState({});

  const onCheckChange = (e, name) => {
    if (name === 'branch') {
      setBranchChecked({
        ...branchCheck,
        [e.target.name]: e.target.checked,
      });
      setChecked(departmentCheck, false);
      setChecked(designationCheck, false);
      setChecked(shiftCheck, false);
      setChecked(employeesCheck, false);
    }

    if (name === 'department') {
      setDepartmentChecked({
        ...departmentCheck,
        [e.target.name]: e.target.checked,
      });
      setChecked(branchCheck, false);
      setChecked(employeesCheck, false);

      setChecked(designationCheck, false);
      setChecked(shiftCheck, false);
    }
    if (name === 'designation') {
      setDesignationChecked({
        ...designationCheck,
        [e.target.name]: e.target.checked,
      });
      setChecked(branchCheck, false);
      setChecked(departmentCheck, false);
      setChecked(shiftCheck, false);
      setChecked(employeesCheck, false);
    }
    if (name === 'shift') {
      setShiftChecked({
        ...shiftCheck,
        [e.target.name]: e.target.checked,
      });
      setChecked(branchCheck, false);
      setChecked(departmentCheck, false);
      setChecked(designationCheck, false);
      setChecked(employeesCheck, false);
    }
    if (name === 'employees') {
      setEmployeesChecked({
        ...employeesCheck,
        [e.target.name]: e.target.checked,
      });
      setChecked(branchCheck, false);
      setChecked(departmentCheck, false);
      setChecked(shiftCheck, false);
      setChecked(designationCheck, false);
    }
  };

  useEffect(() => {
    getDepartments()
      .then(d => {
        setDepartment(d);
        d.forEach(item => {
          setDepartmentChecked(prevDepartment => ({
            ...prevDepartment,
            [item.name]: false,
          }));
        });
      })
      .catch(error => console.log(error));
  }, []);
  useEffect(() => {
    getBranch()
      .then(d => {
        setBranch(d);
        d.forEach(item => {
          setBranchChecked(prevBranch => ({
            ...prevBranch,
            [item.name]: false,
          }));
        });
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    designation?.forEach(item => {
      setDesignationChecked(prevDesignation => ({
        ...prevDesignation,
        [item.name]: false,
      }));
    });
  }, [designation]);
  useEffect(() => {
    shift?.forEach(item => {
      setShiftChecked(prevShift => ({
        ...prevShift,
        [item.name]: false,
      }));
    });
  }, [shift]);
  useEffect(() => {
    allEmployees?.forEach(item => {
      setEmployeesChecked(prevEmp => ({
        ...prevEmp,
        [item.firstName]: false,
      }));
    });
  }, [allEmployees]);

  useEffect(() => {
    dispatch(loadAllDesignation());
    dispatch(loadAllEmploymentStatus());
    dispatch(loadAllShift());
    dispatch(loadAllStaff({ status: 'true' }));
  }, []);

  const [showReport, setShowReport] = useState(false);

  let reportComponent = null;

  switch (value) {
    case 'All Branch':
    case 'Few Branch': {
      const filterList = branch.filter(item => branchCheck[item.name] === true);

      if (showReport && !filterList.length) {
        toast.error('Select at least  1 branch');
        setShowReport(false);
      }
      reportComponent = <BranchTable list={filterList} />;
      break;
    }
    case 'All Department':
    case 'Few Department': {
      const filterList = department.filter(
        item => departmentCheck[item.name] === true
      );

      if (showReport && !filterList.length) {
        toast.error('Select at least  1 department');
        setShowReport(false);
      }
      reportComponent = <DepartmentTable list={filterList} />;
      break;
    }
    case 'All Shift':
    case 'Few Shift': {
      const filterList = shift.filter(item => shiftCheck[item.name] === true);

      if (showReport && !filterList.length) {
        toast.error('Select at least  1 shift');
        setShowReport(false);
      }
      reportComponent = <ShiftTable list={filterList} />;
      break;
    }
    case 'All Designation':
    case 'Few Designation': {
      const filterList = designation.filter(
        item => designationCheck[item.name] === true
      );

      if (showReport && !filterList.length) {
        toast.error('Select at least  1 designation');
        setShowReport(false);
      }
      reportComponent = <DesignationTable list={filterList} />;
      break;
    }
    case 'All Employees':
    case 'Few Employees': {
      // const filterList = allEmployees.map(item => {
      //   if (!employeesCheck[item.firstName] === true) return;

      //   return item;
      // });

      const filterList = allEmployees.filter(
        item => employeesCheck[item.firstName] === true
      );

      if (showReport && !filterList.length) {
        toast.error('Select at least  1 employee');
        setShowReport(false);
      }
      reportComponent = <EmployeeTable list={filterList} />;
      break;
    }
    default: {
      reportComponent = null;
    }
  }

  if (!isLogged) {
    return <Navigate to={'/admin/auth/login'} replace={true} />;
  }

  return (
    <>
      {showReport ? (
        <>
          <Card>
            <div className='flex items-center justify-between'>
              <h1 className='text-3xl capitalize'>Report Preview - {value}</h1>
              <Button
                type='ghost'
                shape='round'
                size='large'
                onClick={() => {
                  setShowReport(false);
                }}
              >
                Back
              </Button>
            </div>
          </Card>
          <div className='my-5'></div>

          {reportComponent}
        </>
      ) : (
        <>
          <PageTitle title={'Back'} />
          <div className='my-5'></div>
          <UserPrivateComponent permission={'create-rolePermission'}>
            <Card>
              <div>
                <div className='card-title  flex  justify-between'>
                  <h5 className='text-xl mb-3'>
                    <span className=' ml-2 report-section-card-title'>
                      Master Data
                    </span>
                  </h5>
                </div>
              </div>
              <div className=''>
                <h1 className='mb-3'>Selection By </h1>
                <Radio.Group onChange={onChange} value={value}>
                  <div className='grid grid-cols-5 gap-20 justify-between w-full '>
                    {[
                      'Branch',
                      'Department',
                      'Designation',
                      'Shift',
                      'Employees',
                    ].map(item => {
                      return (
                        <Space direction='vertical' className='w-[15vw]'>
                          <Radio value={`All ${item}`}>All {item}</Radio>
                          <Radio value={`Few ${item}`}>Few {item}</Radio>
                        </Space>
                      );
                    })}
                  </div>
                </Radio.Group>

                <div className='grid grid-cols-5 my-10 gap-20 justify-between w-full '>
                  <div className='w-[14vw] border p-5'>
                    {branch?.map(item => {
                      return (
                        <div>
                          <Checkbox
                            checked={branchCheck[item.name]}
                            disabled={!value.includes('Branch')}
                            name={item.name}
                            onChange={e => {
                              onCheckChange(e, 'branch');
                              setValue('Few Branch');
                            }}
                          >
                            {item.name}
                          </Checkbox>
                        </div>
                      );
                    })}
                  </div>
                  <div className='w-[14vw] border p-5'>
                    {department?.map(item => {
                      return (
                        <div>
                          <Checkbox
                            checked={departmentCheck[item.name]}
                            disabled={!value.includes('Department')}
                            onChange={e => {
                              onCheckChange(e, 'department');
                              setValue('Few Department');
                            }}
                            name={item.name}
                          >
                            {item.name}
                          </Checkbox>
                        </div>
                      );
                    })}
                  </div>
                  <div className='w-[14vw] border p-5'>
                    {designation?.map(item => {
                      return (
                        <div>
                          <Checkbox
                            checked={designationCheck[item.name]}
                            disabled={!value.includes('Designation')}
                            onChange={e => {
                              onCheckChange(e, 'designation');
                              setValue('Few Designation');
                            }}
                            name={item.name}
                          >
                            {item.name}
                          </Checkbox>
                        </div>
                      );
                    })}
                  </div>
                  <div className='w-[14vw] border p-5'>
                    {shift?.map(item => {
                      return (
                        <div>
                          <Checkbox
                            checked={shiftCheck[item.name]}
                            disabled={!value.includes('Shift')}
                            onChange={e => {
                              onCheckChange(e, 'shift');
                              setValue('Few Shift');
                            }}
                            name={item.name}
                          >
                            {item.name}
                          </Checkbox>
                        </div>
                      );
                    })}
                  </div>
                  <div className='w-[14vw] border p-5'>
                    {allEmployees?.map(item => {
                      return (
                        <div>
                          <Checkbox
                            checked={employeesCheck[item.firstName]}
                            disabled={!value.includes('Employees')}
                            onChange={e => {
                              onCheckChange(e, 'employees');
                              setValue('Few Employees');
                            }}
                            name={item.firstName}
                          >
                            {item.firstName}
                          </Checkbox>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-center'>
                <Button
                  type='primary'
                  htmlType='submit'
                  shape='round'
                  size='large'
                  disabled={!value}
                  onClick={() => {
                    setShowReport(true);
                  }}
                  className='disabled:text-white disabled:opacity-50'
                >
                  Show Report
                </Button>
              </div>
            </Card>
          </UserPrivateComponent>
        </>
      )}
    </>
  );
};

export default MasterData;
