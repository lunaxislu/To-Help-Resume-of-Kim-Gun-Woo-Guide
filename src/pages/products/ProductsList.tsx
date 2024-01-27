import { useQuery } from 'react-query';
import { useState } from 'react';
import ProductList from '../../components/prducts/ProductsList/ProductsList';
import ProductsSearchBar from '../../components/prducts/ProductsList/ProductsSearchBar';
import ProductsSortBtn from '../../components/prducts/ProductsList/ProductsSortBtn';
import * as St from '../../styles/products/ProductsListStyle';
import { useNavigate } from 'react-router';
import { getProductsPosts } from '../../components/prducts/productsQuery';

const major = [
  '전체',
  '회화',
  '조소',
  '판화',
  '금속공예',
  '도예',
  '유리공예',
  '목공예',
  '섬유공예',
  '기타'
];

const ProductsList = () => {
  const navigate = useNavigate();
  const {
    data: productsPosts,
    isLoading,
    isError
  } = useQuery('productsPosts', getProductsPosts);
  const [selectCategory, setSelectCategory] = useState<string>('전체');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>정보를 가져올 수 없습니다. 다시 시도해주세요.</div>;
  }

  return (
    <St.EntireContainer>
      <St.ContentsContainer>
        <St.Title>
          {productsPosts
            ? `${productsPosts?.length}개의 물품이 거래되고 있어요`
            : `0개의 물품이 거래되고 있어요`}
        </St.Title>
        <St.BarContainer>
          <St.CategoryContainer>
            <St.CategoryWrapper>
              {major.map((major) => (
                <li>
                  <St.Category
                    key={major}
                    onClick={() => setSelectCategory(major)}
                    $selectCategory={selectCategory}
                  >
                    {major}
                  </St.Category>
                </li>
              ))}
            </St.CategoryWrapper>
            <St.PostsWriteBtn onClick={() => navigate('/productsposts')}>
              <St.SellWriteIcon /> 판매하기
            </St.PostsWriteBtn>
          </St.CategoryContainer>
          {/* <St.SearchBarContainer>
          <ProductsSearchBar />
          <ProductsSortBtn />
        </St.SearchBarContainer> */}
        </St.BarContainer>
        <ProductList selectCategory={selectCategory} />
      </St.ContentsContainer>
    </St.EntireContainer>
  );
};

export default ProductsList;
