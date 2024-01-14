import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';

const StDetailContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
`;

const StDetailInfoSection = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1rem;
  align-items: start;
  border-bottom: 6px solid #eee;
  padding: 2rem 0 0 0;
`;

const StImageWrapper = styled.div`
  width: 65%;
  height: 550px;
  border-radius: 12px;
  overflow: hidden;
  background-color: aliceblue;
`;

const StCarouselBox = styled.div`
  width: 300vw;
  height: 100%;
  overflow: hidden;
`;
const StImageList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 1.2s ease;
  transform: translateX(0vw);

  div {
    width: 100%;
    height: 100%;
    background-color: blue;
  }
`;

const StProductInfo = styled.div`
  width: 100%;
  padding: 0 1rem 0 1rem;
`;

const StProductInfoHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StUserTitlebox = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const StUserImage = styled.div`
  width: fit-content;
`;
const StProfileImages = styled.div`
  width: 50px;
  height: 50px;
  background-color: #eee;
  border-radius: 50%;
`;
const StUserNickname = styled.h4`
  width: 100%;
`;
const StAlertButton = styled.button`
  width: fit-content;
`;

const StHeaderTitle = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 1.6rem;
  margin-block: 2rem;
`;
const StHeaderPriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-block: 2rem;
`;
const StPrice = styled.h3`
  font-weight: 600;
  font-size: 1.4rem;
`;
const StTimeLeft = styled.div`
  max-width: 20%;
`;

const StProductInfoBody = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #eeeeee70;
  border-radius: 9px;
`;

const StProductRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const StRowLabel = styled.div`
  width: 150px;
  font-weight: 600;
  color: #878787;
`;
const StRowValue = styled.div`
  width: 100%;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  margin-block: 2rem;
`;
type ButtonProps = {
  $role: string;
};
const Button = styled.div<ButtonProps>`
  width: ${(props) => (props.$role === 'like' ? '40%' : '60%')};
  padding: 1.5rem;
  font-size: 2rem;
  font-weight: 400;
  border-radius: 12px;
  background-color: #eee;
  cursor: pointer;

  &:hover {
    background-color: #2f9eff;
    color: white;
  }
`;

// 상품 설명 섹션
const StProductIntroSection = styled.section`
  width: 100%;
`;
const StProductIntroTitle = styled.h4`
  width: 100%;
  font-weight: 600;
  font-size: 1.4rem;
  margin-block: 2rem;
`;
const StProductContent = styled.div`
  width: 100%;
  margin-block: 2rem;
  white-space: break-spaces;
  line-height: 1.2;
`;
const StProductCategory = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const StCategoryTag = styled.li`
  width: fit-content;
  padding: 0.3rem;
  font-weight: 600;
  color: #4f4f4f;
  list-style: none;
  letter-spacing: -0.09rem;
  background-color: #eee;
  border-radius: 6px;
  cursor: pointer;
`;

interface Product {
  id: string;
  created_at: string;
  post_user: string;
  nickname: string;
  title: string;
  contents: string;
  price: number;
  tags: string[];
  location: string;
  dealType: string;
  like_user: { user_id: string; user_name: string }[];
  likes: number;
  quality: string;
  changable: boolean;
  shipping_cost: boolean;
  agreement: boolean;
  exchange_product: string;
  count: number;
  category: string[];
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product[] | null>(null);

  const getProduct = async (id: string) => {
    let { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id);
    if (error) {
      console.log(error);
    } else {
      setProduct(products);
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, []);

  if (product === null) return <div>로딩 중</div>;

  const labels = ['수량', '상태', '거래 방식', '직거래 장소', '교환', '배송비'];

  const data = product[0];
  const productInfo = [
    data.count,
    data.quality,
    data.dealType,
    data.location,
    data.exchange_product,
    data.shipping_cost
  ];

  return (
    <StDetailContainer>
      <StDetailInfoSection>
        <StImageWrapper>
          <StCarouselBox>
            <StImageList>
              <div>a</div>
              <div style={{ backgroundColor: 'gray' }}>a</div>
              <div style={{ backgroundColor: 'black' }}>a</div>
            </StImageList>
          </StCarouselBox>
        </StImageWrapper>
        <StProductInfo>
          <StProductInfoHeader>
            <StUserTitlebox>
              <StUserImage>
                <StProfileImages></StProfileImages>
              </StUserImage>
              <StUserNickname>{data.nickname}</StUserNickname>
            </StUserTitlebox>
            <StAlertButton>신고하기</StAlertButton>
          </StProductInfoHeader>
          <StHeaderTitle>{data.title}</StHeaderTitle>
          <StHeaderPriceWrapper>
            <StPrice>{data.price.toLocaleString('kr-KO')}원</StPrice>
            <StTimeLeft>{data.created_at.slice(0, 10)}</StTimeLeft>
          </StHeaderPriceWrapper>
          <StProductInfoBody>
            {labels.map((label: string, i: number) => {
              return (
                <StProductRow key={i}>
                  <StRowLabel>* {label}</StRowLabel>
                  <StRowValue>{productInfo[i]}</StRowValue>
                </StProductRow>
              );
            })}
          </StProductInfoBody>
          <ButtonWrapper>
            <Button $role="like">찜하기</Button>
            {/* 작성자 ID 가져오기 */}
            <Button $role="chat">채팅하기</Button>
          </ButtonWrapper>
        </StProductInfo>
      </StDetailInfoSection>

      <StProductIntroSection>
        <StProductIntroTitle>상품 설명</StProductIntroTitle>
        <StProductContent>{data.contents}</StProductContent>
        <StProductCategory>
          {data.tags?.map((tag: string, i: number) => {
            return <StCategoryTag key={i}># {tag}</StCategoryTag>;
          })}
        </StProductCategory>
      </StProductIntroSection>
    </StDetailContainer>
  );
};

export default ProductDetail;
