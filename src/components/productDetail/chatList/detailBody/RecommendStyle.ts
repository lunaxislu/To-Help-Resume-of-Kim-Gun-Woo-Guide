import styled from 'styled-components';

const StSimilarProductTitleWrapper = styled.h2`
  width: 100%;
  font-size: 2rem;
  margin-block: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StOtherPostsTitleWrapper = styled.h2`
  width: 100%;
  font-size: 2rem;
  margin-block: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StToSectionButton = styled.button`
  background: var(--opc-100);
  color: white;
  border-radius: 50px;
  padding: 0.8rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #414141;
    color: var(--opc-100);
  }
`;

export {
  StSimilarProductTitleWrapper,
  StOtherPostsTitleWrapper,
  StToSectionButton
};
