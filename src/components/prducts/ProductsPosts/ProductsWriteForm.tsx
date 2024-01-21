import { ChangeEvent, useState } from 'react'
import { supabase } from '../../../api/supabase/supabaseClient';
import AddressBtn from './AddressBtn';
import { ProductsInputType, AddressValueType } from '../ProductsType';
import ProductsImage from './ProductsImage';
import { useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as St from '../../../styles/products/ProductsPosts'

const productsPostsTextInit: AddressValueType = {
  address: "",
  detailAddress: ""
}

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
const caveat = `
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
  불순한 의도는 처벌을 피할 수 없습니다.`

const ProductsWriteForm = () => {

  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: {errors, isSubmitting}} = useForm<ProductsInputType>({
      mode: 'onSubmit',
    defaultValues: {
      title: "",
      category: [],
      shipping_cost: "",
      deal_type: "",
      address: "",
      detailAddress: "",
      quality: "",
      changable: "",
      exchange_product: "",
      contents: "",
      tags: "", 
      image_url: "",
    }
  })

  const onSubmit: SubmitHandler<ProductsInputType> = async (data) => {
    await new Promise((r: any) => setTimeout(r, 1000));
    const tagsArray = data.tags.split(',', 9).map((tag) => tag.trim());
    const address = {address: addressValue.address}
    const detailAddress = {detailAddress: addressValue.detailAddress}
    const imgUrl = {image_url: uploadedFileUrl}

    const EntireData = {...data, tags:tagsArray, address: address.address, detailAddress: detailAddress.detailAddress, image_url: imgUrl.image_url}
    console.log(EntireData);
    
    const addPosts = async () => {
      try {
        const {data, error} = await supabase
        .from('products')
        .insert([
          EntireData,
        ])
        
        if (data) {
          console.log(data)
        }
        
        if (error) throw error;
        alert('중고거래 판매글이 등록되었습니다.')
        navigate('/products')
      } catch (error) {
        alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.')
      }
    }

    addPosts();
  };

  // image url
  const [uploadedFileUrl, setUploadedFileUrl]: any = useState([]);

  // address value
  const [addressValue, setAddressValue] = useState(productsPostsTextInit)
  
  const handleOnChangeAddressValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressValue({ ...addressValue, [name]: value });
  
    // 태그에 사용했던 state
    // setTextRadioValue({ ...textRadioValue, [name]: [...value.split(',', 9)] });

    // 디바운싱 적용시켜 input 값 입력마다 렌더링되지 않도록 리팩토링해보기
    // console.log(textRadioValue)
  };
    
  // 테이블 컬럼명과 일치하도록 바꾸기
  // const image_url = uploadedFileUrl

  // input값이 모두 들어있는 새로운 객체 만들어서 supabase insert
  // const entireProductsPosts = {...textRadioValue, category, agreement, image_url}
  // console.log(entireProductsPosts)

  // validate: {
  //   noSpace: (value) => !value.includes(" ") || "띄어쓰기는 사용할 수 없습니다.",
  //   noDot: (value) => !value.includes(".") || "마침표는 사용할 수 없습니다."
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProductsImage uploadedFileUrl={uploadedFileUrl} setUploadedFileUrl={setUploadedFileUrl} />
      <St.WrapperStyle>
        <St.SemiTitle>제목<St.Required>*</St.Required></St.SemiTitle>
        <St.InputStyle type='text' {...register("title", {
          required: "제목을 입력해주세요.",
          maxLength: {
            value: 40,
            message: "최대 40자까지 입력할 수 있습니다."
          }
        })} placeholder='상품명이 들어간 제목을 입력해주세요' />
        <St.CountText>{watch("title").length}/40</St.CountText>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("title")}</p>
          <p style={{color: 'red'}}>{errors.title?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>카테고리<St.Required>*</St.Required></St.SemiTitle>
        <div>
          {major.map((major, idx) => 
            <label key={idx} htmlFor={major}>
              <input type='checkbox' id={major} value={major} 
              {...register("category", {required: "카테고리를 선택해주세요."})} />{major}</label>
          )}
        </div>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("category")}</p>
          <p style={{color: 'red'}}>{errors.category?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>가격<St.Required>*</St.Required></St.SemiTitle>
        <St.InputWrapperStyle>
          <St.InputStyle type='number' {...register("price", {
            required: "가격을 입력해주세요.",
            valueAsNumber: true,
            min: 0
          })} placeholder='가격을 입력해주세요'/>
          <St.ShippingCostSelectWrapper>
            {shipping_cost.map((shipping_cost, idx) => 
              <label key={idx} htmlFor={shipping_cost}>
                <input type='radio' id={shipping_cost} value={shipping_cost} 
                {...register("shipping_cost", {required: "배송비 포함 여부를 선택해주세요."})} />{shipping_cost}</label>
            )}
          </St.ShippingCostSelectWrapper>
        </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("price")}</p>
          <p style={{color: 'red'}}>{errors.price?.message}</p>
          <p style={{color: 'blue'}}>{watch("shipping_cost")}</p>
          <p style={{color: 'red'}}>{errors.shipping_cost?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>수량<St.Required>*</St.Required></St.SemiTitle>
        <St.InputStyle type='number' {...register("count", {
          required: "수량을 입력해주세요.",
          valueAsNumber: true,
          min: 0
        })} placeholder='수량을 입력해주세요'/>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("count")}</p>
          <p style={{color: 'red'}}>{errors.count?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>거래방식<St.Required>*</St.Required></St.SemiTitle>
        {deal_type.map((deal_type, idx) => 
          <label key={idx} htmlFor={deal_type}>
            <input type='radio' id={deal_type} value={deal_type} 
            {...register("deal_type", {required: "거래방식을 입력해주세요."})} />{deal_type}</label>
        )}
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("deal_type")}</p>
          <p style={{color: 'red'}}>{errors.deal_type?.message}</p>
        </div>
      </St.WrapperStyle>

      <div style={{marginBottom: '23px', display: 'flex', flexDirection: 'row'}}>
        <St.SemiTitle>직거래 지역</St.SemiTitle>
          <St.InputWrapperStyle>
          {getValues("deal_type") === '직거래' ? 
          <AddressBtn register={register} setValue={setValue} getValues={getValues} addressValue={addressValue} setAddressValue={setAddressValue} /> : <></>}
            <St.AddressInputStyle readOnly type='text' name='address' 
            required={getValues("deal_type") === '직거래' ? true : false} 
            value={addressValue.address} 
            disabled={getValues("deal_type") === '택배' || getValues("deal_type") === '협의 후 결정'} 
            onChange={handleOnChangeAddressValue} 
            placeholder={getValues("deal_type") === '직거래' ? '주소검색을 이용해주세요.' : ""} />
            <St.AddressInputStyle type='text' name='detailAddress' value={addressValue.detailAddress} 
            disabled={getValues("deal_type") === '택배' || getValues("deal_type") === '협의 후 결정'} 
            onChange={handleOnChangeAddressValue} 
            placeholder={getValues("deal_type") === '직거래' ? '상세주소를 기입해주세요.' : ""} />
          </St.InputWrapperStyle>
      </div>
      
      <St.WrapperStyle>
        <St.SemiTitle>상품상태<St.Required>*</St.Required></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginRight: '20px'}}>
          {quality.map((quality, idx) => 
            <label key={idx} htmlFor={quality.condition}>
              <input type='radio' id={quality.condition} value={quality.condition} 
              {...register("quality", {required: "상품상태를 선택해주세요."})} />{quality.condition}</label>
          )}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          {quality.map((quality, idx) => <p key={idx}>{quality.shape}</p>)}
        </div>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("quality")}</p>
          <p style={{color: 'red'}}>{errors.quality?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>교환<St.Required>*</St.Required></St.SemiTitle>
          <St.InputWrapperStyle>
            <St.ChangableSelectWrapper>
              {changable.map((changable, idx) => 
                <label key={idx} htmlFor={changable}>
                  <input type='radio' id={changable} value={changable} 
                  {...register("changable", {required: "교환 가능 여부를 선택해주세요."})} />{changable}</label>
              )}
            </St.ChangableSelectWrapper>
            <St.InputStyle type='text' {...register("exchange_product", {
              required: getValues("changable") === "불가능" ? false : "교환을 원하는 상품을 입력해주세요."
            })} placeholder='교환을 원하는 상품을 입력해주세요.'
              disabled={getValues("changable") === "불가능" ? true : false} />
          </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("changable")}</p>
          <p style={{color: 'red'}}>{errors.changable?.message}</p>
          <p style={{color: 'blue'}}>{watch("exchange_product")}</p>
          <p style={{color: 'red'}}>{errors.exchange_product?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>설명<St.Required>*</St.Required></St.SemiTitle>
          <St.TextAreaStyle {...register("contents", {
            required: "내용을 입력해주세요."
          })} placeholder='물품에 대한 구체적인 설명을 입력해주세요&#13;&#10;tip)설명이 구체적일수록 거래될 확률이 높아져요!' />
          <St.CountText>{watch("contents").length}/2000</St.CountText>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("contents")}</p>
          <p style={{color: 'red'}}>{errors.contents?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>태그</St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <St.InputStyle type='text' {...register("tags", {
            pattern: {
              value: /^[가-힣A-Za-z,]+$/i,
              message: "한글과 영어만 입력 가능합니다.",
            }
          })} placeholder='태그를 입력해주세요.' />
          <St.TagsComment>콤마(,)로 구분되며 최대 9개까지 입력할 수 있어요.</St.TagsComment>
          <St.TagsComment>사람들이 내 상품을 더 잘 찾을 수 있어요.</St.TagsComment>
          <St.TagsComment>상품과 관련 없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요.</St.TagsComment>
        </div>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("tags")}</p>
          <p style={{color: 'red'}}>{errors.tags?.message}</p>
        </div>
      </St.WrapperStyle>

      <St.CaveatBox>
        <St.CaveatText>{caveat}</St.CaveatText>
        <label htmlFor='agreement'>
          <input type='checkbox' id='agreement' {...register("agreement", {
          required: "주의사항에 동의를 해주셔야 중고거래 게시물을 등록할 수 있습니다."
        })} />동의합니다.</label>
      </St.CaveatBox>
      <St.WrapperStyle>
        <St.SemiTitle></St.SemiTitle>
        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{color: 'blue'}}>{watch("agreement")}</p>
          <p style={{color: 'red'}}>{errors.agreement?.message}</p>
        </div>
      </St.WrapperStyle>

      <div style={{display: 'flex', justifyContent: 'flex-end', height: '50px', padding: '15px', gap: '10px'}}>
        <button type='submit' disabled={isSubmitting}>등록하기</button>
      </div>
    </form>
  )
}

export default ProductsWriteForm