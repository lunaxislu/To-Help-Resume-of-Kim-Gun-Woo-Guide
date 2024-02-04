import { supabase } from '../../api/supabase/supabaseClient';
import { ReplyInsertObject, UpdateComment } from './model';
//쿼리 넘 많다..
const PAGE_POST_NUMBER = 12;
export const fetchRangePosts = async (page: number, selectCategory: string) => {
  const startIndex = (page - 1) * PAGE_POST_NUMBER;
  const endIndex = startIndex + PAGE_POST_NUMBER - 1; // 수정된 부분
  const { data, count, error } = await supabase
    .from('comments')
    .select('*', { count: 'exact' })
    .order('post_id', { ascending: false })
    .ilike('category', selectCategory === '전체' ? '%' : selectCategory)
    .range(startIndex, endIndex); // 수정된 부분
  if (error) {
    throw error;
  }
  return { data, count };
};

export const fetchComments = async (paramId: string | undefined) => {
  let commentUserInfo = []; // 함수 밖에서 선언하여 try 블록 밖에서도 접근 가능하게 함
  try {
    const { data: commentsData, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .order('id', { ascending: false })
      .eq('post_id', paramId);

    if (commentsError) throw commentsError;

    commentUserInfo = await Promise.all(
      commentsData.map(async (comment) => {
        const { data: user, error: userError } = await supabase
          .from('user')
          .select('*')
          .eq('id', comment.user_id)
          .single();
        if (userError) throw userError;
        return { ...comment, user }; // user 정보 객체에 추가
      })
    );
  } catch (error) {
    console.error('댓글 및 사용자 정보 가져오기 오류:', error);
    throw error; // 에러를 다시 throw하여 호출자에게 에러 전파
  }
  return commentUserInfo; // try 블록 외부에서 선언된 변수 반환
};

export const addCommentMutation = async (insertData: ReplyInsertObject) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([insertData]);
    if (error) throw error;
  } catch (error) {
    console.error('Error adding post:', error);
  }
};

export const updateCommentMutation = async (updateComment: UpdateComment) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .update(updateComment.updateData)
      .eq('id', updateComment.commentId);

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error update post:', error);
  }
};

export const deleteCommentMutation = async (commentId: number | undefined) => {
  const { data, error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) {
    throw error;
  }
  return data;
};
