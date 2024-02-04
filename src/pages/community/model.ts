export type Post = {
  post_id: number;
  title: string;
  content: string;
  created_at: string;
  category: string;
  post_user: string;
  nickname: string;
  comment: Comments | null;
  likes: number | null;
  like_user: string[];
  files: {
    name: string;
    url: string | null[];
  }[];
  main_image: string;
  anon: boolean;
  comments_count: number;
};
export type FilesObject = {
  url: string;
  name: string;
};
export type ProfileObject = {
  id: string;
  created_at: string;
  avatar_url: string;
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
  posts: Post[] | undefined;
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
export type CommentProps = {
  userId: string;
  paramId: string | undefined;
  likes: number | undefined;
  postUserId: string | undefined;
};
export type CommentUpload = {
  updateData: {
    comment: Comments;
  };
  paramId: string | undefined;
};
export type Comments = {
  // comment_id: string;
  comment_user: string;
  nickname: string;
  comment: string;
  time: string;
  anon: boolean;
}[];
export type LikesObject = {
  updateData: {
    likes: number;
    likes_user: string;
  };
  paramId: string | undefined;
};
export type PageBtnProps = {
  $currentPage: number;
  $pageNumber: number;
};
export type EditCommentInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type FormProps = {
  $isFocused: boolean;
};
export type ReplyInsertObject = {
  parent_id: number | null;
  parentUser_id: string | null;
  user_id: string;
  post_id: string | undefined;
  content: string;
  anon: boolean;
  secret: boolean;
};
export type ReplyObject = {
  id: number;
  parent_id: number;
  user_id: string;
  post_id: number;
  content: string;
  anon: boolean;
  secret: boolean;
  created_at: string;
  user: ProfileObject;
  parentUser_id: string;
};
export type UpdateComment = {
  updateData: {
    content: string;
    anon: boolean;
    secret: boolean;
  };
  commentId: number | undefined;
};
export type Postcolor = {
  $postcolor: string;
};
