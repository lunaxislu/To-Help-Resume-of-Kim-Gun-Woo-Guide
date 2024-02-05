import { User } from '@supabase/supabase-js';
import { SetStateAction } from 'react';
import { MessageType, RoomType } from '../../../components/chat/types';

export interface ChatHeaderPropsType {
  showMene: boolean;
  clicked: string;
  curUser: User | null | undefined;
  targetUser: any[] | undefined;
  setRooms: React.Dispatch<SetStateAction<RoomType[] | null | undefined>>;
  setMessages: React.Dispatch<SetStateAction<MessageType[]>>;
  setClicked: React.Dispatch<SetStateAction<string | undefined>>;
  rooms: RoomType[] | null | undefined;
  setShowMenu: React.Dispatch<SetStateAction<boolean>>;
  handleHideBoardPosition: any;
}
