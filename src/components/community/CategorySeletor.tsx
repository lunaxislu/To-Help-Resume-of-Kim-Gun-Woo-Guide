import React from 'react';
import { CATEGORY_ARRAY } from '../../pages/community/WritePost';
import * as St from '../../styles/community/CommunityMainStyle';
interface CategorySelectorProps {
  selectCategory: string;
  setSelectCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectCategory,
  setSelectCategory
}) => {
  return (
    <St.Categorys>
      {CATEGORY_ARRAY.map((category) => (
        <St.CategoryBtn
          key={category}
          onClick={() => setSelectCategory(category)}
          $selectCategory={selectCategory}
        >
          {category}
        </St.CategoryBtn>
      ))}
    </St.Categorys>
  );
};

export default CategorySelector;
