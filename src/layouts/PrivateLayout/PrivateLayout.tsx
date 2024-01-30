import React from 'react';
import { useAppSelector } from '../../redux/reduxHooks/reduxBase';
import { Navigate, Outlet } from 'react-router';

const PrivateLayout = () => {
  const { isLogin } = useAppSelector((state) => state.auth);

  if (!isLogin) return <Navigate to={'/login'} replace />;

  return <Outlet />;
};

export default PrivateLayout;
