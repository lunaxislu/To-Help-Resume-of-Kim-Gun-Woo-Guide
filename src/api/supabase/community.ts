import { Post } from '../../pages/community/api/model';

export interface Community {
  id: number;
  title: string;
  content: string;
  created_at: string;
  main_image: string;
  post_id: string;
  comment: [];
  likes: number;
}

export interface MyPageCommunityCardProps {
  id: number;
  title: string;
  content: string;
  created_at: string;
  main_image: string;
  post_id: string;
  comment: [];
  likes: number;
}
