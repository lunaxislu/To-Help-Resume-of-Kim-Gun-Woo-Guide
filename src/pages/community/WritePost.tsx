import { useState } from 'react';
import styled from 'styled-components';
const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('말머리 선택');
  return (
    <Container>
      <h1>커뮤니티 글 작성란데스</h1>
      <div>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option disabled hidden selected>
            말머리 선택
          </option>
          <option>꿀팁</option>
          <option>공구거래</option>
          <option>일상생활</option>
        </select>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      ></textarea>
      <button>등록하기</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & input {
    width: 600px;
    height: 40px;
  }
  & select {
    width: 100px;
    height: 40px;
  }
  & textarea {
    width: 700px;
    height: 500px;
    resize: none;
  }
  & button {
    width: 100px;
    height: 40px;
  }
  & h1 {
    font-size: 30px;
    margin-top: 50px;
  }
`;

export default WritePost;
