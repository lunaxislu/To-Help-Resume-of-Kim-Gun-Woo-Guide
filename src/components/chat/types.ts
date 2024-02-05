import { User } from '@supabase/supabase-js';
import { ReactNode, SetStateAction } from 'react';

export type MessageProps = {
  msg: MessageType;
  findChatRoom: any;
  handleShowImage: any;
};

export type MessageType = {
  id: string;
  sender_id: string;
  chat_room_id: string;
  content: string;
  image_url: string[];
  created_at: string;
  isNew: boolean;
  timeStamp: string;
  isFirst: boolean;
};

export type Participants = {
  user_id: string;
  user_name: string;
  avatar_url: string;
  isSeller: boolean;
  about: string;
  user2_name: string;
};

export type RoomType = {
  id: string;
  room_name: string;
  created_at: string;
  participants: Participants[];
  about: string;
  isSeller: boolean;
  unread: number;
  last_updated: string;
};

export type RoomStyledProps = {
  $current: string | undefined;
  children: ReactNode;
};

export type MessageCompProps = {
  messages: MessageType[];
  curUser: User | null | undefined;
  setShowImage: React.Dispatch<SetStateAction<boolean>>;
  setClickedImages: React.Dispatch<SetStateAction<string>>;
};

export type RoomProps = {
  rooms: RoomType[] | null | undefined;
  handleCurClicked: React.MouseEventHandler<HTMLDivElement>;
  clicked: string | undefined;
  unread: number[] | null;
  handleBoardPosition: any;
  curUser: User | null | undefined;
};
