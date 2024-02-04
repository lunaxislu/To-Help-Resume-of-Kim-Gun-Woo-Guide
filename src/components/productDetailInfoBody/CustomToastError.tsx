import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastProps = {
  message: string;
  options?: any;
};

const CustomToastError = ({ message, options }: ToastProps) => {
  return toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    ...options // 추가 옵션을 전달할 수 있도록 확장
  });
};
export default CustomToastError;
