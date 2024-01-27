import React from 'react';
import { StContainer } from '../../styles/mypageStyle/Nothing';
import { useNavigate } from 'react-router';

interface NothingProps {
  type: string;
  content: string;
  icon: string;
  to: string;
  show: boolean;
}

const Nothing: React.FC<NothingProps> = ({ type, content, icon, to, show }) => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <img src="/assets/nothing.svg" alt="" />
      <p>{content}</p>
      {show ? (
        <button onClick={() => navigate(to)}>
          <img src={`${icon}`} alt="" />
          {`${type}`}
        </button>
      ) : (
        ''
      )}
    </StContainer>
  );
};

export default Nothing;
