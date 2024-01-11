import React, { useEffect, useState } from 'react'
import ProductsCard from './ProductsCard'
import { supabase } from '../../../utils/SupabaseClient';
import { useNavigate } from 'react-router';

type ProductsPost = {
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

const ProductList = () => {

  const [products, setProducts] = useState<ProductsPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
      if (error) throw error;
      if (data != null) {
        setProducts(data);
      }
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.')
    }
  }
console.log(products)

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '10px'}}>
        {products.map((product) => {
          return <ProductsCard product={product}/>
        })}
      </div>
      <button onClick={()=>{navigate('/productsposts')}}>글쓰기</button>
    </>
  )
}

export default ProductList