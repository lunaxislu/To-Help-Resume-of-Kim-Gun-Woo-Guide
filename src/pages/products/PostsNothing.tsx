import React from 'react'
import * as St from '../../styles/products/ProductsNothingStyle';

interface Props {
  selectCategory: string[];
}

const PostsNothing = ({ selectCategory }: Props) => {
  return (
    <St.NothingContainer>
      <St.NothingWrapper>
        <St.NothingIcon>
          <St.ExclamationMark/>
        </St.NothingIcon>
        <p><span>{selectCategory}</span>에 속한 물품이 아직 없어요</p>
        <p>'판매하기'를 눌러 가장 먼저 판매를 시작해보세요!</p>
      </St.NothingWrapper>
    </St.NothingContainer>
  )
}

export default PostsNothing