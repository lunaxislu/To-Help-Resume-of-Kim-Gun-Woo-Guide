import React from 'react';
import * as St from '../../../pages/productsDetail/style';
import { CustomUser, Product } from '../../../pages/productsDetail/types';
import parseDate from '../../../util/getDate';
import { useNavigate } from 'react-router';
import { ProductsEditType } from '../../prducts/ProductsType';
import {
  StDeleteBtnBox,
  StEditBtnBox,
  StPencilIcon,
  StTrashCanIcon,
  StUserInfoWrapper
} from './styles';
import { useAppDispatch } from '../../../redux/reduxHooks/reduxBase';
import { setIsOpenForm } from '../../../redux/modules/openForm';

type DetailHeaderProps = {
  product: Product[];
  curUser: CustomUser | null;
  target: CustomUser | null;
  handleDeletePost: any;
  isMobile: boolean;
  data: Product;
  selectedProductData: ProductsEditType;
};

const ProductDetailInfoHeader = ({
  product,
  curUser,
  target,
  handleDeletePost,
  isMobile,
  data,
  selectedProductData
}: DetailHeaderProps) => {
  // 수정하기(하빈 추가)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnClickEditButton = () => {
    navigate(`/productsposts/edit/${product[0].id}`, {
      state: { productData: selectedProductData }
    });
  };

  // 신고버튼 클릭 시 폼 오픈 (지현추가)
  const handleOpenForm = () => {
    dispatch(setIsOpenForm());
  };

  return (
    <>
      <St.StProductInfoHeader>
        <St.StUserTitlebox>
          <StUserInfoWrapper>
            <St.StUserImage>
              {product[0].post_user_uid === curUser?.id ? (
                <St.StProfileImages
                  $url={curUser?.avatar_url}
                ></St.StProfileImages>
              ) : (
                <St.StProfileImages
                  $url={target?.avatar_url}
                ></St.StProfileImages>
              )}
            </St.StUserImage>
            <St.StUserNickname>
              {product[0].post_user_uid === curUser?.id ? (
                <p>
                  {curUser.nickname !== null
                    ? curUser?.nickname
                    : curUser?.username}
                </p>
              ) : (
                <p>
                  {target?.nickname !== null
                    ? target?.nickname
                    : target?.username}
                </p>
              )}
            </St.StUserNickname>
          </StUserInfoWrapper>
        </St.StUserTitlebox>

        <St.StAlertButton>
          {product[0].post_user_uid === curUser?.uid && (
            <>
              <StEditBtnBox
                onClick={() => {
                  handleOnClickEditButton();
                }}
              >
                <StPencilIcon />
                수정하기
              </StEditBtnBox>
              <StDeleteBtnBox onClick={handleDeletePost}>
                <StTrashCanIcon />
                삭제하기
              </StDeleteBtnBox>
            </>
          )}
          {product[0].post_user_uid !== curUser?.uid && (
            <>
              {isMobile && (
                <St.StTimeLeft>{parseDate(data.created_at)}</St.StTimeLeft>
              )}
              {!isMobile && <St.StAlertIcon />}
              <p style={{ cursor: 'pointer' }} onClick={handleOpenForm}>
                신고하기
              </p>
            </>
          )}
        </St.StAlertButton>
      </St.StProductInfoHeader>
    </>
  );
};

export default ProductDetailInfoHeader;
