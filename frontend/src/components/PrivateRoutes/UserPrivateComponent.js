import React from 'react';
import getPermissions from '../../utils/getPermissions';

const UserPrivateComponent = ({ permission, children }) => {
  const permissions = getPermissions();
  console.log(
    '🚀 ~ file: UserPrivateComponent.js:6 ~ UserPrivateComponent ~ permissions:',
    permissions
  );

  // console.log(permission, "permissions", permissions.includes(permission));

  if (permissions.includes(permission)) {
    return <>{children}</>;
  } else {
    return '';
  }
};

export default UserPrivateComponent;
