import { useEffect, useState } from 'react'
import ProductsCard from './ProductsCard'
import { supabase } from '../../../api/supabase/supabaseClient';
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
  category: string[],
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
  
  // 나중에 필요한 것만 가져오기 ex. select('id, name')
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
      <div style={{display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '10px', flexWrap: 'wrap'}}>
        {products.map((product) => {
          return <ProductsCard product={product}/>
        })}
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
        <div style={{padding: '10px', width: '250px', listStyle: 'none', border: '2px solid magenta'}}>
          <div style={{marginBottom: '10px', width: '230px', height: '230px', backgroundColor: 'pink'}}>
            <image>
            </image>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', marginBottom: '10px'}}>
              <li style={{width: '90px', backgroundColor: 'lightblue', textAlign: 'center', border: '1px solid skyblue'}}>회화</li>
          </div>
          <h2 style={{marginBottom: '10px'}}>팔레트</h2>
          <h3>20000원</h3>
        </div>
      </div>
      <button onClick={()=>{navigate('/productsposts')}}>글쓰기</button>
    </>
  )
}

export default ProductList