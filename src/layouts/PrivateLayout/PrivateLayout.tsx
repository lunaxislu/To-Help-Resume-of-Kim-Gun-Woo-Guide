import { Navigate, Outlet } from 'react-router';

const PrivateLayout = () => {
  const isLogin = localStorage.getItem('userId');

  if (!isLogin) return <Navigate to={'/login'} replace />;

  return <Outlet />;
};

export default PrivateLayout;
