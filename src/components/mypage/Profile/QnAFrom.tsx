import React, { useEffect, useState } from 'react';
import {
  Close,
  StForm,
  StFormContainer,
  StFormWrapper,
  StInfoWrapper
} from '../../../styles/mypageStyle/QnAFormStyle';
import { useAppDispatch } from '../../../redux/reduxHooks/reduxBase';
import { setIsCloseForm } from '../../../redux/modules/openForm';

const QnAFrom = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const dispatch = useAppDispatch();

  const closeFormHandler = () => {
    dispatch(setIsCloseForm());
  };

  const getCurrentUrl = () => {
    setCurrentUrl(window.location.href);
  };

  useEffect(() => {
    getCurrentUrl();
  }, []);

  return (
    <StFormContainer>
      <Close onClick={closeFormHandler} />

      <StFormWrapper>
        <StInfoWrapper>
          <p>고객센터/문의사항</p>
          <p>궁금하신점이나 불편사항이 있으시면 문의해주세요.</p>
        </StInfoWrapper>

        <StForm
          action="https://formsubmit.co/jihyun9142@gmail.com"
          method="POST"
        >
          <input
            type="text"
            name="title"
            required
            placeholder="제목을 입력해주세요"
          />
          <select name="qna-category" id="qna-category">
            <option value="question">이용문의</option>
            <option value="bug">버그제보</option>
            <option value="report">신고하기</option>
            <option value="etc">기타</option>
          </select>
          <input
            type="email"
            name="email"
            required
            placeholder="이메일을 입력해주세요."
          />
          <textarea
            name="content"
            id="content"
            placeholder="내용을 입력해주세요."
          ></textarea>
          <button type="submit">제출</button>
          <input type="hidden" name="_captcha" value="false"></input>
          <input type="hidden" name="_next" value={`${currentUrl}`}></input>
        </StForm>
      </StFormWrapper>
    </StFormContainer>
  );
};

export default QnAFrom;
