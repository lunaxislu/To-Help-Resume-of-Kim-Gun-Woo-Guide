import * as St from '../../../styles/products/ProductsListStyle'
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getProductsPosts } from '../productsQuery';

interface Props {
  selectCategory: string;
}

const ProductList = ({selectCategory}: Props) => {

  const navigate = useNavigate();
  const {data: productsPosts, isLoading, isError} = useQuery('productsPosts', getProductsPosts);

  // if (!productsId) {
  //   return <div>해당 카테고리에 판매되는 물품이 없습니다.</div>
  // }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>정보를 가져올 수 없습니다. 다시 시도해주세요.</div>;
  }

  // 필터된 상품 ID 배열
  const filteredPostsId = selectCategory === '전체' ? 
    productsPosts?.map(product => product.id) || [] : 
    productsPosts?.filter(product => product.category.includes(selectCategory)).map(product => product.id) || [];

  return (
      <St.ProductsListContainer>
        {filteredPostsId?.map((productId) => {
          const product = productsPosts?.find(p => p.id === productId)
          if (product) {
            return (
              <St.ProductsCardContainer key={productId.id} onClick={() => navigate(`/products/detail/${productId}`)}>
                <St.CardImageWrapper>
                  {product.image_url !== null && product.image_url !== undefined ? (
                    <St.CardImage src={product.image_url[0]} alt="상품 이미지" />
                  ) : (
                    <div></div>
                  )}
                </St.CardImageWrapper>
                  {[product.quality].map((condition) => (
                    <St.CardQuality>
                      {condition}
                    </St.CardQuality>
                  ))}
                <St.CardTitle>{product.title}</St.CardTitle>
                <St.CardPrice>{product.price}원</St.CardPrice>
              </St.ProductsCardContainer>
            )
          }
        })}
      </St.ProductsListContainer>
  );
};

export default ProductList;
