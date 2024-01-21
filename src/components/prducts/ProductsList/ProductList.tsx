import ProductsCard from './ProductsCard';
import { ProductsPostType } from '../ProductsType';
import * as St from '../../../styles/products/ProductsList'

interface Props {
  products: ProductsPostType[];
}

const ProductList = ({ products }: Props) => {
  return (
      <St.ProductsListContainer>
        {products.map((product) => {
          return <ProductsCard product={product} />;
        })}
      </St.ProductsListContainer>
  );
};

export default ProductList;
