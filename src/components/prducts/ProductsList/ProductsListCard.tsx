import PostsNothing from '../../../pages/products/PostsNothing';
import ProductsCard from '../ProductsCard';
import { ProductsPostsType } from '../ProductsType';

interface Props {
  posts: ProductsPostsType[]
  selectCategory: string[];
}

const ProductListCard = ({ posts, selectCategory }: Props) => {

  return (
    <div>
      {posts && posts.length > 0 ? (
        <>
          <ProductsCard posts={posts} />
        </>
      ) : (
        <PostsNothing selectCategory={selectCategory}/>
      )}
    </div>
  );
};

export default ProductListCard;
