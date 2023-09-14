import { Form, Input, Modal, TimePicker } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { attendanceStatus } from '../../../utils/constant';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from 'react';
import {
  loadAllAttendance,
  updateManualAttendance,
} from '../../../redux/rtk/features/attendance/attendanceSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

dayjs.extend(customParseFormat);

const AllStatus = [
  {
    id: 1,
    name: 'present',
  },
  {
    id: 2,
    name: 'absent',
  },
  {
    id: 3,
    name: 'halfDay',
  },
  {
    id: 4,
    name: 'dayOff',
  },
];

const EditAttendancePopup = ({
  isModalVisible,
  userInfo,
  handleModalClose,
}) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const { user, createdAt, status, inTime, outTime, comment } = userInfo;

  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentComment, setCurrentComment] = useState(comment);

  const [inTimeDate, setInTimeDate] = useState({
    date: dayjs(inTime).format('YYYY-MM-DD'),
    time: dayjs(inTime).format('HH:mm:ss'),
  });
  const [outTimeDate, setOutTimeDate] = useState({
    date: dayjs(outTime).format('YYYY-MM-DD'),
    time: dayjs(outTime).format('HH:mm:ss'),
  });

  const onFinish = async e => {
    const inTimeDateNew = new Date(inTimeDate.date + ' ' + inTimeDate.time);
    const outTimeDateNew = new Date(outTimeDate.date + ' ' + outTimeDate.time);

    const FormData = {
      ...userInfo,
      status: currentStatus,
      inTime: inTimeDateNew == 'Invalid Date' ? null : inTimeDateNew,
      outTime: outTimeDateNew == 'Invalid Date' ? null : outTimeDateNew,
      comment: currentComment,
    };

    setLoader(true);
    const resp = await dispatch(updateManualAttendance(FormData));
    if (resp.payload.message === 'success') {
      setLoader(false);
      form.resetFields();
      setInTimeDate({});
      setOutTimeDate({});
      dispatch(loadAllAttendance());
      handleModalClose();
    } else {
      setLoader(false);
    }
  };
  const onFinishFailed = errorInfo => {
    toast.warning('Failed at adding');
    setLoader(false);
  };

  if (!userInfo) return null;

  return (
    <Modal
      title={
        <div className='flex items-center justify-between pr-10'>
          <h1>
            {user?.firstName} {user?.lastName}
          </h1>
          <span> {moment(createdAt).format('LL')}</span>
        </div>
      }
      open={isModalVisible}
      onCancel={handleModalClose}
      // onOk={onFinish}
      okText='Save'
      okButtonProps={{
        onClick: () => {
          onFinish();
        },
      }}
    >
      <div>
        <h1 className='text-[#333333] font-medium'>Attendance status</h1>
        <div className='flex items-center mt-4 space-x-4'>
          {AllStatus.map(item => {
            return (
              <button
                onClick={() => {
                  setCurrentStatus(item.name);
                }}
                key={item.id}
                className='capitalize py-1.5 px-2 rounded'
                style={{
                  border: `1px solid ${attendanceStatus[item.name]}`,
                  color:
                    currentStatus === item.name
                      ? '#fff'
                      : ` ${attendanceStatus[item.name]}`,
                  background:
                    currentStatus === item.name
                      ? ` ${attendanceStatus[item.name]}`
                      : '#fff',
                }}
              >
                {item.name.split(/(?=[A-Z][a-z0-9])/).join(' ')}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className='flex items-center mt-4 w-full space-x-4'>
          <Form
            form={form}
            style={{ margin: '20px 0' }}
            eventKey='shift-form'
            name='basic'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: '100%',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateTrigger={true}
            autoComplete='off'
          >
            <h1 className='text-[#333333] font-medium mb-4'>
              Punch IN & OUT time
            </h1>

            <Form.Item
              style={{ marginBottom: '20px' }}
              label='Punch In - '
              rules={[
                {
                  required: true,
                  message: 'Please input your start time!',
                },
              ]}
            >
              <TimePicker
                allowClear={false}
                className='ml-10'
                defaultValue={dayjs(inTimeDate.time, 'HH:mm:ss')}
                format={'HH:mm:s'}
                onChange={(time, timeString) =>
                  setInTimeDate({ ...inTimeDate, time: timeString })
                }
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: '20px' }}
              label='Punch out - '
              rules={[
                {
                  required: true,
                  message: 'Please input your start time!',
                },
              ]}
            >
              <TimePicker
                allowClear={false}
                className='ml-10'
                defaultValue={dayjs(outTimeDate.time, 'HH:mm:ss')}
                format={'HH:mm:s'}
                onChange={(time, timeString) =>
                  setInTimeDate({ ...outTimeDate, time: timeString })
                }
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: '10px', width: '100%' }}
              label='Comment'
              name='comment'
              initialValue={currentComment}
            >
              <TextArea
                className='ml-10'
                placeholder='Comment'
                onChange={e => {
                  setCurrentComment(e.target.value);
                }}
                value={currentComment}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditAttendancePopup;
