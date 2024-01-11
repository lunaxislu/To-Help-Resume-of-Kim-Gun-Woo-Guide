import React from 'react'
import ProductsTags from '../../components/prducts/ProductsList/ProductsTags'
import ProductList from '../../components/prducts/ProductsList/ProductList'

const Products = () => {
  return (
    <div style={{padding: '20px'}}>
      <h2 style={{marginBottom: '20px', fontSize: '30px', fontWeight: 'bold'}}>122,234개의 상품이 거래되고 있어요</h2>
      <ProductsTags />
      <ProductList />
    </div>
  )
}

export default Products