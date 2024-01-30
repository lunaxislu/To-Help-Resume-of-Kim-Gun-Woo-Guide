import React from 'react';
import { useAppSelector } from '../../redux/reduxHooks/reduxBase';
import { Navigate, Outlet } from 'react-router';

const PublicLayout = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
  if (isLogin) return <Navigate to={'/'} replace />;

  return <Outlet />;
};

export default PublicLayout;
