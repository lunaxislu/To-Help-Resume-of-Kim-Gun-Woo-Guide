import React from 'react'

const ProductsTags = () => {
  
  const major = ['회화', '조소', '판화', '금속공예', '도예', '유리공예', '목공예', '섬유공예', '기타']

  return (
    <div style={{display: 'flex', flexDirection: 'row', listStyle: 'none', gap: '10px', marginBottom: '20px'}}>
      {major.map(major => 
        <li key={major} style={{width: '100px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>{major}</li>
      )}
    </div>
  )
}

export default ProductsTags