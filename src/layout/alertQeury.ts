import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useSupabaseRealtimeContext } from '../context/realtimeData';
import { supabase } from '../api/supabase/supabaseClient';

const useSupabaseRealtime = () => {
  const queryClient = useQueryClient();
  const { realtimeData, setRealtimeData } = useSupabaseRealtimeContext();

  useEffect(() => {
    const subscription = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload) => {
          // 새로운 payload로 쿼리 데이터를 업데이트합니다.
          setRealtimeData((prev: any) => [...prev, payload.new]);
        }
      )
      .subscribe();
  }, [queryClient, setRealtimeData]);

  return realtimeData;
};

export default useSupabaseRealtime;
