import React, { MouseEvent, useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { AddressValue, CoderResult, Coord } from './MapTypes';
import {
  Buttons,
  StButtonBox,
  StInfoBox,
  StModalContainer,
  StOverayBox
} from './MapStyles';

const Maps = ({ searchAddress, setShowMap }: AddressValue) => {
  const [coord, setCoord] = useState<Coord>({ lat: 0, lng: 0 });
  const geocoder = new kakao.maps.services.Geocoder();

  // 사용자의 주소를 기반으로 위도, 경도 출력
  const readUserLocation = () => {
    geocoder.addressSearch(
      searchAddress,
      (result: CoderResult[], status: kakao.maps.services.Status) => {
        if (result.length > 0 && status === 'OK') {
          const { x, y } = result[0];
          setCoord({
            lat: Number(y),
            lng: Number(x)
          });
        }
      }
    );
  };

  // 주소 복사하는 함수
  const copyAddress = async (e: MouseEvent<HTMLButtonElement>) => {
    const address = e.currentTarget.id;
    try {
      await window.navigator.clipboard.writeText(address);
      alert('주소 복사 완료!');
    } catch (error) {
      console.error('주소 복사 실패:', error);
    }
  };

  useEffect(() => {
    readUserLocation();
  }, []);

  return (
    <>
      <StModalContainer>
        <Map center={coord} style={{ width: '100%', height: '100%' }}>
          <StInfoBox position={coord}>
            <StOverayBox>{searchAddress}</StOverayBox>
          </StInfoBox>
        </Map>
        <StButtonBox>
          <a
            target="_blank"
            href={`https://map.kakao.com/link/to/희망 거래지역,${coord.lat},${coord.lng}`}
            rel="noreferrer"
          >
            <Buttons>길 찾기</Buttons>
          </a>

          <Buttons onClick={copyAddress} id={searchAddress}>
            주소 복사
          </Buttons>
          <Buttons onClick={() => setShowMap(false)}>닫기</Buttons>
        </StButtonBox>
      </StModalContainer>
    </>
  );
};

export default Maps;
