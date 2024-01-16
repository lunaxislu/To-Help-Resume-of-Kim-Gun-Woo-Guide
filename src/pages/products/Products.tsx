import React from 'react'
import ProductsTags from '../../components/prducts/ProductsList/ProductsTags'
import ProductList from '../../components/prducts/ProductsList/ProductList'
import ProductsSearchBar from '../../components/prducts/ProductsList/ProductsSearchBar'
import ProductsSortBtn from '../../components/prducts/ProductsList/ProductsSortBtn'

const Products = () => {
  return (
    <div style={{padding: '20px'}}>
      <h2 style={{marginBottom: '20px', fontSize: '30px', fontWeight: 'bold'}}>122,234개의 상품이 거래되고 있어요</h2>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <ProductsTags />
        <ProductsSearchBar />
        <ProductsSortBtn />
      </div>
      <ProductList />
    </div>
  )
}

export default Products