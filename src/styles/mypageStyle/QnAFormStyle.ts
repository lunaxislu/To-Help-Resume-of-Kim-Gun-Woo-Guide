import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

export const StFormContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--drop);
  padding: 30rem;
  text-align: center;
`;

export const Close = styled(IoClose)``;

export const StForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
