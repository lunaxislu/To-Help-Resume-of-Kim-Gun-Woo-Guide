import { SetStateAction } from 'react';

export type CoderResult = {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string;
  y: string;
  address: kakao.maps.services.Address;
  road_address: kakao.maps.services.RoadAaddress;
};

export type Coord = {
  lat: number;
  lng: number;
};

export type AddressValue = {
  searchAddress: string;
  setShowMap: React.Dispatch<SetStateAction<boolean>>;
};
