export type Post = {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  category: string;
  post_user: string;
  nickname: string;
  comment: { user_id: string; user_name: string } | null;
  likes: number | null;
  like_user: { uid: string }[] | null;
  files: [];
  main_image: string;
  anon: boolean;
};
export type FilesObject = {
  url: string;
  name: string;
};
export type ProfileObject =
  | {
      id: string;
      created_at: string;
      avartar_url: string;
      username: string;
      nickname: string;
      email: string;
      chat_rooms: string[];
      likes: string[];
      board: string[];
      comment: string[];
    }[];
