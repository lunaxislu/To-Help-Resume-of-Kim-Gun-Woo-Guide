import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { supabase } from '../../../api/supabase/supabaseClient';

type TextValue = {
  title: string,
  contents: string,
  price: number,
  count: number, 
  exchange_product: string,
  tags: string[],
}
const producsPostsTextInit: TextValue = {
  title: "",
  contents: "",
  price: 0,
  count: 0, 
  exchange_product: "",
  tags: [],
}

type RadioValue = {
  shipping_cost: string,
  deal_type: string,
  quality: string,
  changable: string
}

const producsPostsRadioInit: RadioValue = {
  shipping_cost: "",
  deal_type: "",
  quality: "",
  changable: ""
}

type ProductsPost = {
  title: string,
  contents: string,
  price: number,
  count: number, 
  exchange_product: string,
  tags: string[],
  category: string[],
  shipping_cost: string,
  deal_type: string,
  quality: string,
  changable: string,
  agreement: boolean
};

const major = ['회화', '조소', '판화', '금속공예', '도예', '유리공예', '목공예', '섬유공예', '기타']
const shipping_cost = ['배송비 포함', '배송비 별도']
const deal_type = ['택배', '직거래', '협의 후 결정']
const changable = ['가능', '불가능']
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
    const { name, value, valueAsNumber } = e.target;
    if (name === 'tags') {
    setTextTypeValue({ ...textTypeValue, [name]: [...value.split(',')] }); 
    } else if (name === 'price' || name === 'count') {
      setTextTypeValue({ ...textTypeValue, [name]: valueAsNumber });
    }
    //==========================
      // radio input까지 합쳐보기
    //==========================  
    else {
    setTextTypeValue({ ...textTypeValue, [name]: value });
    }
  };

  // input radio value
  const [radioCheckedList, setRadioCheckedList] = useState(producsPostsRadioInit);

  const handleOnChangeRadioTypeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRadioCheckedList({ ...radioCheckedList, [name]: value });
  };
  
  // input checkbox value
  const [majorCheckedList, setMajorCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [agreementCheckedList, setAgreementCheckedList] = useState(false);

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

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    }

  const category = majorCheckedList
  const agreement = agreementCheckedList

  // input값이 모두 들어있는 새로운 객체 만들어서 state로 만들어서 업로드
   const entireProductsPosts = {...textTypeValue, category, ...radioCheckedList, agreement}
   // console.log(entireProductsPosts)

  const [productsPosts, setProductsPosts] = useState<ProductsPost>(entireProductsPosts);
  console.log(productsPosts)
  const addPosts = async () => {
    try {
      const {data, error} = await supabase
        .from('products')
        .insert([
          entireProductsPosts
        ])

      if (data) {
        console.log(data)
      }
      
      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.')
    }
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>제목*</h2>
        <input type='text' name='title' value={textTypeValue.title} onChange={handleOnChangeTextTypeValue} placeholder='상품명이 들어간 제목을 입력해주세요' />
        <p>0/40</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>카테고리*</h2>
        <div>
          {major.map((major, i) => 
            <label key={i} htmlFor={major}><input type='checkbox' id={major} checked={majorCheckedList.includes(major)} onChange={(e) => handleOnChangeCheckMajor(e, major)} />{major}</label>
          )}
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>가격*</h2>
        <input type='number' name='price' value={textTypeValue.price} onChange={handleOnChangeTextTypeValue} placeholder='가격을 입력해주세요'/>
        {shipping_cost.map((shipping_cost, i) => 
          <label key={i} htmlFor={shipping_cost}><input type='radio' id={shipping_cost} name='shipping_cost' value={shipping_cost} onChange={handleOnChangeRadioTypeValue} />{shipping_cost}</label>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>수량*</h2>
        <input type='number' name='count' value={textTypeValue.count} onChange={handleOnChangeTextTypeValue} placeholder='수량을 입력해주세요'/>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>거래방식*</h2>
        {deal_type.map((deal_type, i) => 
          <label key={i} htmlFor={deal_type}><input type='radio' id={deal_type} name='deal_type' value={deal_type} onChange={handleOnChangeRadioTypeValue} />{deal_type}</label>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>직거래 지역</h2>
        <button>최근 지역</button>
        <button>주소 검색</button>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>상품상태*</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '20px'}}>
          {quality.map((quality, i) => 
            <label key={i} htmlFor={quality.condition}><input type='radio' id={quality.condition} name='quality' value={quality.condition} onChange={handleOnChangeRadioTypeValue} />{quality.condition}</label>
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
          {changable.map((changable, i) => 
            <label key={i} htmlFor={changable}><input type='radio' id={changable} name='changable' value={changable} onChange={handleOnChangeRadioTypeValue} />{changable}</label>
          )}
        <input type='text' name='exchange_product' value={textTypeValue.exchange_product} onChange={handleOnChangeTextTypeValue} placeholder='교환을 원하는 상품을 입력해주세요.' />
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>설명*</h2>
        <textarea value={textTypeValue.contents} name='contents' onChange={(e: any) => handleOnChangeTextTypeValue(e)} style={{width: '75%', resize: 'none'}} placeholder='설명을 입력해 주세요' />
        <p>0/2000</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', width: '200px'}}>태그</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <input type='text' name='tags' value={textTypeValue.tags} onChange={handleOnChangeTextTypeValue} maxLength={9} placeholder='태그를 입력해주세요.' />
          <p style={{color: 'darkgray'}}>띄어쓰기로 구분되며 최대 9자까지 입력할 수 있어요.</p>
          <p style={{color: 'darkgray'}}>사람들이 내 상품을 더 잘 찾을 수 있어요.</p>
          <p style={{color: 'darkgray'}}>상품과 관련 없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요.</p>
        </div>
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
        <label htmlFor='agreement'><input type='checkbox' id='agreement' checked={agreementCheckedList} onChange={() => setAgreementCheckedList(!agreementCheckedList)} />동의합니다.</label>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', height: '50px', padding: '15px', gap: '10px'}}>
        <button onClick={() => addPosts()}>등록하기</button>
      </div>
    </form>
  )
}

export default ProductsExplanation