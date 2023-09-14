import { Button, DatePicker, Form, Input, Modal, Table } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPayslipAdvance } from '../../../redux/rtk/features/payroll/payrollSlice';
import axios from 'axios';
import { useEffect } from 'react';

const AddAdvancePopup = ({
  isModalVisible,
  handleOk,
  handleModalClose,
  userInfo,
}) => {
  const { firstName, lastName, createdAt } = userInfo;
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [paymentDate, setPaymentDate] = useState(null);

  const onFinish = async values => {
    const finalValues = {
      ...values,
      paymentDate: paymentDate,
      payslipId: userInfo.id,
    };

    dispatch(addPayslipAdvance(finalValues));
    form.resetFields();
    await getPayslipAdvanceHistory();
  };

  const [advanceHistory, setAdvanceHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const getPayslipAdvanceHistory = async values => {
    setIsLoadingHistory(true);
    try {
      const { data } = await axios.get(
        `payroll/advance-history?payslipId=${userInfo.id}`
      );
      setAdvanceHistory(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    getPayslipAdvanceHistory();
  }, []);

  return (
    <Modal
      title={
        <div className='flex items-center justify-between pr-10'>
          <h1 className='capitalize'>
            {firstName} {lastName}
          </h1>
          <span> {moment(createdAt).format('LL')}</span>
        </div>
      }
      open={isModalVisible}
      onCancel={handleModalClose}
      onOk={handleOk}
      footer={null}
    >
      <div className='flex items-center  w-full space-x-4'>
        <Form
          form={form}
          eventKey='shift-form'
          name='basic'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ width: '100%' }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          validateTrigger={true}
          autoComplete='off'
        >
          <h1 className='text-[#333333] font-medium mb-4'>
            Add advance given for June 2023
          </h1>

          <Form.Item
            style={{ marginBottom: '10px', width: '100%' }}
            label='Amount:'
            name='amount'
            rules={[
              {
                required: true,
                message: 'Please input  Amount',
              },
            ]}
          >
            <Input
              type='number'
              placeholder='Amount'
              prefix='₹'
              className='pl-2'
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: '10px' }}
            label='Payment Date'
            name='paymentDate'
            rules={[
              {
                required: true,
                message: 'Please input payment date',
              },
            ]}
          >
            <DatePicker
              format={'YYYY-MM-DD'}
              onChange={(date, dateString) => setPaymentDate(dateString)}
            />
          </Form.Item>

          <Form.Item
            style={{ marginBottom: '10px', width: '100%' }}
            label='Notes:'
            name='notes'
            rules={[
              {
                required: true,
                message: 'Please input  Note',
              },
            ]}
          >
            <TextArea placeholder='Notes' />
          </Form.Item>
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
            >
              Add Advances
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <h1 className='text-[#333333] font-medium mb-4'>
          Advance history listed
        </h1>
        <div>
          {isLoadingHistory ? (
            <p className='text-center'>Loading</p>
          ) : !advanceHistory.length ? (
            <p className='text-center'>No history</p>
          ) : (
            <CustomTable list={advanceHistory} loading={isLoadingHistory} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddAdvancePopup;

function CustomTable({ list, loading }) {
  const [columnsToShow, setColumnsToShow] = useState([]);

  const dispatch = useDispatch();
  // const loadingButton = useSelector((state) => state.payment.loading);
  const [loadingButton, setLoadingButton] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      render: amount => `₹${amount}`,
    },

    {
      title: 'Note',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: paymentDate => `${moment(paymentDate).format('YYYY-MM-DD')}`,
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
    <div className='mt-5'>
      {/* <div className='text-center my-2 flex justify-between'>
        {list && (
          <div style={{ marginBottom: '30px' }}>
            <ColVisibilityDropdown
              options={columns}
              columns={columns}
              columnsToShowHandler={columnsToShowHandler}
            />
          </div>
        )}

        {list && (
          <div>
            <CsvLinkBtn>
              <CSVLink
                data={list}
                className='btn btn-dark btn-sm mb-1'
                filename='payslips'
              >
                Download CSV
              </CSVLink>
            </CsvLinkBtn>
          </div>
        )}
      </div> */}

      <Table
        scroll={{ x: true }}
        loading={loading || loadingButton}
        columns={columnsToShow}
        pagination={false}
        dataSource={list ? addKeys(list) : []}
      />
    </div>
  );
}
