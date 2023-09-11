import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Typography,
} from 'antd';

import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import {
  loadAllShift,
  loadSingleShift,
} from '../../redux/rtk/features/shift/shiftSlice';
import { addLeaveApplication } from '../../redux/rtk/features/leave/leaveSlice';
import getUserFromToken from '../../utils/getUserFromToken';
import UserPrivateComponent from '../PrivateRoutes/UserPrivateComponent';
import { loadAllStaff } from '../../redux/rtk/features/user/userSlice';

const AddLeave = ({ drawer }) => {
  const [loader, setLoader] = useState(false);
  const shift = useSelector(state => state.shift.list);

  //get id from JWT token in localstorage and decode it

  const id = getUserFromToken();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllShift());
  }, []);

  const { Title } = Typography;
  const [form] = Form.useForm();

  const onFinish = async values => {
    const leaveData = {
      ...values,
      leaveFrom: moment(values.leaveFrom).format(),
      leaveTo: moment(values.leaveTo).format(),
      isHalfDay,
    };

    setLoader(true);
    const resp = await dispatch(addLeaveApplication(leaveData));

    if (resp.payload.message === 'success') {
      setLoader(false);
      form.resetFields();
      dispatch(loadAllShift());
    } else {
      setLoader(false);
    }
  };

  const allEmployees = useSelector(state => state.users.list);
  console.log(
    '🚀 ~ file: AddLeave.js:65 ~ AddLeave ~ allEmployees:',
    allEmployees
  );

  useEffect(() => {
    dispatch(loadAllStaff({ status: 'true' }));
  }, []);

  const onFinishFailed = errorInfo => {
    toast.warning('Failed at adding shift');
    setLoader(false);
  };

  const [isHalfDay, setIsHalfDay] = useState(false);
  return (
    <Fragment bordered={false}>
      <UserPrivateComponent permission={'create-leaveApplication'}>
        <Row className='mr-top' justify={drawer ? 'center' : 'center'}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={drawer ? 22 : 16}
            xl={drawer ? 22 : 12}
            className='column-design border rounded card-custom'
          >
            <Title level={4} className='m-2 mt-5 mb-5 text-center'>
              Application for Leave
            </Title>
            <Form
              form={form}
              style={{ marginBottom: '40px' }}
              eventKey='shift-form'
              name='basic'
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 12,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <div>
                <Form.Item
                  style={{ marginBottom: '10px' }}
                  label='User'
                  name='userId'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your user!',
                    },
                  ]}
                >
                  <Select placeholder='Select User'>
                    {allEmployees?.map(user => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  style={{ marginBottom: '10px' }}
                  label='Leave Type'
                  name='leaveType'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your shift!',
                    },
                  ]}
                >
                  <Select
                    mode='single'
                    placeholder='Select leave type'
                    optionFilterProp='children'
                  >
                    <Select.Option value='PAID'>PAID</Select.Option>
                    <Select.Option value='UNPAID'>UNPAID</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: '10px' }}
                  label='Start Date'
                  name='leaveFrom'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your shift!',
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: '20px' }}
                  label='End Date'
                  name='leaveTo'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your shift!',
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: '20px' }}
                  label='Half Day'
                  name='isHalfDay'
                >
                  <Checkbox
                    checked={isHalfDay}
                    onChange={() => {
                      setIsHalfDay(prev => !prev);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  style={{ marginBottom: '10px' }}
                  wrapperCol={{
                    offset: 6,
                    span: 12,
                  }}
                >
                  <Button
                    onClick={() => setLoader(true)}
                    type='primary'
                    size='large'
                    htmlType='submit'
                    block
                    loading={loader}
                  >
                    Submit Leave
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </UserPrivateComponent>
    </Fragment>
  );
};

export default AddLeave;
