import ProductsImage from '../../components/prducts/ProductsPosts/ProductsImage'
import ProductsExplanation from '../../components/prducts/ProductsPosts/ProductsExplanation'
import ProductsPostingButton from '../../components/prducts/ProductsPosts/ProductsPostingButton'

const ProductsPosts = () => {
  return (
    <div style={{padding: '20px'}}>
      <div style={{display: 'flex', flexDirection: 'row', lineHeight: '200%', marginBottom: '20px'}}>
        <h1 style={{fontSize: '30px', fontWeight: 'bold'}}>기본 정보</h1>
        <p style={{marginLeft: '10px'}}>*필수항목</p>
      </div>
      <div style={{marginBottom: '50px'}}>
        <ProductsImage />
        <ProductsExplanation />
      </div>
        <ProductsPostingButton />
    </div>
  )
}

export default ProductsPosts