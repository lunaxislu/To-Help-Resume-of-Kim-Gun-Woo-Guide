import React, { MouseEvent, useEffect, useState } from 'react'
import { supabase } from '../../../api/supabase/supabaseClient';
import { v4 as uuid } from 'uuid';
import * as St from '../../../styles/products/ProductsPostsStyle'

interface Props {
  uploadedFileUrl: string[];
  setUploadedFileUrl: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductsImage = ({ uploadedFileUrl, setUploadedFileUrl }: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  // 이미지 클릭 시 순서 맨 앞으로
  const handleImageOrder = (e: MouseEvent<HTMLElement>) => {
    const url = e.currentTarget.id;

    // 클릭된 아이템 인덱스 번호
    const clickedItem = uploadedFileUrl.indexOf(url);
    // 클릭 된 아이템을 제외한 배열
    const updatedArr = uploadedFileUrl.filter(item => item !== uploadedFileUrl[clickedItem])
    // 클릭 된 아이템을 맨 앞으로 해서 state를 변경하는 부분
    setUploadedFileUrl([uploadedFileUrl[clickedItem], ...updatedArr])
  }

  // 웹 페이지에서 파일 등록하기
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach((file) => {
        handleAddImages(file);
      });
    }
  };

  // 업로드된 파일이 12개가 초과되면 그 뒤에 들어오는 파일은 없앰
  if (uploadedFileUrl.length > 12 && files.length > 12)
    uploadedFileUrl.pop() && files.pop();

  const handleAddImages = async (file: File) => {
    try {
      const newFileName = uuid();
      const { data, error } = await supabase.storage
        .from('images')
        .upload(`products/${newFileName}`, file);

      if (error) {
        console.log('파일이 업로드 되지 않습니다.', error);
        return;
      }
      const res = supabase.storage.from('images').getPublicUrl(data.path);
      setFiles((prevFiles) => [file, ...prevFiles]);
      setUploadedFileUrl((prev: any) => [...prev, res.data.publicUrl]);
    } catch (error) {
      console.error(
        '알 수 없는 문제가 발생하였습니다. 다시 시도하여 주십시오.',
        error
      );
    }
  };

  // X 버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: any) => {
    setUploadedFileUrl(uploadedFileUrl.filter((_, index) => index !== id));
    setFiles(files.filter((_, index) => index !== id));
  };

  // useEffect(() => {
  //   console.log(files);
  // },[files])

  return (
    <St.UpLoadImageContainer>
      <St.SemiTitle>사진
        <St.Required>*</St.Required>
        <St.CountText>{files.length}/12</St.CountText>
      </St.SemiTitle>
      <St.ImageWrapper>
        {uploadedFileUrl.map((img:string, idx:number) => 
          <St.ImageCard onClick={handleImageOrder} id={img} key={idx}>
            <St.Image src={img} alt={`${img}-${idx}`} />
            {/* <St.ImageDeleteBtn type='button' onClick={() => handleDeleteImage(idx)}>X</St.ImageDeleteBtn> */}
          </St.ImageCard>
        )}
        {uploadedFileUrl.length >= 12 ? (
          <></>
          ) : (
          <St.UpLoadBox htmlFor="file">
            <input type="file" id="file" name="file" onChange={handleFiles} multiple hidden />
            +
          </St.UpLoadBox>
        )}
      </St.ImageWrapper>
    </St.UpLoadImageContainer>
  );
};

export default ProductsImage;
