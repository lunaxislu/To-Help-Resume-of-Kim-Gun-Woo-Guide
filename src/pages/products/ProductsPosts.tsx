import React from 'react'
import ProductsImage from '../../components/prducts/ProductsPosts/ProductsImage'
import ProductsExplanation from '../../components/prducts/ProductsPosts/ProductsExplanation'
import ProductsPostingButton from '../../components/prducts/ProductsPosts/ProductsPostingButton'

const ProductsPosts = () => {
  return (
    <div>
      <ProductsPostingButton />
      <div>
        <ProductsImage />
        <ProductsExplanation />
      </div>
    </div>
  )
}

export default ProductsPosts