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
export const addPost = async (insertData: InsertObject) => {
  try {
    const { data, error } = await supabase
      .from('community')
      .insert([insertData]);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export const updatePost = async (
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

export const deletePost = async (postId: string | undefined) => {
  const { data, error } = await supabase
    .from('community')
    .delete()
    .eq('post_id', postId);

  if (error) {
    throw error;
  }
  return data;
};
