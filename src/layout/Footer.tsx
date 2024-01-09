import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return <StFooterContainer>Footer</StFooterContainer>;
};

export default Footer;

const StFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 550px;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
  /* position: fixed; */
  bottom: 0;
`;
