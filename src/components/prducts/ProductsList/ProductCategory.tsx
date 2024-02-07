import { MouseEvent } from 'react';
import * as St from '../../../styles/products/productsList/StProductsCategory';

const major = [
  '전체',
  '회화',
  '조소',
  '공예',
  '기타'
];

interface Props {
  selectCategory: string[];
  setSelectCategory: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProductCategory = ({selectCategory, setSelectCategory}: Props) => {
  
  const handleOnClickCategory = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    setSelectCategory([target.innerText || '']);
  };
  
  return (
    <St.CategoryContainer>
      <St.CategoryWrapper>
        {major.map((major) => (
          <li key={major}>
            <St.Category
              onClick={handleOnClickCategory}
              $selectCategory={selectCategory}
            >
              {major}
            </St.Category>
          </li>
        ))}
      </St.CategoryWrapper>
    </St.CategoryContainer>
  )
}

export default ProductCategory