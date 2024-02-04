import * as St from '../../pages/productsDetail/style';
import { CustomUser, Product } from '../../pages/productsDetail/types';
import parseDate from '../../util/getDate';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { ProductsEditType } from '../prducts/ProductsType';

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

  const handleOnClickEditButton = () => {

    navigate(`/productsposts/edit/${product[0].id}`, {
      state: {productData: selectedProductData},
    });
  };


  return (
    <>
      <St.StProductInfoHeader>
        <St.StUserTitlebox>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
          </div>
        </St.StUserTitlebox>

        <St.StAlertButton>
          {product[0].post_user_uid === curUser?.uid && (
            <>
              <div
                onClick={() => {handleOnClickEditButton()}}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.36rem',
                  cursor: 'pointer'
                }}
              >
                <FaPencil style={{ color: 'var(--opc-100)' }} />
                수정하기
              </div>
              <div
                onClick={handleDeletePost}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.36rem',
                  cursor: 'pointer'
                }}
              >
                <FaTrash style={{ color: 'var(--opc-100)' }} />
                삭제하기
              </div>
            </>
          )}
          {product[0].post_user_uid !== curUser?.uid && (
            <>
              {isMobile && (
                <St.StTimeLeft>{parseDate(data.created_at)}</St.StTimeLeft>
              )}
              {!isMobile && <St.StAlertIcon />}
              <p
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  alert('개발 중인 기능입니다!');
                }}
              >
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
