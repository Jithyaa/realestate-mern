import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdPrivateRoute = () => {
 const { adminInfo } = useSelector((state) => state.admin);
  return adminInfo ? <Outlet /> : <Navigate to='/adminlogin' replace />;
};
export default AdPrivateRoute;