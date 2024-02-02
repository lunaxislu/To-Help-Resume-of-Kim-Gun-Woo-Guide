import { useQuery } from 'react-query';
import { v4 as uuid } from 'uuid';
import { supabase } from '../../api/supabase/supabaseClient';
import {
  CommentUpload,
  InsertObject,
  LikesObject,
  UpdateObject
} from './model';
//쿼리 넘 많다..
const PAGE_POST_NUMBER = 12;
export const fetchRangePosts = async (page: number, selectCategory: string) => {
  const startIndex = (page - 1) * PAGE_POST_NUMBER;
  const endIndex = startIndex + PAGE_POST_NUMBER - 1; // 수정된 부분
  const { data, count, error } = await supabase
    .from('community')
    .select('*', { count: 'exact' })
    .order('post_id', { ascending: false })
    .ilike('category', selectCategory === '전체' ? '%' : selectCategory)
    .range(startIndex, endIndex); // 수정된 부분
  if (error) {
    throw error;
  }
  return { data, count };
};

export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('community')
    .select('*', { count: 'exact' });
  if (error) {
    throw error;
  }
  return data;
};
export const fetchDetailPost = async (postId: string | undefined) => {
  const { data, error } = await supabase
    .from('community')
    .select('*')
    .eq('post_id', Number(postId));
  if (error) {
    throw error;
  }
  return data;
};
export const addPostMutation = async (insertData: InsertObject) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .insert([insertData]);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export const updatePostMutation = async (
  postData: UpdateObject | CommentUpload | LikesObject
) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .update(postData.updateData)
      .eq('post_id', postData.paramId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error update post:', error);
  }
};

export const deletePostMutation = async (postId: string | undefined) => {
  const { data, error } = await supabase
    .from('community')
    .delete()
    .eq('post_id', postId);

  if (error) {
    throw error;
  }
  return data;
};

export const uploadFile = async (file: File) => {
  const newFileName = uuid();
  const { data, error } = await supabase.storage
    .from('files')
    .upload(`files/${newFileName}`, file);

  if (error) {
    throw new Error('파일 업로드 중 오류가 발생했습니다.');
  }

  return supabase.storage.from('files').getPublicUrl(data.path);
};
export const addCommentMutation = async (insertData: InsertObject) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .insert([insertData]);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export const updateCommentMutation = async (
  postData: UpdateObject | CommentUpload | LikesObject
) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .update(postData.updateData)
      .eq('post_id', postData.paramId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error update post:', error);
  }
};

export const useCommentsUserData = (paramId: string | undefined) => {
  return useQuery(['comments', paramId], async () => {
    // 댓글과 그 개수 가져오기
    const {
      data: commentsData,
      count,
      error: commentsError
    } = await supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .order('id', { ascending: false })
      .eq('post_id', paramId);

    if (commentsError) {
      throw new Error(commentsError.message);
    }

    // 각 댓글에 대한 사용자 데이터 가져오기
    const commentsWithUserData = await Promise.all(
      commentsData.map(async (comment) => {
        const { data: user, error: userError } = await supabase
          .from('user')
          .select('*')
          .eq('id', comment.user_id)
          .single();

        if (userError) {
          throw new Error(userError.message);
        }

        return { ...comment, user }; // 댓글과 사용자 데이터 결합
      })
    );

    // 댓글 데이터와 그 개수를 함께 반환
    return { comments: commentsWithUserData, count };
  });
};
