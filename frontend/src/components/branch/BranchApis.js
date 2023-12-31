import axios from 'axios';
import { toast } from 'react-toastify';

// Get Roles
export const getBranch = async () => {
  const { data } = await axios.get(`branch?query=all`);

  return data;
};

// Create Role

export const addBranch = async values => {
  try {
    const { data } = await axios({
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      url: `branch`,
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
    toast.error('Error in adding Department try again');
    console.log(error.message);
    return {
      message: 'error',
    };
  }
};

// Detail Role View

export const loadSingleBranch = async id => {
  //dispatching with an call back function and returning that

  try {
    const { data } = await axios.get(`branch/${id}`);
    return {
      data,
      message: 'Success',
    };
    //dispatching data
  } catch (error) {
    console.log(error.message);
  }
};

// Update Department

export const updateBranch = async (id, values) => {
  try {
    const { data } = await axios({
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      url: `branch/${id}`,
      data: {
        ...values,
      },
    });
    //dispatching data
    toast.success('Updated successful');

    return {
      data,
      message: 'success',
    };
  } catch (error) {
    toast.error('Error in updating Department try again');
    console.log(error.message);

    return {
      message: 'error',
    };
  }
};

// Delete Department

export const deleteBranch = async id => {
  try {
    const { data } = await axios({
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      url: `branch/${id}`,
    });
    //dispatching data
    toast.success('Deleted successful');

    return {
      data,
      message: 'success',
    };
  } catch (error) {
    toast.error('Error in deleting Department try again');
    console.log(error.message);
    return {
      message: 'error',
    };
  }
};
