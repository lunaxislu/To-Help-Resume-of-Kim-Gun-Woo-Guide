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
export type ProfileObject = {
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
};

export type UpdateObject = {
  updateData: {
    title: string;
    content: string;
    anon: boolean;
    files: {
      name: string;
      url: string | null[];
    }[];
    main_image: string;
    category: string;
  };
  paramId: string | undefined;
};

export type InsertObject = {
  title: string;
  content: string;
  category: string;
  post_user: string;
  nickname: string;
  files: {
    name: string;
    url: string | null[];
  }[];
  main_image: string;
  anon: boolean;
};
export type CommuListProps = {
  selectCategory: string;
};
export type QuillLayoutProps = {
  content: string;
  setContent: (content: string) => void;
};
export type WriteLayoutProps = {
  profile: ProfileObject[] | undefined;
  isEdit: boolean;
  paramId: string | undefined;
  setIsEditState: (isEditState: boolean) => void;
};
