import React from 'react';
import { StContainer } from '../../styles/mypageStyle/Nothing';
import { useNavigate } from 'react-router';
import {
  ExclamationMark,
  NothingIcon
} from '../../styles/products/productsList/StProductsNothing';

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
      <NothingIcon>
        <ExclamationMark />
      </NothingIcon>
      <p>{content}</p>
      {show ? (
        <button onClick={() => navigate(to)}>
          <img src={`${icon}`} alt="" />
          <span>{`${type}`}</span>
        </button>
      ) : (
        ''
      )}
    </StContainer>
  );
};

export default Nothing;
