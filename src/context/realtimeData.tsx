import React, { createContext, useContext, useEffect, useState } from 'react';

interface SupabaseRealtimeContextType {
  realtimeData: any[]; // 이 부분은 해당 데이터의 타입에 따라 수정하세요
  setRealtimeData: React.Dispatch<React.SetStateAction<any[]>>;
}

const SupabaseRealtimeContext = createContext<
  SupabaseRealtimeContextType | undefined
>(undefined);

type ProviderProps = {
  children: React.ReactNode;
};

export const SupabaseRealtimeProvider: React.FC<ProviderProps> = ({
  children
}) => {
  const [realtimeData, setRealtimeData] = useState<any[]>([]); // 이 부분은 해당 데이터의 타입에 따라 수정하세요

  const value: SupabaseRealtimeContextType = {
    realtimeData,
    setRealtimeData
  };

  return (
    <SupabaseRealtimeContext.Provider value={value}>
      {children}
    </SupabaseRealtimeContext.Provider>
  );
};

export const useSupabaseRealtimeContext = () => {
  const context = useContext(SupabaseRealtimeContext);
  if (!context) {
    throw new Error(
      'useSupabaseRealtimeContext must be used within a SupabaseRealtimeProvider'
    );
  }
  return context;
};
