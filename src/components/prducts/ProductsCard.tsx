import * as St from '../../styles/products/productsList/StProductsCard';
import { ProductsPostsType } from './ProductsType';
import { useNavigate } from 'react-router';
/**
 * @param posts: 게시물 데이터가 들어있는 배열
 * @return: 게시물 카드 리스트 반환
 */
const ProductsCard = ({ posts }: any) => {
  const navigate = useNavigate();
  return (
    <St.ProductsListContainer>
      {posts?.map((posts: ProductsPostsType) => (
        <St.ProductsCardContainer
          key={posts.id}
          onClick={() => navigate(`/products/detail/${posts.id}`)}
        >
          <St.CardImageWrapper>
            {posts.isSell === true ? (
              <St.IsSellProducts>
                <St.SoldOut>판매완료</St.SoldOut>
              </St.IsSellProducts>
            ) : (
              <div></div>
            )}
            {posts.image_url !== null && posts.image_url !== undefined ? (
              <St.CardImage src={posts.image_url[0]} alt="물품 이미지" />
            ) : (
              <div></div>
            )}
          </St.CardImageWrapper>
          {[posts.quality].map((condition) => (
            <St.CardQuality $quality={condition} key={condition}>
              {condition}
            </St.CardQuality>
          ))}
          <St.CardTitle>{posts.title}</St.CardTitle>
          <St.LikesWrapper>
            <St.CardPrice>{posts.price.toLocaleString('kr-KO')}원</St.CardPrice>
            <St.Likes>♥ {posts.likes}</St.Likes>
          </St.LikesWrapper>
        </St.ProductsCardContainer>
      ))}
    </St.ProductsListContainer>
  );
};

export default ProductsCard;
