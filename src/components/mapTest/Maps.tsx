import React, { MouseEvent, useEffect, useState } from 'react';
import { Map, MapInfoWindow, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

type CoderResult = {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string;
  y: string;
  address: kakao.maps.services.Address;
  road_address: kakao.maps.services.RoadAaddress;
};

type Coord = {
  lat: number;
  lng: number;
};

type AddressValue = {
  searchAddress: string;
};

const StModalContainer = styled.div`
  width: 60%;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StButtonBox = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const Buttons = styled.button`
  padding: 0.8rem 1.625rem;
  border-radius: 9px;
  outline: none;
  border: none;
  background-color: #ffe5d7;
  cursor: pointer;

  a {
    text-decoration: none;
    color: black;
  }

  &:hover {
    background-color: var(--primary-color);
    color: white;

    a {
      color: white;
    }
  }
`;

const StOverayBox = styled.div`
  width: 100%;
  height: fit-content;
  padding: 0.4rem;
`;

const StInfoBox = styled(MapMarker)`
  width: fit-content;
  padding: 1rem;
`;

const Maps = ({ searchAddress }: AddressValue) => {
  const [coord, setCoord] = useState<Coord>({ lat: 0, lng: 0 });
  const geocoder = new kakao.maps.services.Geocoder();

  const readUserLocation = () => {
    geocoder.addressSearch(
      searchAddress,
      (result: CoderResult[], status: kakao.maps.services.Status) => {
        console.log(status);
        console.log(result);
        if (result.length > 0 && status === 'OK') {
          const { x, y } = result[0];
          setCoord({
            lat: Number(y),
            lng: Number(x)
          });
          console.log(coord);
        }
      }
    );
  };

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
        <Map center={coord} style={{ width: '100%', height: '100%' }} draggable>
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
        </StButtonBox>
      </StModalContainer>
    </>
  );
};

export default Maps;
