import { SupabaseClient, User } from '@supabase/supabase-js';
import { supabase } from './../../../api/supabase/supabaseClient';
import { SetStateAction } from 'react';
import { MessageType, RoomType } from '../../../components/chat/types';
import { UtilForChat } from '../chat_utils/functions';
import { useNavigate } from 'react-router';

export class SupabaseAPI {
  // constructor type 정의
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = supabase;
  }

  /** 
  @param clicked: 클릭 된 채팅방 ID
  @param setMessages: 클릭 된 채팅방에 연결 된 메세지를 state에 set
  @param curUser: Supabase.auth.getUser() 로그인 유저 정보
  @param targetUser: 채팅 상대방 유저
  @param setRooms: 사용자가 속한 채팅방을 state에 set
  @param setClicked: 클릭 된 채팅방의 id를 state에 set
   * **/

  handleOutChatRoom = async (
    clicked: string | undefined,
    curUser: User | null | undefined,
    targetUser: any[] | undefined,
    setRooms: React.Dispatch<SetStateAction<RoomType[] | null | undefined>>,
    setMessages: React.Dispatch<SetStateAction<MessageType[]>>,
    setClicked: React.Dispatch<SetStateAction<string | undefined>>,
    handleHideBoardPosition: any
  ) => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      const utils = new UtilForChat();

      handleHideBoardPosition();

      const { error: messageDelete } = await supabase
        .from('chat_messages')
        .delete()
        .eq('chat_room_id', clicked);

      const { error: roomDelete } = await supabase
        .from('chat_room')
        .delete()
        .eq('id', clicked);

      if (messageDelete || roomDelete) {
        alert('삭제 실패 다시 시도해주세요');
      }

      const { data: chatRoomList, error: roomLoadingFailed } = await supabase
        .from('user')
        .select('chat_rooms')
        .eq('id', curUser?.id);

      if (chatRoomList) {
        const filtered = chatRoomList[0].chat_rooms.filter(
          (roomId: string) => roomId !== clicked
        );

        const { error: deleteRoomError } = await supabase
          .from('user')
          .update({ chat_rooms: filtered })
          .eq('id', curUser?.id);

        utils.getRoomsforUser(curUser, setRooms, clicked, setMessages);

        if (deleteRoomError) {
          console.log('채팅방 나가기 실패');
        }
        if (targetUser) {
          const { data: TargetchatRoomList, error: targetRoomLoadingFailed } =
            await supabase
              .from('user')
              .select('chat_rooms')
              .eq('id', targetUser[0]?.id);

          if (TargetchatRoomList) {
            const filtered = TargetchatRoomList[0].chat_rooms.filter(
              (roomId: string) => roomId !== clicked
            );

            const { error: deleteRoomError } = await supabase
              .from('user')
              .update({ chat_rooms: filtered })
              .eq('id', targetUser[0]?.id);

            utils.getRoomsforUser(curUser, setRooms, clicked, setMessages);

            if (deleteRoomError) {
              console.log('채팅방 나가기 실패');
            }
            setClicked('');
          }
        }
      }
    }
  };
}
