import { Navigate, Outlet } from "react-router-dom";
import getPermissions from "../../utils/getPermissions";

const UserPrivateRoute = ({ path, permission, ...props }) => {
	const permissions = getPermissions();

	if (permissions.includes(permission)) {
		return <Outlet />;
	} else {
		return <Navigate to='/404' />;
	}
};

export default UserPrivateRoute;
