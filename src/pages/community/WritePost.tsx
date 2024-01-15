import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { supabase } from '../../api/supabase/supabaseClient';
const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('말머리 선택');
  const [file, setFile] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const navigate = useNavigate();
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      handleFilesUpload(file[0]);
    }
  };
  const handleFilesUpload = async (file: File) => {
    const newFileName = uuid();
    const { data, error } = await supabase.storage
      .from('files')
      .upload(`files/${newFileName}`, file);
    if (error) {
      console.log('파일 안올라감ㅋ');
      return;
    }
    const res = supabase.storage.from('files').getPublicUrl(data.path);
    setFile(res.data.publicUrl);
    console.log(res.data.publicUrl);
  };

  const addPost = async () => {
    if (file) {
      try {
        // FileList를 배열로 변환

        const { data, error } = await supabase.from('community').insert([
          {
            title,
            content,
            category,
            post_user: 'sweetPotato',
            nickname: 'goguma',
            files: file
          }
        ]);
        if (error) throw error;
        navigate('/community');
      } catch (error) {
        console.error('Error adding post:', error);
      }
    }
  };

  // 에디터 접근을 위한 ref return
  const quillRef = useRef<ReactQuill | null>(null);

  const imageHandler = () => {
    try {
      // 1. 이미지를 저장할 input type=file DOM을 만든다.
      const input = document.createElement('input');
      // 속성 써주기
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
      input.addEventListener('change', async () => {
        console.log('온체인지');
        const file = input.files![0];
        const fileNewName = uuid();
        console.log(file);
        // console.log(fileNewName);
        // file을 서버에 업로드
        const { data, error } = await supabase.storage
          .from('images')
          .upload(`quill_imgs/${fileNewName}.png`, file);
        if (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        } else {
          console.log('이미지가 성공적으로 업로드되었습니다:', data);
        }
        // 업로드된 이미지의 URL을 요청
        const response = supabase.storage
          .from('images')
          .getPublicUrl(`quill_imgs/${fileNewName}.png`);
        console.log(response);
        if (response.data) {
          const postImageUrl = response.data.publicUrl;
          console.log(response.data.publicUrl);
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection(true);
          console.log(editor);
          console.log(range);

          // 이미지를 붙이고 커서를 이동
          editor?.insertEmbed(range?.index || 0, 'image', postImageUrl);
          editor?.setSelection((range?.index || 0) + 1, 0);
          console.log('가져왔다');
        } else {
          console.error('No public URL found in response data.');
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  // 에디터 설정
  const modules = React.useMemo(
    () => ({
      // 툴바 설정
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          ['bold', 'italic', 'underline', 'strike', 'blockquote'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' }
          ], // 리스트, 인덴트 설정
          ['image', 'video'], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }] // 정렬, 글자 색, 글자 배경색 설정
          // ["clean"], // toolbar 설정 초기화 설정
        ],

        // 핸들러 설정
        handlers: {
          image: imageHandler // 이미지 tool 사용에 대한 핸들러 설정
        }
      }
    }),
    []
  );

  // 툴바에 사용되는 툴 포맷
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'video',
    'image',
    'align',
    'color',
    'background'
  ];

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
      <input type="file" onChange={handleFiles} />
      <div>
        <ReactQuill
          style={{ height: '600px' }}
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </div>

      <AddButton onClick={() => addPost()}>등록하기</AddButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 20px;
  & input {
    width: 600px;
    height: 40px;
  }
  & select {
    width: 100px;
    height: 40px;
  }
  & button {
    width: 100px;
    height: 40px;
  }
  & h1 {
    font-size: 30px;
    margin-top: 50px;
    text-align: center;
  }
`;
const AddButton = styled.button`
  margin-top: 100px;
`;

export default Write;
