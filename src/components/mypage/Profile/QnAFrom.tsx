import React from 'react';
import {
  Close,
  StForm,
  StFormContainer
} from '../../../styles/mypageStyle/QnAFormStyle';

const QnAFrom = () => {
  return (
    <StFormContainer>
      <Close />
      <p>고객센터/문의사항</p>
      <p>궁금하신점이나 불편사항이 있으시면 문의해주세요.</p>

      <StForm action="https://formsubmit.co/jihyun9142@gmail.com" method="POST">
        <input type="text" name="name" required />
        <input type="email" name="email" required />
        <button type="submit">Send</button>
      </StForm>
    </StFormContainer>
  );
};

export default QnAFrom;
