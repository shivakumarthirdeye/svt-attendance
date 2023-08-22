import axios from 'axios';
import { toast } from 'react-toastify';

export const getAllOfficeTimePolicies = async () => {
  const { data } = await axios.get(`office-time-policy`);

  return data;
};

export const addOfficeTimePolicy = async values => {
  try {
    const { data } = await axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      url: `office-time-policy`,
      data: {
        ...values,
      },
    });
    //dispatching data
    toast.success('Added successful');

    return {
      data,
      message: 'success',
    };
  } catch (error) {
    toast.error('Error Please try again');
    console.log(error.message);
    return {
      message: 'error',
    };
  }
};

export const getSingleOfficeTimePolicy = async id => {
  const { data } = await axios.get(`office-time-policy/${id}`);

  return data;
};
