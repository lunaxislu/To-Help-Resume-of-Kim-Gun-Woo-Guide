import { useEffect, useState } from 'react';
import { supabase } from '../../api/supabase/supabaseClient';
import ProductList from '../../components/prducts/ProductsList/ProductList';
import ProductsSearchBar from '../../components/prducts/ProductsList/ProductsSearchBar';
import ProductsSortBtn from '../../components/prducts/ProductsList/ProductsSortBtn';
import ProductsTags from '../../components/prducts/ProductsList/ProductsTags';
import * as St from '../../styles/products/ProductsList'
import { ProductsPostType } from '../../components/prducts/ProductsType';
import { useNavigate } from 'react-router';

const ProductsList = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductsPostType[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  // 나중에 필요한 것만 가져오기 ex. select('id, name')
  const getProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      //.eq('category', ['조소'])
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };
  // console.log(products)

  return (
    <St.EntireContainer>
      <St.ContentsContainer>
        <St.Title>
          {products.length}개의 물품이 거래되고 있어요
        </St.Title>
      <St.BarContainer>
        <St.TagsContainer>
          <ProductsTags />
          <St.WriteBtn onClick={() => navigate('/productsposts')}>
            <St.WriteIcon/> 글쓰기
          </St.WriteBtn>
        </St.TagsContainer>
        <St.SearchBarContainer>
          <ProductsSearchBar />
          {/* <ProductsSortBtn /> */}
        </St.SearchBarContainer>
      </St.BarContainer>
      <ProductList products={products} />
      </St.ContentsContainer>
    </St.EntireContainer>
  );
};

export default ProductsList;
