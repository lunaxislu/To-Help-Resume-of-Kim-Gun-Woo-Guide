export interface Community {
  id: number;
  title: string;
  content: string;
  created_at: string;
  //   images?: string;
  post_id: string;
  comment: [];
  likes: number;
}

export interface MyPageCommunityCardProps {
  id: number;
  title: string;
  content: string;
  created_at: string;
  //   images: string;
  post_id: string;
  comment: [];
  likes: number;
}

export interface CommunityActive {
  activeTab: number;
}
