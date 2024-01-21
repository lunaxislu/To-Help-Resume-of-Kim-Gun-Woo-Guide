import * as St from '../../../styles/products/ProductsList'

const ProductsTags = () => {
  
  const major = ['전체', '회화', '조소', '판화', '금속공예', '도예', '유리공예', '목공예', '섬유공예', '기타']

  return (
    <St.TagsWrapper>
      {major.map(major => 
        <St.Tags key={major}>{major}</St.Tags>
      )}
    </St.TagsWrapper>
  )
}

export default ProductsTags