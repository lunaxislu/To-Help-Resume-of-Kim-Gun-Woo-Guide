import { useDaumPostcodePopup } from 'react-daum-postcode';
import * as St from '../../../styles/products/ProductsPostsStyle'
import { ProductsInputType, AddressValueType } from '../ProductsType';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface Props {
  scriptUrl?: string,
  register?: UseFormRegister<ProductsInputType>,
  setValue?: UseFormSetValue<ProductsInputType>,
  addressValue: AddressValueType,
  setAddressValue: React.Dispatch<React.SetStateAction<AddressValueType>>
}

const AddressBtn = ({scriptUrl, register, setValue, addressValue, setAddressValue}: Props) => {

  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // 입력된 주소 값(fullAddress)을 상태 값의 address에 바꿔 넣기
    setAddressValue(prev => ({ ...prev, address: fullAddress }));
  };

  const handleOnClickAddressBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    open({ onComplete: handleComplete });
    e.preventDefault();
  };
  
  /* 최근검색 필요없이 전에 쓴 검색이 그대로 유지되는 방향은? */
  return (
    <div className="adress_find">
      <St.AddressBtn type='button' onClick={handleOnClickAddressBtn}>주소 검색</St.AddressBtn>
    </div>
  );
}

export default AddressBtn