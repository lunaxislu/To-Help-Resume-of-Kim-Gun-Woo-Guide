import { SetStateAction } from 'react';
import { RoomType } from '../chat/types';
import { CustomUser } from '../../pages/productsDetail/types';

export type ChatListProps = {
  createdChatList: RoomType[];
  setShowChatList: React.Dispatch<SetStateAction<boolean>>;
  curUser: CustomUser | null;
  setBuyerChatId: React.Dispatch<SetStateAction<string>>;
  selectedUser: string;
  setSelectedUser: React.Dispatch<SetStateAction<string>>;
  handleSellComplete: any;
};
