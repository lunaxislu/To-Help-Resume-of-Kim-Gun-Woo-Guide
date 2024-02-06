import React, { FormEvent, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../api/supabase/supabaseClient';
import * as St from '../../styles/community/CommentStyle';

import { useNavigate } from 'react-router';
import { fetchComments } from '../../pages/community/api/ReplyQuery';
import { fetchDetailPost } from '../../pages/community/api/commuQuery';
import {
  CommentProps,
  ProfileObject,
  ReplyObject
} from '../../pages/community/api/model';
import {
  useAddReplyMutation,
  useDeleteReplyMutation,
  useUpdatePostMutation,
  useUpdateReplyMutation
} from '../../pages/community/hook/useQuery';
import ReplyForm from './ReplyForm';
import ReplyList from './ReplyList';
const Reply: React.FC<CommentProps> = ({
  userId,
  paramId,
  likes,
  postUserId
}) => {
  //꺄아악 state 무덤 react-hook-form 또는 custom-input만들자
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState<ProfileObject[]>([]);
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [editedCommentIndex, setEditedCommentIndex] = useState<number | null>(
    null
  ); // 수정 중인 댓글의 인덱스
  const [anon, setAnon] = useState(false);
  const [secret, setSecret] = useState(false);
  const [parentId, setParentId] = useState<number | null>(null);
  const [parentUserId, setParentUserId] = useState<string | null>(null);

  const [liked, setLiked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [replyingToComment, setReplyingToComment] =
    useState<ReplyObject | null>(null);

  //유저 데이터 가져오기
  const queryClient = useQueryClient();
  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const { data: user, error } = await supabase
            .from('user')
            .select('*')
            .eq('id', userId);
          if (error) {
            console.log(error);
          }

          if (user != null) {
            setProfile(user);
          }
        } catch (error: any) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, []);

  const {
    data: posts,
    isLoading,
    isError
  } = useQuery(['post', paramId], () => fetchDetailPost(paramId));

  const navigate = useNavigate();

  useEffect(() => {
    // 사용자가 이미 좋아요를 했는지 확인
    const userLiked = posts?.[0]?.likes_user?.includes(userId);
    if (userLiked) {
      setLiked(true);
    }
  }, [posts, userId]);
  const updatePostMutation = useUpdatePostMutation();
  const toggleLike = async () => {
    const newLikedStatus = !liked;
    setLiked(newLikedStatus);

    // 기본값으로 빈 배열 설정
    const currentLikeUsers = posts![0]?.likes_user || [];

    const updatedLikes = newLikedStatus ? likes! + 1 : likes! - 1;
    let updatedLikeUsers;
    if (newLikedStatus) {
      updatedLikeUsers = [...currentLikeUsers, userId];
    } else {
      updatedLikeUsers = currentLikeUsers.filter((id: string) => id !== userId);
    }

    const likesUpdate = {
      updateData: {
        likes: updatedLikes,
        likes_user: updatedLikeUsers
      },
      paramId
    };
    updatePostMutation.mutate(likesUpdate, {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts', paramId]);
        setAnon(false);
        setComment('');
        setSecret(false);
        setParentId(null);
        setParentUserId(null);
      }
    });
  };

  const { data: commentUserInfo, isLoading: commentLoading } = useQuery(
    ['comments', paramId],
    () => fetchComments(paramId)
  );

  const addMutation = useAddReplyMutation();
  const updateMutation = useUpdateReplyMutation();
  const deleteMutation = useDeleteReplyMutation();

  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const insertReply = {
      parent_id: parentId,
      parentUser_id: parentUserId,
      user_id: userId,
      post_id: paramId,
      content: comment,
      anon,
      secret
    };
    addMutation.mutate(insertReply, {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', paramId]);
        setAnon(false);
        setComment('');
        setSecret(false);
        setReplyingToComment(null);
        setParentId(null);
        setParentUserId(null);
        setIsFocused(false);
      }
    });
  };

  const startEditComment = (commentId: number, currentContent: string) => {
    setEditComment(currentContent); // 현재 댓글 내용으로 설정
    setEditedCommentIndex(commentId); // 수정 중인 댓글의 ID 설정
    setIsEdit(true);
  };

  const updateCommentDetail = async (commentId: number) => {
    const updateReply = {
      updateData: {
        content: editComment
      },
      commentId
    };
    updateMutation.mutate(updateReply, {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', paramId]);
        setAnon(false);
        setComment('');
        setSecret(false);
        setIsEdit(false);
        setEditedCommentIndex(null);
      }
    });
  };

  const deleteComment = async (commentId: number) => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      deleteMutation.mutate(commentId, {
        onSuccess: () => {
          queryClient.invalidateQueries('comments');
          setEditedCommentIndex(null);
        }
      });
    } else {
      alert('삭제취소');
    }
  };
  const handleReplyClick = (comment: ReplyObject) => {
    setReplyingToComment(comment);
    setParentId(comment.id);
    setParentUserId(comment.user_id);
  };
  // console.log(replyingToComment);
  const commentFocusHandler = () => {
    if (profile.length > 0) {
      setIsFocused(true);
    } else {
      if (
        window.confirm('댓글은 로그인 후에 가능합니다. 로그인하시겠습니까?')
      ) {
        navigate('/login');
      } else {
        alert('로그인 취소');
      }
    }
  };

  const childComment = (commentId: number) =>
    commentUserInfo?.filter((reply) => reply.parent_id === commentId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (commentLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <St.Container>
      <St.CountDivTop>
        <div onClick={toggleLike}>
          {liked ? <St.LikesIconOn /> : <St.LikesIcon className="likes" />}
        </div>
        <p>{likes}</p>

        <St.CommentIcon className="comment" />
        <p>{`${commentUserInfo?.length}개의 댓글`}</p>
      </St.CountDivTop>
      <ReplyForm
        addComment={addComment}
        isFocused={isFocused}
        commentFocusHandler={commentFocusHandler}
        setIsFocused={setIsFocused}
        comment={comment}
        setComment={setComment}
        replyingToComment={replyingToComment}
        anon={anon}
        setAnon={setAnon}
        secret={secret}
        setSecret={setSecret}
      />

      <ReplyList
        comments={commentUserInfo || []}
        profile={profile}
        isEdit={isEdit}
        editComment={editComment}
        editedCommentIndex={editedCommentIndex}
        handleReplyClick={handleReplyClick}
        startEditComment={startEditComment}
        updateCommentDetail={updateCommentDetail}
        deleteComment={deleteComment}
        setEditComment={setEditComment}
        canViewSecretComment={(comment: ReplyObject) =>
          !comment.secret ||
          comment.user_id === userId ||
          postUserId === userId ||
          comment.parentUser_id === userId
        }
        childComment={childComment}
      />
    </St.Container>
  );
};

export default React.memo(Reply);
