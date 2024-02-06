import React, { useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router';
import { CATEGORY_ARRAY } from '../../pages/community/WritePost';
import { fetchDetailPost } from '../../pages/community/api/commuQuery';
import { handleFilesUpload } from '../../pages/community/api/fileUploader';
import { quillImageHandler } from '../../pages/community/api/imgaeUploader';
import { WriteLayoutProps } from '../../pages/community/api/model';
import {
  useAddPostMutation,
  useUpdatePostMutation
} from '../../pages/community/hook/useQuery';
import * as St from '../../styles/community/CommunityWriteStyle';
const COLORS = ['red', 'yellow', 'green', 'blue', 'purple'];
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
    files: isEdit ? posts![0].files : [],
    content: isEdit
      ? posts![0].content.replace(/<p>(.*?)<\/p>/g, ' <div>$1</div>')
      : '',
    uploadedFileUrl: isEdit
      ? posts![0].files.length > 0
        ? posts![0].files[0].url
        : []
      : [],
    anon: isEdit ? posts![0].anon : false,
    mainImage: isEdit ? posts![0].mainImage : '',
    post_color: isEdit ? posts![0].post_color : ''
  });
  const [errors, setErrors] = useState({
    title: '',
    category: '',
    content: '',
    post_color: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      category: '',
      content: '',
      post_color: ''
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
    if (!formValues.post_color) {
      newErrors.post_color = '포스트컬러는 필수입니다';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach((file) => {
        handleFilesUpload(file, setFormValues);
      });
    }
  };

  const addMutation = useAddPostMutation();

  const removeFile = (index: number) => {
    if (formValues.files && formValues.files.length > 0) {
      const newFiles = formValues.files.filter(
        (_: File, i: number) => i !== index
      );
      const newUploadedFileUrls = formValues.uploadedFileUrl.filter(
        (_: File, i: number) => i !== index
      );

      setFormValues((prevValues) => ({
        ...prevValues,
        files: newFiles,
        uploadedFileUrl: newUploadedFileUrls
      }));
    }
  };

  const fileArr = formValues.files.map((file: File, index: number) => ({
    name: file.name,
    url: formValues.uploadedFileUrl
  }));

  const addPostHandle = async () => {
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
      anon: formValues.anon,
      post_color: formValues.post_color
    };
    addMutation.mutate(insertData, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries('posts');
        navigate('/community');
      }
    });
  };

  const updateMutation = useUpdatePostMutation();

  const updatePostHandle = () => {
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
        category: formValues.category,
        post_color: formValues.post_color
      },
      paramId
    };
    updateMutation.mutate(postData, {
      onSuccess: () => {
        setIsEditState(false);
        queryClient.invalidateQueries('posts');
      }
    });
  };

  const quillRef = useRef<ReactQuill | null>(null);
  const imageHandler = () => quillImageHandler(quillRef, setFormValues);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
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
            {CATEGORY_ARRAY.map((item, index) => {
              return index !== 0 ? (
                <label key={item}>
                  <St.CheckBoxs
                    type="checkbox"
                    name="category"
                    value={item}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        category: e.target.checked ? item : ''
                      });
                    }}
                    checked={formValues.category === item}
                    defaultChecked={
                      isEdit ? posts![0].category === item : false
                    }
                  />
                  {item}
                </label>
              ) : null;
            })}
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
            파일을 업로드하려면 클릭하세요 (hwp, pdf, xlsx, xls)
            <input
              type="file"
              onChange={handleFiles}
              accept=".pdf, .xls, .xlsx, .hwp"
              multiple
            />
          </St.LayoutFileUploader>
        </St.LayoutFileArea>
        <St.LayoutFileListArea>
          <St.LayoutValueText></St.LayoutValueText>

          <St.FileList>
            {formValues.files.map((file: File, index: number) => (
              <div>
                <li key={index}>{file.name}</li>
                <button onClick={() => removeFile(index)}>X</button>
              </div>
            ))}
          </St.FileList>
        </St.LayoutFileListArea>
        <St.PickerColorArea>
          <St.LayoutValueText>
            포스트 색 정하기 <span>*</span>
          </St.LayoutValueText>
          <St.ColorPicker>
            {COLORS.map((color) => (
              <St.ColorButton
                key={color}
                $color={color}
                $isSelected={formValues.post_color === color}
                onClick={() => {
                  setFormValues({ ...formValues, post_color: color });
                }}
              />
            ))}
          </St.ColorPicker>
          {errors.post_color && <St.Validate>{errors.post_color}</St.Validate>}
        </St.PickerColorArea>
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
              <button onClick={updatePostHandle}>수정완료</button>
            ) : (
              <button onClick={addPostHandle}>등록하기</button>
            )}
          </St.LayoutBottom>
        </St.LayoutAnonArea>
      </St.LayoutContentContainer>
    </St.LayoutContainer>
  );
};

export default React.memo(WriteLayout);
