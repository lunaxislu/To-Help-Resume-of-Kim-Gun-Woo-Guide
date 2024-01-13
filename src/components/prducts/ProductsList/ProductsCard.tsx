import React from 'react'

type Product = {
  id:string,
  post_user: string,
  nickname: string,    
  created_at: string,
  title: string,
  contents: string,
  price: number,
  count: number, 
  tags: string[], 
  location: string,
  dealType: string,
  like_user: {uid:string, }[],
  likes: number,
  quality: string,
  changable: boolean,
  exchange_product: string,
  shipping_cost: boolean,
  agreement: boolean,
};

const ProductsCard = ({product}: {product: Product}) => {
  const { title, price, tags } = product

  return (
    <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
      <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
        <image>
        </image>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
        {tags.map(major =>
          <li key={major} style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>{major}</li>
        )}
      </div>
      <h2 style={{marginBottom: '10px'}}>{title}</h2>
      <h3>{price}원</h3>
    </div>
  )
}

export default ProductsCard