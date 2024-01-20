import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface CreatedTimeProps {
  createdAt: Date;
}

const CreatedTime: React.FC<CreatedTimeProps> = ({ createdAt }) => {
  const [timeDifference, setTimeDifference] = useState<string>('');

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = new Date();
      const createdDate = new Date(createdAt);
      const timeDiff = Math.abs(now.getTime() - createdDate.getTime());
      const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

      setTimeDifference(`${hoursDiff}시간 전`);
    };

    calculateTimeDifference();
  }, [createdAt]);

  return <TimeContainer>{timeDifference}</TimeContainer>;
};

const TimeContainer = styled.div`
  color: #999999;
  font-size: 14px;
`;

export default CreatedTime;
