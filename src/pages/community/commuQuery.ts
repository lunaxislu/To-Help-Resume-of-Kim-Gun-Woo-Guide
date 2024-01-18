import { supabase } from '../../api/supabase/supabaseClient';
import { InsertObject, UpdateObject } from './model';
export const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('community')
    .select('*')
    .order('post_id', { ascending: false });
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
    // FileList를 배열로 변환
    const { data, error } = await supabase
      .from('community')
      .insert([insertData]);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export const updatePostMutation = async (postData: UpdateObject) => {
  const { data, error } = await supabase
    .from('community')
    .update(postData.updateData)
    .eq('post_id', postData.paramId);

  if (error) {
    throw error;
  }
  return data;
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
