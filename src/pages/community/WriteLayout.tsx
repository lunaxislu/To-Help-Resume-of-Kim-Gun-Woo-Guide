import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import React, { useMemo, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';
import { supabase } from '../../api/supabase/supabaseClient';
import * as St from '../../styles/community/CommunityWriteStyle';
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
  } = useQuery(['posts', paramId], () => fetchDetailPost(paramId), {
    staleTime: 30000
  });

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
  const [errors, setErrors] = useState({
    title: '',
    category: '',
    content: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      category: '',
      content: ''
    };

    if (!formValues.title) {
      newErrors.title = '제목은 필수입니다';
      isValid = false;
    }
    if (!formValues.category) {
      newErrors.category = '분류는 필수입니다';
      isValid = false;
    }
    if (!formValues.content) {
      newErrors.content = '내용은 필수입니다';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    console.log(fileList);
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach((file) => {
        handleFilesUpload(file);
      });
    }
  };

  const handleFilesUpload = async (file: File) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      files: [],
      uploadedFileUrl: []
    }));
    try {
      const newFileName = uuid();
      const { data, error } = await supabase.storage
        .from('files')
        .upload(`files/${newFileName}`, file);
      if (error) {
        console.log('파일 업로드 중 오류가 발생했습니다', error);
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
      console.error('파일을 업로드하지 못했습니다:', error);
    }
  };

  const addMutation = useMutation(addPostMutation, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries('posts');
      navigate('/community');
    }
  });
  const fileArr = formValues.files.map((file: File) => ({
    name: file.name,
    url: formValues.uploadedFileUrl
  }));

  const addPost = async () => {
    if (!validateForm()) {
      return;
    }
    const insertData = {
      title: formValues.title,
      content: formValues.content,
      category: formValues.category,
      post_user: profile![0].id,
      nickname: profile![0].nickname
        ? profile![0].nickname
        : profile![0].username,
      files: fileArr,
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
    if (!validateForm()) {
      return;
    }
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
          const range = editor?.getSelection();
          editor?.insertEmbed(range?.index || 0, 'image', postImageUrl);
          setFormValues((prevValues) => ({
            ...prevValues,
            mainImage: postImageUrl
          }));
          // editor?.setSelection((range?.index || 0) + 1, 0);
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
      // imageActions: {},
      // imageFormats: {},
      toolbar: {
        container: [
          // [{ header: [1, 2, 3, 4, 5, 6, false] }],
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

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <St.LayoutContainer>
      <St.LayoutContentContainer>
        <St.LayoutCategoryContainer>
          <St.LayoutValueText>
            분류<span>*</span>
          </St.LayoutValueText>{' '}
          <St.CategoryGrid>
            {categoryArray.map((item, index) => {
              return index !== 0 ? (
                <label key={item}>
                  <St.CheckBoxs
                    type="checkbox"
                    name={formValues.category}
                    value={item}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        category: e.target.value
                      });
                    }}
                    defaultChecked={
                      isEdit ? posts![0].category === item : false
                    }
                  />
                  {item}
                </label>
              ) : null;
            })}{' '}
          </St.CategoryGrid>
        </St.LayoutCategoryContainer>
        {errors.category && <St.Validate>{errors.category}</St.Validate>}
        <St.LayoutTitleContainer>
          <St.LayoutValueText>
            제목<span>*</span>
          </St.LayoutValueText>
          <input
            value={formValues.title}
            maxLength={30}
            onChange={(e) => {
              setFormValues({ ...formValues, title: e.target.value });
            }}
            placeholder="제목을 입력해주세요(30자)"
          />
        </St.LayoutTitleContainer>
        {errors.title && <St.Validate>{errors.title}</St.Validate>}
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

        <St.LayoutContentArea>
          <St.LayoutValueText>
            내용<span>*</span>
          </St.LayoutValueText>
          <St.LayoutQuillEditor
            ref={quillRef}
            value={formValues.content}
            onChange={(value) => {
              setFormValues({ ...formValues, content: value });
            }}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="내용을 입력해주세요"
          />
        </St.LayoutContentArea>
        {errors.content && <St.Validate>{errors.content}</St.Validate>}
        <St.LayoutFileArea>
          <St.LayoutValueText>파일</St.LayoutValueText>
          <St.LayoutFileUploader>
            {formValues.files.length !== 0
              ? formValues.files.map((file: File) => file.name)
              : '파일을 업로드하려면 클릭하세요'}
            <input type="file" onChange={handleFiles} multiple />
          </St.LayoutFileUploader>
        </St.LayoutFileArea>
        <St.LayoutAnonArea>
          <St.LayoutValueText></St.LayoutValueText>
          <St.LayoutBottom>
            <label>
              <St.CheckBoxs
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
          </St.LayoutBottom>
        </St.LayoutAnonArea>
      </St.LayoutContentContainer>
    </St.LayoutContainer>
  );
};

export default React.memo(WriteLayout);
