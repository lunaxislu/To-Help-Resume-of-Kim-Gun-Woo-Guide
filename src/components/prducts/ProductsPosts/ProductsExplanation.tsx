import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { supabase } from '../../../utils/SupabaseClient';

type TextValue = {
  title: string,
  contents: string,
  price: number,
  count: number, 
  exchange_product: string,
  major:any[]
}
const producsPostsTextInit: TextValue = {
  title: "",
  contents: "",
  price: 0,
  count: 0, 
  exchange_product: "",
  major: []
}

type ProductsPost = {
  title: string,
  contents: string,
  price: number,
  count: number, 
  tags: string, 
  location: string,
  dealType: string,
  quality: string,
  changable: boolean,
  shipping_cost: boolean,
  agreement: boolean,
};
const addProducsPosts: ProductsPost[] = [{
  title: "",
  contents: "",
  price: 0,
  count: 0, 
  tags: "", 
  location: "",
  dealType: "",
  quality: "",
  changable: false,
  shipping_cost: false,
  agreement: false,
}]

const major = ['회화', '조소', '판화', '금속공예', '도예', '유리공예', '목공예', '섬유공예', '기타']

const quality = [
  {
    condition: '새상품(미사용)',
    shape: '사용하지 않은 새 상품이에요'
  },
  {
    condition: '사용감 없음',
    shape: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없어요 / 아주 조금 사용했어요'
  },
  {
    condition: '사용감 적음',
    shape: '눈에 띄는 흔적이나 얼룩이 약간 있어요 / 절반정도 사용했어요'
  },
  {
    condition: '사용감 많음',
    shape: '눈에 띄는 흔적이나 얼룩이 많이 있어요 / 많이 사용했어요'
  },
  {
    condition: '고장/파손 상품',
    shape: '기능 이상이나 외관 손상 등으로 수리가 필요해요'
  },
]

const ProductsExplanation = () => {

  // input text value
  const [textTypeValue, setTextTypeValue] = useState(producsPostsTextInit)
  
  const handleOnChangeTextTypeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTextTypeValue({ ...textTypeValue, [name]: value });
  };
  
  // input checkbox value
  const [majorCheckedList, setMajorCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedMajor = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setMajorCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && majorCheckedList.includes(value)) {
      setMajorCheckedList(majorCheckedList.filter((item) => item !== value));
      return;
    }
    return;
  };

  const handleOnChangeCheckMajor = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    setIsChecked(!isChecked);
    handleCheckedMajor(value, e.target.checked);
  }

  const handleOnSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('textTypeValue', textTypeValue)
      console.log('majorCheckedList', majorCheckedList)
    },
    [textTypeValue, majorCheckedList]
  );

  // 객체에 major 키 만들어서 checkedList 합치고 state로 만들어서 업로드
  console.log(textTypeValue.major = majorCheckedList)
  

  const [productsPosts, setProductsPosts] = useState<ProductsPost[]>(addProducsPosts);

  const addPosts = async () => {
    try {
      const {data, error} = await supabase
        .from('products')
        .insert([
          {
            title: 'title',
            tegs: 'tegs',
            price: 'price',
            count: 'count',
            contents: 'contents',
            location: 'location',
            dealType: 'dealType',
            quality: 'quality',
            changeable: 'changeable',
            shipping_cost: 'shipping_cost',
            agreement: 'agreement',
          },
        ])
      
      if (error) throw error;
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.')
    }
  }


  // input radio


  return (
    <form onSubmit={handleOnSubmit}>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>상품명*</h2>
        <input type='text' name='title' value={textTypeValue.title} onChange={handleOnChangeTextTypeValue} placeholder='상품명을 입력해주세요' />
        <p>0/40</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>가격*</h2>
        <input type='number' name='price' value={textTypeValue.price} onChange={handleOnChangeTextTypeValue} placeholder='가격을 입력해주세요'/>
        <label><input type='checkbox' />배송비 포함</label>
        <label><input type='checkbox' />배송비 별도</label>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>수량*</h2>
        <input type='number' name='count' value={textTypeValue.count} onChange={handleOnChangeTextTypeValue} placeholder='수량을 입력해주세요'/>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>태그*</h2>
        <div>
          {major.map(major => 
            <label key={major} htmlFor='major'><input type='checkbox' id='major' checked={majorCheckedList.includes(major)} onChange={(e) => handleOnChangeCheckMajor(e, major)} />{major}</label>
          )}
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>거래방식*</h2>
        <label><input type='checkbox' />택배</label>
        <label><input type='checkbox' />직거래</label>
        <label><input type='checkbox' />협의 후 결정</label>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>직거래 지역</h2>
        <button>내 위치</button>
        <button>최근 지역</button>
        <button>주소 검색</button>
        <label><input type='checkbox' />협의 후 결정</label>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>상품상태*</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '20px'}}>
          {quality.map((quality) => 
              <label key={quality.condition}><input type='checkbox' />{quality.condition}</label>
          )}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {quality.map((quality) => 
                <p key={quality.shape}>{quality.shape}</p>
          )}
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>교환*</h2>
        <input type='checkbox' /><label>불가</label>
        <input type='checkbox' /><label>가능</label>
        <input type='text' name='exchange_product' value={textTypeValue.exchange_product} onChange={handleOnChangeTextTypeValue} placeholder='교환을 원하는 상품을 입력해주세요.' />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>설명*</h2>
        <textarea value={textTypeValue.contents} name='contents' onChange={(e: any) => handleOnChangeTextTypeValue(e)} style={{width: '75%', resize: 'none'}} placeholder='설명을 입력해 주세요' />
        <p>0/2000</p>
      </div>
      <div style={{backgroundColor: 'lightgrey', padding: '15px'}}>
        <p style={{marginBottom: '20px'}}>
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다.
           불순한 의도는 처벌을 피할 수 없습니다. </p>
        <label><input type='checkbox' />동의합니다.</label>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', position: 'fixed', bottom: 0, left: 0, right:0, backgroundColor: 'pink', height: '50px', padding: '15px', gap: '10px'}}>
        <button>임시저장</button>
        <button onClick={() => addPosts()}>등록하기</button>
      </div>
    </form>
  )
}

export default ProductsExplanation