import { useNavigate } from 'react-router';
import { ProductsPostType } from '../ProductsType';
import * as St from '../../../styles/products/ProductsListStyle'

const ProductsCard = ({ product }: { product: ProductsPostType }) => {

  const navigate = useNavigate();

  const { title, price, quality, image_url, id } = product;
  
  return (
    <St.ProductsCardContainer onClick={() => navigate(`/products/detail/${id}`)}>
      <St.CardImageWrapper>
        {image_url !== null && image_url !== undefined ? (
          <St.CardImage src={image_url[0]} alt="상품 이미지" />
        ) : (
          <div></div>
        )}
      </St.CardImageWrapper>
        {[quality].map((condition) => (
          <St.CardQuality>
            {condition}
          </St.CardQuality>
        ))}
      <St.CardTitle>{title}</St.CardTitle>
      <St.CardPrice>{price}원</St.CardPrice>
    </St.ProductsCardContainer>
  );
};

export default ProductsCard;
