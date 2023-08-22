import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Table,
  TimePicker,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ViewBtn from '../Buttons/ViewBtn';
import ColVisibilityDropdown from '../Shared/ColVisibilityDropdown';
import { CsvLinkBtn } from '../UI/CsvLinkBtn';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEmploymentStatus,
  loadAllEmploymentStatus,
} from '../../redux/rtk/features/employemntStatus/employmentStatusSlice';

import { HexColorPicker } from 'react-colorful';
import UserPrivateComponent from '../PrivateRoutes/UserPrivateComponent';
import {
  addOfficeTimePolicy,
  getAllOfficeTimePolicies,
} from './officeTimePolicyApis';

dayjs.extend(customParseFormat);

function CustomTable({ list }) {
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
      title: 'Policy Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      id: 3,
      title: 'Late allow',
      dataIndex: 'lateArrivalTime',
      key: 'lateArrivalTime',
      render: data => {
        return <>{data}H</>;
      },
    },

    {
      id: 4,
      title: 'Late deduct rate',
      dataIndex: 'lateDeductionRate',
      key: 'lateDeductionRate',
      render: (data, row) => {
        return (
          <>
            ₹{data}/{row.lateDeductionType}
          </>
        );
      },
    },
    {
      id: 5,
      title: 'Early allow',
      dataIndex: 'earlyDepartureTime',
      key: 'earlyDepartureTime',
      render: data => {
        return <>{data}H</>;
      },
    },

    {
      id: 6,
      title: 'Early deduct rate',
      dataIndex: 'earlyDeductionRate',
      key: 'earlyDeductionRate',
      render: (data, row) => {
        return (
          <>
            ₹{data}/{row.earlyDeductionType}
          </>
        );
      },
    },
    {
      id: 7,
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      render: id => <ViewBtn path={`/admin/office-time-policy/${id}`} />,
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
          Office Time Policy List
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
        columns={columnsToShow}
        dataSource={list ? addKeys(list) : []}
      />
    </Card>
  );
}

