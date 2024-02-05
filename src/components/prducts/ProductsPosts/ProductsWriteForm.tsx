import { useEffect, useState } from 'react';
import { supabase } from '../../../api/supabase/supabaseClient';
import AddressBtn from './AddressBtn';
import { ProductsInputType, ProductsInputFinalType } from '../ProductsType';
import ProductsImage from './ProductsImage';
import { useLocation, useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as St from '../../../styles/products/productsPosts/StProductsWriteForm'
import { MAJOR, SHIPPING_COST, DEAL_TYPE, CHANGABLE, QUALITY, CAVEAT } from '../ProductsSetData'

const InputDefaultValue = {
  title: '',
  category: [],
  shipping_cost: '',
  deal_type: '',
  address: '',
  detailAddress: '',
  quality: '',
  changable: '',
  exchange_product: '',
  contents: '',
  tags: '',
  image_url: ''
}

const initialState = {
  post_user_uid: "",
  post_user_name: "",
  nickname: "",
}

const ProductsWriteForm = ({productData}: any) => {
  const navigate = useNavigate();

  // image url
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string[]>([]);
  const location  = useLocation()
  
  // react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors, isSubmitting}} = useForm<ProductsInputType>({
      mode: 'onBlur',
    defaultValues: productData || InputDefaultValue
  });
  
  // 수정 시 필요한 데이터 변환 후 default 값 변경
  useEffect(() => {
    const tagsString = productData?.tags.join(',')
    if (location.pathname.includes('edit')) {
      setUploadedFileUrl(productData.image_url);
      setValue('tags', tagsString)
    }
  },[])

  // 유저 테이블에서 같은 id 값 찾아서 원하는 유저정보 가져오기
  const [userState, setUserState] = useState(initialState)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        setUserState(prevState => ({...prevState, post_user_uid: user!.id}));

        const { data: profiles, error } = await supabase
          .from('user')
          .select('*')
          .eq('id', user!.id);

        if (error) {
          console.log(error);
        }

        if (profiles != null && profiles.length > 0) {
          const userNickname = profiles[0].nickname;
          const userName = profiles[0].username;
          setUserState(prevState => ({...prevState, nickname: userNickname, post_user_name: userName}));
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  
  const addPosts = async (EntireData: ProductsInputFinalType) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([EntireData]);

      if (data) {
        console.log(data);
      }

      if (error) throw error;

      alert('중고거래 판매글이 등록되었습니다.');
      navigate('/products');

    } catch (error) {
      alert('게시물 등록에 실패하였습니다. 다시 시도하여 주십시오.');
    }
  };

  const upDatePosts = async (upDatePost: ProductsInputFinalType) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(upDatePost)
        .eq('id', productData.id)

      if (error) throw error;
      
      alert('게시물이 수정되었습니다.')
      navigate(`/products/detail/${productData.id}`)

    } catch (error) {
      console.error(error);
      alert('게시물 수정에 실패하였습니다. 다시 시도하여 주십시오.')
    }
  }

  const onSubmit: SubmitHandler<ProductsInputType> = (data) => {

    // 사진 파일 있는지 없는지 확인 후 없다면 스크롤 업
    if (!uploadedFileUrl || uploadedFileUrl.length === 0) {
      alert('사진은 필수로 올려야합니다. 사진을 선택해주세요.');
      window.scrollTo({top:0})
      return;
    }

    // DB에 맞는 형태로 변환
    const tagsArray = data.tags.split(',', 9).map((tag) => tag.trim());
    const imgUrl = {image_url: uploadedFileUrl}

    const EntireData = {
      ...data,
      tags: tagsArray,
      image_url: imgUrl.image_url,
      post_user_uid: userState.post_user_uid,
      post_user_name: userState.post_user_name,
      nickname: userState.nickname,
    };

    // 판매 글인지 수정 글인지에 따라 각기 다른 함수 실행
    !productData?.id && addPosts(EntireData);
    productData?.id && upDatePosts(EntireData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ProductsImage uploadedFileUrl={uploadedFileUrl} setUploadedFileUrl={setUploadedFileUrl} />
      <St.WrapperStyle>
        <St.SemiTitle>제목<St.Required>*</St.Required></St.SemiTitle>
          <St.InputWrapperStyle>
            <St.CountWrapper>
              <St.InputStyle type='text' maxLength={40} {...register("title", {
                required: "제목은 필수로 입력해야합니다.",
                maxLength: {
                  value: 40,
                  message: "최대 40자까지 입력할 수 있습니다."
                }
              })} placeholder='판매글의 제목을 입력해주세요' />
            </St.CountWrapper>
          </St.InputWrapperStyle>
      </St.WrapperStyle>
        <St.MobileTextValidationWrapper>
          <St.MobileTextValidation>
            <St.ErrorText>{errors.title?.message === undefined ? '' : '* '+ errors.title?.message}</St.ErrorText>
          </St.MobileTextValidation>
          <St.MobileTitleCount>{watch("title").length}/40</St.MobileTitleCount>
        </St.MobileTextValidationWrapper>

      <St.WrapperStyle>
        <St.SemiTitle>카테고리<St.Required>*</St.Required></St.SemiTitle>
        <St.InputWrapperStyle>
          <St.CategoryContainer>
            {MAJOR.map((major) => 
            <div key={major} style={{display: 'flex', flexDirection: 'row'}}>
              <St.InputCheckBoxLabel htmlFor={major}>
                <St.InputCheckBoxStyle type='checkbox' id={major} value={major} 
                {...register("category", {required: "카테고리를 선택해주세요."})} />{major}</St.InputCheckBoxLabel>
            </div>
            )}
          </St.CategoryContainer>
        </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.MobileWrapperStyle>
        <St.Validation>
          <St.ErrorText>{errors.category === undefined ? '' : '* '+ errors.category?.message}</St.ErrorText>
        </St.Validation>
      </St.MobileWrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>가격<St.Required>*</St.Required></St.SemiTitle>
        <St.InputWrapperStyle>
          <St.InputStyle type='number' min={0} {...register("price", {
            required: "가격을 입력해주세요.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "0 이하의 값은 입력할 수 없습니다."
            },
            max: 2147483648
          })} placeholder='가격을 입력해주세요'/>
          <St.ShippingCostSelectWrapper>
            {SHIPPING_COST.map((shipping_cost) => 
              <St.InputCheckBoxLabel key={shipping_cost} htmlFor={shipping_cost}>
                <St.InputCheckBoxStyle type='radio' id={shipping_cost} value={shipping_cost} 
                {...register("shipping_cost", {required: "배송비 포함 여부를 선택해주세요."})} />{shipping_cost}</St.InputCheckBoxLabel>
            )}
          </St.ShippingCostSelectWrapper>
        </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.WrapperStyle>
        <St.RowValidation>
            <St.ErrorText>{errors.price === undefined ? '' : '* '+ errors.price?.message}</St.ErrorText>
            <St.ErrorText>{errors.shipping_cost === undefined ? '' : '* '+ errors.shipping_cost?.message}</St.ErrorText>
        </St.RowValidation>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>수량<St.Required>*</St.Required></St.SemiTitle>
        <St.InputWrapperStyle>
        <St.InputStyle type='number' min={0} {...register("count", {
          required: "수량을 입력해주세요.",
          valueAsNumber: true,
          min: {
            value: 1,
            message: "0 이하의 값은 입력할 수 없습니다."
          },
          max: 2147483648
        })} placeholder='수량을 입력해주세요'/>
        </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.MobileWrapperStyle>
        <St.Validation>
          <St.ErrorText>{errors.count === undefined ? '' : '* '+ errors.count?.message}</St.ErrorText>
        </St.Validation>
      </St.MobileWrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>거래방식<St.Required>*</St.Required></St.SemiTitle>
        <St.InputWrapperStyle>
          <St.MobileDealTypeWrapper>
            {DEAL_TYPE.map((deal_type) => 
              <St.InputCheckBoxLabel key={deal_type} htmlFor={deal_type}>
                <St.InputCheckBoxStyle type='radio' id={deal_type} value={deal_type} 
                {...register("deal_type", {required: "거래방식을 선택해주세요."})} />{deal_type}</St.InputCheckBoxLabel>
                )}
          </St.MobileDealTypeWrapper>
        </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.MobileWrapperStyle>
        <St.Validation>
          <St.ErrorText>{errors.deal_type === undefined ? '' : '* '+ errors.deal_type?.message}</St.ErrorText>
        </St.Validation>
      </St.MobileWrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>직거래 지역</St.SemiTitle>
          <St.InputWrapperStyle>
          <AddressBtn watch={watch} setValue={setValue} />
            <St.GapStyle/>
            <St.InputStyle readOnly type='text' 
              {...register("address", {required: watch("deal_type") === '직거래' ? "주소를 입력해주세요." : false})} 
            placeholder={watch('deal_type') === "직거래" ? '주소검색을 이용해주세요.' : '-'} />
            <St.GapStyle/>
            <St.InputStyle type='text' 
                {...register("detailAddress")}
            placeholder={watch('deal_type') === "직거래" ? '상세주소를 기입해주세요.' : '-'} />
          </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.MobileWrapperStyle>
        <St.Validation>
          <St.ErrorText>{errors.address === undefined ? '' : '* '+ errors.address?.message}</St.ErrorText>
        </St.Validation>
      </St.MobileWrapperStyle>
      {/* <St.TagsExplanation>직거래 지역은 지역 필터를 위해 사용됩니다.</St.TagsExplanation> */}
      
      <St.WrapperStyle>
        <St.SemiTitle>물품상태<St.Required>*</St.Required></St.SemiTitle>
        <St.InputWrapperStyle>
          <St.QualityWrapper>
            {QUALITY.map((quality, idx) => 
            <div key={idx}>
              <St.InputCheckBoxLabel htmlFor={quality.condition}>
                <St.InputCheckBoxStyle type='radio' id={quality.condition} value={quality.condition} 
                {...register("quality", {required: "물품상태를 선택해주세요."})} />{quality.condition}</St.InputCheckBoxLabel>
                <St.QualityExplanation key={idx}>{quality.shape}</St.QualityExplanation>
            </div>
            )}
          </St.QualityWrapper>
        </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.MobileWrapperStyle>
        <St.Validation>
          <St.ErrorText>{errors.quality === undefined ? '' : '*' + errors.quality?.message}</St.ErrorText>
        </St.Validation>
      </St.MobileWrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>교환<St.Required>*</St.Required></St.SemiTitle>
          <St.InputWrapperStyle>
            <St.ChangableSelectWrapper>
              {CHANGABLE.map((changable, idx) => 
                <St.InputCheckBoxLabel key={idx} htmlFor={changable}>
                  <St.InputCheckBoxStyle type='radio' id={changable} value={changable} 
                  {...register("changable", {required: "교환 가능 여부를 선택해주세요."})} />{changable}</St.InputCheckBoxLabel>
              )}
            </St.ChangableSelectWrapper>
            <St.InputStyle type='text' 
              disabled={watch("changable") === "불가능" ? true : false} 
              {...register("exchange_product", {
                required: watch("changable") === "가능" ? "교환을 원하는 물품을 입력해주세요." : false})} 
                placeholder={watch("changable") === "가능" ? '교환을 원하는 물품을 입력해주세요.' : '-'} />
          </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.WrapperStyle>
          <St.RowValidation>
            <St.ErrorText>{errors.changable === undefined ? '' : '* '+ errors.changable?.message}</St.ErrorText>
            <St.ErrorText>{errors.exchange_product === undefined ? '' : '* '+ errors.exchange_product?.message}</St.ErrorText>
          </St.RowValidation>
      </St.WrapperStyle>

      <St.WrapperStyle>
        <St.SemiTitle>설명<St.Required>*</St.Required></St.SemiTitle>
          <St.InputWrapperStyle>
            <St.CountWrapper>
              <St.TextAreaStyle maxLength={2000} {...register("contents", {
                required: "내용을 입력해주세요.",
                maxLength: {
                  value: 2000,
                  message: "최대 2000자까지 입력할 수 있습니다."
                }
              })} placeholder='물품에 대한 구체적인 설명을 입력해주세요&#13;&#10;tip)설명이 구체적일수록 거래될 확률이 높아져요!' />
            </St.CountWrapper>
          </St.InputWrapperStyle>
      </St.WrapperStyle>
      <St.MobileTextValidationWrapper>
          <St.MobileTextValidation>
            <St.ErrorText>{errors.contents?.message === undefined ? '' : '* '+ errors.contents?.message}</St.ErrorText>
          </St.MobileTextValidation>
          <St.MobileTitleCount>{watch("contents").length}/2000</St.MobileTitleCount>
        </St.MobileTextValidationWrapper>

      <St.WrapperStyle>
        <St.SemiTitle>태그</St.SemiTitle>
        <St.InputWrapperStyle>
          <St.InputStyle type='text' {...register("tags", {
            pattern: {
              value: /^[가-힣A-Za-z,]+$/i,
              message: "띄어쓰기와 숫자, 특수문자는 입력이 불가능합니다.",
            }
          })} placeholder='태그를 입력해주세요.' />
          <St.GapStyle/>
          <St.TagsExplanation>콤마(,)로 구분되며 최대 9개까지 입력할 수 있어요.</St.TagsExplanation>
          <St.TagsExplanation>사람들이 내 상품을 더 잘 찾을 수 있어요.</St.TagsExplanation>
          <St.TagsExplanation>상품과 관련 없는 태그를 입력할 경우, 판매에 제재를 받을 수 있어요.</St.TagsExplanation>
        </St.InputWrapperStyle>
      </St.WrapperStyle>
        <St.TagsValidation>
          <St.ErrorText>{errors.tags === undefined ? '' : '* '+errors.tags?.message}</St.ErrorText>
        </St.TagsValidation>

      <St.CaveatBox>
        <St.CaveatText>{CAVEAT}</St.CaveatText>
        <St.AgreementCheckBoxWrapper>
          <St.InputCheckBoxLabel htmlFor='agreement'>
            <St.AgreementCheckBoxStyle type='checkbox' id='agreement' {...register("agreement", {
            required: "주의사항에 동의하셔야 게시물 등록이 가능해요."
          })} />동의합니다.</St.InputCheckBoxLabel>
        </St.AgreementCheckBoxWrapper> 
      </St.CaveatBox>
      <St.GapStyle/>
      
      <St.BtnWrapper>
        <St.WrapperStyle>
          <St.ErrorText>{errors.agreement === undefined ? '' : '* '+errors.agreement?.message}</St.ErrorText>
        </St.WrapperStyle>
        <St.WriteBtn type='submit' disabled={isSubmitting}>{productData ? '수정하기' : '등록하기'}</St.WriteBtn>
      </St.BtnWrapper>
    </form>
  );
};

export default ProductsWriteForm;
