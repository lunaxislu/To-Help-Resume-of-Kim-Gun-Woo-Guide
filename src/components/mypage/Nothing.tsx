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
  to: string;
}

const Nothing: React.FC<NothingProps> = ({ type, content, to }) => {
  const navigate = useNavigate();
  return (
    <StContainer>
      <NothingIcon>
        <ExclamationMark />
      </NothingIcon>
      <p>{content}</p>
      <button onClick={() => navigate(to)}>
        <span>{`${type}`}</span>
      </button>
    </StContainer>
  );
};

export default Nothing;