const AddOfficeTime = ({ drawer }) => {
  const [loader, setLoader] = useState(false);
  const [timePolicies, setTimePolicies] = useState([]);

  const [color, setColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const dispatch = useDispatch();

  const getAllTimePolicies = async () => {
    const data = await getAllOfficeTimePolicies();
    setTimePolicies(data);
  };

  useEffect(() => {
    getAllTimePolicies();
  }, []);

  const { Title } = Typography;
  const [form] = Form.useForm();
  const [lateTime, setLateTime] = useState();
  const [earlyTime, setEarlyTime] = useState();
  const [lateDeductionType, setLateDeductionType] = useState('day');
  const [earlyDeductionType, setEarlyDeductionType] = useState('day');

  const onFinish = async values => {
    const formData = {
      ...values,
      lateArrivalTime: lateTime,
      earlyDepartureTime: earlyTime,
      lateDeductionType,
      earlyDeductionType,
    };

    setLoader(true);

    await addOfficeTimePolicy(formData);
    await getAllTimePolicies();
    form.resetFields();
    setLoader(false);
  };

  const onFinishFailed = errorInfo => {
    toast.warning('Failed at adding shift');
    setLoader(false);
  };
  const options = [
    {
      label: 'Day Wise',
      value: 'day',
    },
    {
      label: 'Hour Wise',
      value: 'hour',
    },
  ];

  return (
    <Fragment>
      <UserPrivateComponent permission={'create-employmentStatus'}>
        <Row className='mr-top' justify={drawer ? 'center' : 'space-between'}>
          <Col span={24} className='column-design border rounded card-custom'>
            <Title level={4} className='m-2 mt-5 mb-5 text-center'>
              Add new Office time policy
            </Title>
            <Form
              form={form}
              style={{ marginBottom: '40px', padding: '0 20px' }}
              eventKey='shift-form'
              name='basic'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Row>
                <Col span={12}>
                  <div>
                    <Form.Item
                      style={{ marginBottom: '10px' }}
                      label='Policy Name'
                      name='name'
                      rules={[
                        {
                          required: true,
                          message: 'Policy Name',
                        },
                      ]}
                    >
                      <Input placeholder='Parmanet' />
                    </Form.Item>
                    <h1 className='text-center uppercase font-medium text-[#294F83] my-8 text-2xl'>
                      Late coming fine
                    </h1>

                    <Form.Item
                      style={{ marginBottom: '10px' }}
                      label='Permitted late arrival:'
                      name='lateArrivalTime'
                      rules={[
                        {
                          required: true,
                          message: 'Please input the time',
                        },
                      ]}
                    >
                      <TimePicker
                        format={'HH:mm'}
                        placeholder='00.00'
                        onChange={(time, timeString) => setLateTime(timeString)}
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: '30px' }}
                      label='Deduction type:'
                      name={'lateDeductionType'}
                      rules={[
                        {
                          required: true,
                          message: 'Please Select  Late Deduct Type!',
                        },
                      ]}
                    >
                      <Radio.Group
                        className='ml-3 mr-3'
                        options={options}
                        value={lateDeductionType}
                        onChange={e => {
                          setLateDeductionType(e.target.value);
                        }}
                        // optionType='button'
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: '10px' }}
                      label='Deduct rate'
                      name='lateDeductionRate'
                      rules={[
                        {
                          required: true,
                          message: 'Please input  Late Deduct rate!',
                        },
                      ]}
                    >
                      <Input
                        className='px-2'
                        prefix='₹'
                        type='number'
                        suffix={`/${lateDeductionType}`}
                      />
                    </Form.Item>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Form.Item
                      style={{ marginBottom: '10px' }}
                      label='Mark as half day, if working hour less than* :'
                      name='markAsHalfDay'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your shift!',
                        },
                      ]}
                    >
                      <Input placeholder='Parmanet' />
                    </Form.Item>
                    <h1 className='text-center uppercase font-medium text-[#294F83] my-8 text-2xl'>
                      Early Going fine
                    </h1>

                    <Form.Item
                      style={{ marginBottom: '10px' }}
                      label='Permitted early departure:'
                      name='earlyDepartureTime'
                      rules={[
                        {
                          required: true,
                          message: 'Please input the time',
                        },
                      ]}
                    >
                      <TimePicker
                        format={'HH:mm'}
                        placeholder='00.00'
                        onChange={(time, timeString) =>
                          setEarlyTime(timeString)
                        }
                        // onChange={(time, timeString) =>
                        //   setInTimeDate({ ...inTimeDate, time: timeString })
                        // }
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: '30px' }}
                      label='Deduction type:'
                      name={'earlyDeductionType'}
                      rules={[
                        {
                          required: true,
                          message: 'Please Select  Early Deduct Type!',
                        },
                      ]}
                    >
                      <Radio.Group
                        className='ml-3 mr-3'
                        options={options}
                        value={earlyDeductionType}
                        onChange={e => {
                          setEarlyDeductionType(e.target.value);
                        }}

                        // optionType='button'
                      />
                    </Form.Item>

                    <Form.Item
                      style={{ marginBottom: '10px' }}
                      label='Deduct rate'
                      name='earlyDeductionRate'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your Early Deduct rate!',
                        },
                      ]}
                    >
                      <Input
                        className='px-2'
                        prefix='₹'
                        type='number'
                        suffix={`/${earlyDeductionType}`}
                      />
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <Form.Item
                style={{ marginBottom: '10px', marginTop: '10px' }}
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <Button
                  className='mt-5'
                  size='large'
                  // onClick={() => setLoader(true)}
                  block
                  type='primary'
                  htmlType='submit'
                  shape='round'
                  loading={loader}
                >
                  Add Employee Fine policy
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </UserPrivateComponent>
      <hr />
      <UserPrivateComponent permission={'read-employmentStatus'}>
        {drawer || <CustomTable list={timePolicies} />}
      </UserPrivateComponent>
    </Fragment>
  );
};

export default AddOfficeTime;
