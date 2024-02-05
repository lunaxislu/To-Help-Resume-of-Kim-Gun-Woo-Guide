import { useNavigate } from 'react-router';
import ProductsWriteForm from '../../components/prducts/ProductsPosts/ProductsWriteForm';
import * as St from '../../styles/products/productsPosts/StProductsPosts';

const ProductsPosts = () => {
  const navigate = useNavigate();
  // 뒤로가기
  const handleOnClickBack = () => {
    const confirm = window.confirm(
      '작성하신 글이 모두 지워집니다. 그래도 페이지를 떠나시겠습니까?'
    );
    if (confirm) {
      navigate(-1);
    }
  };

  return (
    <St.EntireContainer>
      <St.ContentsContainer>
        <St.TitleContainer>
          <St.BackBtnBox onClick={handleOnClickBack}>
            <St.BackIcon />
          </St.BackBtnBox>
          <St.Title>판매글 작성</St.Title>
          <St.TetleRequired>*필수항목</St.TetleRequired>
        </St.TitleContainer>
        <St.Hr />
        <ProductsWriteForm />
      </St.ContentsContainer>
    </St.EntireContainer>
  );
};

export default ProductsPosts;
