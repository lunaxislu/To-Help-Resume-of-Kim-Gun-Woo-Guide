import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import parse from 'html-react-parser';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { supabase } from '../../api/supabase/supabaseClient';
import { categoryArray } from './WritePost';
import { FilesObject, Post } from './model';
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const CommuDetail: React.FC = () => {
  const param = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editFiles, setEditFiles] = useState<File[]>([]);
  const [editContent, setEditContent] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [editAnon, setEditAnon] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [postId, setPostId] = useState('');
  const navigate = useNavigate();
  // const [comments, setComments] = useState();
  const getPost = async () => {
    try {
      let { data: community, error } = await supabase
        .from('community')
        .select('*')
        .eq('post_id', param.id);
      if (error) throw error;
      if (community != null) {
        setPosts(community);
        setEditTitle(community[0].title);
        setEditFiles(community[0].files);
        setEditContent(community[0].content);
        setEditCategory(community[0].category);
        setUploadedFileUrl(community[0].files);
        setEditAnon(community[0].anon);
        setPostId(community[0].post_id);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  console.log(editContent);
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      // 각 파일을 개별적으로 처리 (필요한 경우)
      filesArray.forEach((file) => {
        handleFilesUpload(file);
      });
    }
  };
  const handleFilesUpload = async (file: File) => {
    try {
      const newFileName = uuid();
      const { data, error } = await supabase.storage
        .from('files')
        .upload(`files/${newFileName}`, file);
      if (error) {
        console.log('파일 안올라감ㅋ', error);
        return;
      }
      const res = supabase.storage.from('files').getPublicUrl(data.path);
      setEditFiles((prevFiles) => [...prevFiles, file]);
      setUploadedFileUrl(res.data.publicUrl);
      // file 객체를 저장하도록 수정
      console.log(res.data.publicUrl);
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  const updatePost = async () => {
    const updateData = {
      title: editTitle,
      content: editContent,
      anon: editAnon,
      files: editFiles.map((file) => ({
        name: file.name,
        url: uploadedFileUrl
      })),
      main_image: mainImage,
      category: editCategory
    };
    try {
      const { data, error } = await supabase
        .from('community')
        .update(updateData)
        .eq('post_id', postId);

      if (error) throw error;
      setIsEdit(false);
      getPost();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const deletePost = async () => {
    if (window.confirm(`정말로"${editTitle}" 글을 삭제하시겠습니까?`)) {
      try {
        const { data, error } = await supabase
          .from('community')
          .delete()
          .eq('post_id', postId);

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
          // const editor = quillRef.current!.getEditor();
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection(true);

          //마우스 위치에 이미지를 넣고 다음 으로 커서 옮기기
          editor?.insertEmbed(range?.index || 0, 'image', postImageUrl);
          // if (mainImage === '') {
          //   setMainImage(postImageUrl);
          // }
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
  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      // 툴바 설정
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          ['bold', 'italic', 'underline', 'strike'], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          ['image', 'video'], // 링크, 이미지, 비디오 업로드 설정
          [{ color: [] }, { background: [] }] // 정렬, 글자 색, 글자 배경색 설정
          // ["clean"], // toolbar 설정 초기화 설정
        ],

        // 핸들러 설정
        handlers: {
          image: imageHandler // 이미지 tool 사용에 대한 핸들러 설정
        },
        ImageResize: {
          modules: ['Resize']
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
    'video',
    'image',
    'color',
    'background',
    'height',
    'width'
  ];

  return (
    <Container>
      {isEdit ? (
        <ContentContainer>
          <button onClick={updatePost}>수정완료</button>
          <TitleInput
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
            }}
            placeholder="제목을 입력해주세요"
          />
          <CategoryContainer>
            {categoryArray.map((item) => {
              return (
                <label key={item}>
                  <input
                    type="radio"
                    name={editCategory}
                    value={item}
                    onChange={(e) => {
                      setEditCategory(e.target.value);
                    }}
                  />
                  {item}
                </label>
              );
            })}
          </CategoryContainer>
          <FileUploader>
            {editFiles.length !== 0
              ? editFiles.map((file) => file.name)
              : '파일을 업로드하려면 클릭하세요'}

            <input type="file" onChange={handleFiles} multiple />
          </FileUploader>
          <div>
            <QuillEditor
              ref={quillRef}
              value={editContent}
              onChange={setEditContent}
              modules={modules}
              formats={formats}
              theme="snow"
              placeholder="내용을 입력해주세요"
            />
          </div>
          <label>
            <CheckBoxInput
              type="checkbox"
              checked={editAnon}
              onChange={() => setEditAnon(!editAnon)}
            />{' '}
            익명으로 작성하기
          </label>
        </ContentContainer>
      ) : (
        <ContentsContainer>
          <button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            수정
          </button>
          <button onClick={deletePost}>삭제</button>

          {posts.map((post) => {
            return (
              <div key={post.post_id}>
                <Topper>
                  <TopperLeft>
                    <h1>{post.title}</h1>
                    <p>{!!post.anon ? '익명의 작업자' : post.nickname}</p>
                  </TopperLeft>

                  <TopperRight>
                    <p>{post.created_at}</p>
                    <IconContainer>
                      <Icon src="/assets/comment.png" />
                      <p>0</p>
                      <Icon src="/assets/heart.png" />
                      <p>0</p>
                    </IconContainer>
                  </TopperRight>
                </Topper>{' '}
                <Category>{post.category}</Category>
                <Content>{parse(post.content)}</Content>
                {post.files && post.files.length > 0 && (
                  <div>
                    {post.files.map((file: FilesObject, index) => (
                      <a
                        key={index}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </ContentsContainer>
      )}

      <form>
        <input />
        <button>댓글 등록하기</button>
      </form>
    </Container>
  );
};
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  line-height: 30px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
  & p {
    display: flex;
  }
`;
const ContentsContainer = styled.div`
  width: 80%;
  max-width: 1116px;
  min-height: 600px;
`;

const Icon = styled.img`
  width: 20px;
`;
const Topper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1116px;
  margin-bottom: 10px;
`;
const TopperRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TopperLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & h1 {
    font-size: 20px;
    font-weight: bold;
  }
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const Category = styled.p`
  background-color: #636363;
  color: white;
  width: fit-content;
  padding: 12px;
  border-radius: 6px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 906px;
  width: 80%;
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
const CategoryContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const CheckBoxInput = styled.input`
  height: 20px;
  width: 20px;
`;
const TitleInput = styled.input`
  height: 54px;
  width: 100%;
  background-color: #f3f3f3;
  border: none;
  border-radius: 5px;
  padding-left: 16px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
  }
`;

const FileUploader = styled.label`
  background-color: #f3f3f3;
  border-radius: 5px;
  height: 54px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  & input {
    display: none;
  }
`;
const QuillEditor = styled(ReactQuill)`
  background-color: #f3f3f3;
  border-radius: 5px;

  .ql-container {
    min-height: 600px;
    border: none;
    display: flex;
  }
  .ql-toolbar {
    border: none;
  }
  .ql-editor strong {
    font-weight: bold;
  }
  .ql-editor em {
    font-style: italic;
  }
  .ql-editor ::placeholder {
    font-style: normal;
  }
  .ql-editor p {
    display: flex;
  }
`;
export default CommuDetail;
