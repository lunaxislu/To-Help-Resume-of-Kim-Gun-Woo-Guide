import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { AddressValue, Coord } from './MapTypes';
import {
  Buttons,
  StButtonBox,
  StInfoBox,
  StModalContainer,
  StOverayBox
} from './MapStyles';
import { copyAddress, readUserLocation } from './MapFn';

const Maps = ({ searchAddress, setShowMap }: AddressValue) => {
  const [coord, setCoord] = useState<Coord>({ lat: 0, lng: 0 });
  const geocoder = new kakao.maps.services.Geocoder();

  // 사용자의 주소 값을 받아 위도 경도를 coord에 set
  useEffect(() => {
    readUserLocation(geocoder, searchAddress, setCoord);
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
