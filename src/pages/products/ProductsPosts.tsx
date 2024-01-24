import ProductsWriteForm from '../../components/prducts/ProductsPosts/ProductsWriteForm'
import * as St from '../../styles/products/ProductsPostsStyle'

const ProductsPosts = () => {

  // 뒤로가기

  return (
    <St.EntireContainer>
      <St.ContentsContainer>
        <St.TitleContainer>
          <St.BackBtnBox>
            <St.BackIcon/>
          </St.BackBtnBox>
          <St.Title>판매하기</St.Title>
          <St.TetleRequired>*필수항목</St.TetleRequired>
        </St.TitleContainer>
        <St.Hr/>
          <ProductsWriteForm />
      </St.ContentsContainer>
    </St.EntireContainer>
  )
}

export default ProductsPosts