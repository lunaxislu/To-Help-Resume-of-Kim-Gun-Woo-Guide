import * as St from '../../styles/products/productsList/StProductsSkeleton';
import { SkeletonTheme } from 'react-loading-skeleton';

interface ProductsSkeletonProps {
  count: number;
}

const ProductsSkeleton: React.FC<ProductsSkeletonProps> = ({count}) => {
  return (
    <St.ContainerSkeleton>
        {Array(count).fill(0).map((_, idx) => (
            <St.CardCotainerSkeleton key={idx}>
              <SkeletonTheme baseColor="#eaedee" highlightColor="#fafeff">
                <St.CardImageSkeleton>
                  <St.ImageSkeleton/>
                </St.CardImageSkeleton>
                <St.CardQualitySkeleton/>
                <St.CardTitleSkeleton/>
                <St.LikesWrapperSkeleton>
                  <St.CardPriceSkeleton/>
                  <St.LikesSkeleton/>
                </St.LikesWrapperSkeleton>
              </SkeletonTheme>
            </St.CardCotainerSkeleton>
          ))}
    </St.ContainerSkeleton>
  )
}

export default ProductsSkeleton;