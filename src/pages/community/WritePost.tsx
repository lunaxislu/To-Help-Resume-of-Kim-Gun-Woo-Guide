import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());
  const [category, setCategory] = useState('말머리 선택');
  const navigate = useNavigate();

  const addPost = async () => {
    try {
      const contentState = content.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const htmlContent = draftToHtml(rawContentState);

      const { data, error } = await supabase.from('community').insert([
        {
          title,
          content: htmlContent,
          category,
          post_user: 'sweetPotato',
          nickname: 'goguma'
        }
      ]);

      if (error) throw error;
      navigate('/community');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleEditorChange = (newState: EditorState) => {
    setContent(newState);
  };

  const toolbarOptions = {
    options: ['inline', 'list', 'link', 'emoji', 'image'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough']
    },

    list: {
      options: ['unordered', 'ordered']
    },

    link: {
      options: ['link']
    },
    emoji: {
      options: ['emoji']
    }
  };

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
          <option disabled hidden>
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

      <Editor
        editorState={content}
        onEditorStateChange={handleEditorChange}
        toolbar={toolbarOptions}
      />
      <button onClick={() => addPost()}>등록하기</button>
      {/* <button onClick={() => console.log(convertContentToHtml())}>
        Convert to HTML
      </button>
      <button onClick={() => convertHtmlToContent()}>
        Convert HTML to Content
      </button> */}
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
