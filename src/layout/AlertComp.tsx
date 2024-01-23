import React, { useEffect, useState } from 'react';
import useSupabaseRealtime from './alertQeury';

const AlertComp = () => {
  const [real, setReal] = useState<any>([]);
  const data = useSupabaseRealtime();

  useEffect(() => {
    setReal(data);
  }, []);

  return <div>알릴알림ㄴ이ㅏ럼ㄴ이라ㅓㅁㄴ이ㅏ러 {real}</div>;
};

export default AlertComp;
