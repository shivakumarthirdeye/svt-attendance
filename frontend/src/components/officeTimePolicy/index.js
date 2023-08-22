import React from 'react';
import { Navigate } from 'react-router-dom';
import PageTitle from '../page-header/PageHeader';
import AddOfficeTime from './AddOfficeTime';

const OfficeTimePolicy = () => {
  const isLogged = Boolean(localStorage.getItem('isLogged'));

  if (!isLogged) {
    return <Navigate to={'/admin/auth/login'} replace={true} />;
  }
  return (
    <div>
      {' '}
      <PageTitle title='Back' />
      <AddOfficeTime />
    </div>
  );
};

export default OfficeTimePolicy;
