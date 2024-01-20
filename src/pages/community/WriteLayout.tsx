import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import React, { useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { supabase } from '../../api/supabase/supabaseClient';
import { categoryArray } from './WritePost';
import {
  addPostMutation,
  fetchDetailPost,
  updatePostMutation
} from './commuQuery';
import { WriteLayoutProps } from './model';
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
const WriteLayout: React.FC<WriteLayoutProps> = ({
  profile,
  isEdit,
  paramId,
  setIsEditState
}) => {
  const {
    data: posts,
    isLoading,
    isError
  } = useQuery(['posts', paramId], () => fetchDetailPost(paramId));
  console.log('render');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    title: isEdit ? posts![0].title : '',
    category: isEdit ? posts![0].category : '',
    files: [],
    content: isEdit
      ? posts![0].content.replace(/<p>(.*?)<\/p>/g, ' <div>$1</div>')
      : '',
    uploadedFileUrl: isEdit ? posts![0].uploadedFileUrl : [],
    anon: isEdit ? posts![0].anon : false,
    mainImage: isEdit ? posts![0].mainImage : ''
  });

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
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
      setFormValues((prevValues: any) => ({
        ...prevValues,
        files: [...prevValues.files, file],
        uploadedFileUrl: [...prevValues.uploadedFileUrl, res.data.publicUrl]
      }));
      console.log(res.data.publicUrl);
    } catch (error) {
      console.error('Error handling file upload:', error);
    }
  };

  const addMutation = useMutation(addPostMutation, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries('posts');
      navigate('/community');
    }
  });

  const addPost = async () => {
    const insertData = {
      title: formValues.title,
      content: formValues.content,
      category: formValues.category,
      post_user: profile![0].id,
      nickname: profile![0].nickname
        ? profile![0].nickname
        : profile![0].username,
      files: formValues.files.map((file: File) => ({
        name: file.name,
        url: formValues.uploadedFileUrl
      })),
      main_image: formValues.mainImage,
      anon: formValues.anon
    };
    addMutation.mutate(insertData);
  };

  const updateMutation = useMutation(updatePostMutation, {
    onSuccess: () => {
      setIsEditState(false);
      queryClient.invalidateQueries(['posts', paramId]);
    }
  });

  const updatePost = () => {
    const fileArr = formValues.files.map((file: File) => ({
      name: file.name,
      url: formValues.uploadedFileUrl
    }));
    const postData = {
      updateData: {
        title: formValues.title,
        content: formValues.content,
        anon: formValues.anon,
        files: fileArr,
        main_image: formValues.mainImage,
        category: formValues.category
      },
      paramId
    };
    updateMutation.mutate(postData);
  };

  const quillRef = useRef<ReactQuill | null>(null);

  const imageHandler = () => {
    try {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.addEventListener('change', async () => {
        const file = input.files![0];
        const fileNewName = uuid();

        const { data, error } = await supabase.storage
          .from('images')
          .upload(`quill_imgs/${fileNewName}.png`, file);
        if (error) {
          console.error('이미지 업로드 중 오류 발생:', error);
        } else {
          console.log('이미지가 성공적으로 업로드되었습니다:', data);
        }

        const response = supabase.storage
          .from('images')
          .getPublicUrl(`quill_imgs/${fileNewName}.png`);
        console.log(response);
        if (response.data) {
          const postImageUrl = response.data.publicUrl;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection(true);
          editor?.insertEmbed(range?.index || 0, 'image', postImageUrl);
          setFormValues((prevValues) => ({
            ...prevValues,
            mainImage: '이미지있음'
          }));
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

  const modules = useMemo(
    () => ({
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['image', 'video'],
          [{ color: [] }, { background: [] }]
        ],
        handlers: {
          image: imageHandler
        },
        ImageResize: {
          modules: ['Resize']
        }
      }
    }),
    []
  );
  const formats = useMemo(
    () => [
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
    ],
    []
  );

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <Container>
      <ContentContainer>
        <TitleInput
          value={formValues.title}
          onChange={(e) => {
            setFormValues({ ...formValues, title: e.target.value });
          }}
          placeholder="제목을 입력해주세요"
        />
        <CategoryContainer>
          {categoryArray.map((item, index) => {
            return index !== 0 ? (
              <label key={item}>
                <CheckBoxs
                  type="checkbox"
                  name={formValues.category}
                  value={item}
                  onChange={(e) => {
                    setFormValues({ ...formValues, category: e.target.value });
                  }}
                  defaultChecked={isEdit ? posts![0].category === item : false}
                />
                {item}
              </label>
            ) : null;
          })}
        </CategoryContainer>
        {/* <CategoryContainer>
          {categoryArray.map((item, index) => {
            return index !== 0 ? (
              <label key={item} className="radio-label">
                <input
                  className="radio-input"
                  type="radio"
                  name="category"
                  value={item}
                  onChange={(event) =>
                    setFormValues({
                      ...formValues,
                      category: event.target.value
                    })
                  }
                  checked={formValues.category === item}
                />
                <span className="radio-checkmark" />
                <span className="radio-text">{item}</span>
              </label>
            ) : null;
          })}
        </CategoryContainer> */}
        <FileUploader>
          {formValues.files.length !== 0
            ? formValues.files.map((file: File) => file.name)
            : '파일을 업로드하려면 클릭하세요'}
          <input type="file" onChange={handleFiles} multiple />
        </FileUploader>
        <div>
          <QuillEditor
            ref={quillRef}
            value={formValues.content}
            onChange={(value) => {
              setFormValues({ ...formValues, content: value });
            }}
            modules={modules}
            formats={formats}
            theme="bubble"
            placeholder="내용을 입력해주세요"
          />
        </div>
        <Bottom>
          <label>
            <CheckBoxInput
              type="checkbox"
              checked={formValues.anon}
              onChange={() => {
                setFormValues({ ...formValues, anon: !formValues.anon });
              }}
            />{' '}
            익명으로 작성하기
          </label>
          {isEdit ? (
            <button onClick={updatePost}>수정완료</button>
          ) : (
            <button onClick={addPost}>등록하기</button>
          )}
        </Bottom>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

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
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

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
  background-color: #1f1f1f;
  border-radius: 5px;
  width: 100%;
  max-width: 1116px;

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
    color: white;
  }
  .ql-editor p {
    display: flex;
    line-height: 30px;
    font-size: 16px;
  }
`;
const CheckBoxs = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: #636363; /* 선택되지 않은 상태의 배경 색상 */
  border: none;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-right: 5px; /* 여백을 조절할 수 있습니다. */

  /* 체크 표시 스타일 */
  &:checked:before {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: #dbff00;
  }
`;
export default React.memo(WriteLayout);
