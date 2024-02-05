import { Product } from '../../api/supabase/products';
import { CustomUser } from '../../pages/productsDetail/types';

export type ButtonProps = {
  curUser: CustomUser | null;
  handleLoadChatRooms: any;
  handleShowChatList: any;
  isLiked: boolean;
  handleLike: any;
  likesCount: number | null;
  isSoldOut: boolean;
  isExist: boolean;
  product: Product[];
  makeChatRoom: any;
  handleCancleLike: any;
};
