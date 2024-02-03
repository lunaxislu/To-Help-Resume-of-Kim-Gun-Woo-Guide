import { useLocation, useNavigate } from 'react-router';
import ProductsWriteForm from '../../components/prducts/ProductsPosts/ProductsWriteForm';
import * as St from '../../styles/products/ProductsPostsStyle';

const ProductsPostsEdit = () => {
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
  const location = useLocation();
  const { productData } = location.state || {};

  return (
    <St.EntireContainer>
      <St.ContentsContainer>
        <St.TitleContainer>
          <St.BackBtnBox onClick={handleOnClickBack}>
            <St.BackIcon />
          </St.BackBtnBox>
          <St.Title>게시글 수정</St.Title>
          <St.TetleRequired>*필수항목</St.TetleRequired>
        </St.TitleContainer>
        <St.Hr />
        <ProductsWriteForm productData={productData} />
      </St.ContentsContainer>
    </St.EntireContainer>
  );
};

export default ProductsPostsEdit;
