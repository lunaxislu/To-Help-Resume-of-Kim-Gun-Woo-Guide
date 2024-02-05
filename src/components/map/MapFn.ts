import { MouseEvent, SetStateAction } from 'react';
import { CoderResult, Coord } from './MapTypes';

// 사용자의 주소를 기반으로 위도, 경도 출력
export const readUserLocation = (
  geocoder: kakao.maps.services.Geocoder,
  searchAddress: string,
  setCoord: React.Dispatch<SetStateAction<Coord>>
) => {
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
export const copyAddress = async (e: MouseEvent<HTMLButtonElement>) => {
  const address = e.currentTarget.id;
  try {
    await window.navigator.clipboard.writeText(address);
    alert('주소 복사 완료!');
  } catch (error) {
    console.error('주소 복사 실패:', error);
  }
};
