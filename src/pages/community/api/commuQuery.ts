import { v4 as uuid } from 'uuid';
import { supabase } from '../../../api/supabase/supabaseClient';
import {
  CommentUpload,
  InsertObject,
  LikesObject,
  UpdateObject
} from './model';

export const getPostCount = async (selectCategory: string) => {
  const { count, error } = await supabase
    .from('community')
    .select('count', { count: 'exact' })
    .ilike('category', selectCategory === '전체' ? '%' : selectCategory);
  if (error) {
    throw error;
  }
  return count;
};

export const fetchPosts = async (
  selectCategory: string,
  page: number,
  limit: number = 12
) => {
  const startIndex = (page - 1) * limit;
  const { data, error } = await supabase
    .from('community')
    .select('*')
    .order('post_id', { ascending: false })
    .range(startIndex, startIndex + limit - 1)
    .ilike('category', selectCategory === '전체' ? '%' : selectCategory);

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

export const fetchComment = async (paramId: string) => {
  const { data, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact' })
    .eq('post_id', paramId);

  if (error) {
    throw error;
  }
  return data;
};

export const uploadFile = async (file: File): Promise<string> => {
  const newFileName = `${uuid()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from('files')
    .upload(`files/${newFileName}`, file);

  if (error) throw new Error(error.message);

  const { data: publicUrl } = supabase.storage
    .from('files')
    .getPublicUrl(data!.path);
  return publicUrl.publicUrl;
};
