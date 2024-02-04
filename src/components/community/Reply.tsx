import React, { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../api/supabase/supabaseClient';
import * as St from '../../styles/community/CommentStyle';

import { useNavigate } from 'react-router';
import {
  addCommentMutation,
  deleteCommentMutation,
  fetchComments,
  updateCommentMutation
} from '../../pages/community/api/ReplyQuery';
import {
  fetchDetailPost,
  updatePostMutation
} from '../../pages/community/api/commuQuery';
import {
  CommentProps,
  ProfileObject,
  ReplyObject
} from '../../pages/community/api/model';
import parseDate from '../../util/getDate';
import ReplyContent from './ReplyContent';
const Reply: React.FC<CommentProps> = ({
  userId,
  paramId,
  likes,
  postUserId
}) => {
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
          // console.log(user);
          if (error) {
            console.log(error);
          }

          if (user != null) {
            setProfile(user);
            // console.log(user);
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

  //꺄아악 state 무덤 react-hook-form 또는 custom-input만들자
  const [isEdit, setIsEdit] = useState(false);
  const [comments, setComments] = useState<ReplyObject[]>([]);
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
  const [isReply, setIsReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [replyingToComment, setReplyingToComment] =
    useState<ReplyObject | null>(null);

  useEffect(() => {
    // 사용자가 이미 좋아요를 했는지 확인
    const userLiked = posts?.[0]?.likes_user?.includes(userId);
    if (userLiked) {
      setLiked(true);
    }
  }, [posts, userId]);

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
    upsertMutation.mutate(likesUpdate);
  };

  const upsertMutation = useMutation(updatePostMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', paramId]);
      setAnon(false);
      setComment('');
      setSecret(false);
      setParentId(null);
      setParentUserId(null);
    }
  });

  const { data: commentUserInfo, isLoading: commentLoading } = useQuery(
    ['comments', paramId],
    () => fetchComments(paramId)
  );
  // console.log(commentUserInfo);
  //댓글 추가 쿼리 변환 완료
  const addMutation = useMutation(addCommentMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      setAnon(false);
      setComment('');
      setSecret(false);
      setReplyingToComment(null);
      setParentId(null);
      setParentUserId(null);
      setIsFocused(false);
    }
  });

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
    addMutation.mutate(insertReply);
  };

  const startEditComment = (commentId: number, currentContent: string) => {
    setEditComment(currentContent); // 현재 댓글 내용으로 설정
    setEditedCommentIndex(commentId); // 수정 중인 댓글의 ID 설정
    setIsEdit(true);
  };
  const updateMutation = useMutation(updateCommentMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      setAnon(false);
      setComment('');
      setSecret(false);
      setIsEdit(false);
      setEditedCommentIndex(null);
    }
  });
  const updateCommentDetail = async (commentId: number) => {
    const updateReply = {
      updateData: {
        content: editComment,
        anon,
        secret
      },
      commentId
    };
    updateMutation.mutate(updateReply);
  };
  const deleteMutation = useMutation(deleteCommentMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
      setEditedCommentIndex(null);
    }
  });
  const deleteComment = async (commentId: number) => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      deleteMutation.mutate(commentId);
    } else {
      alert('삭제취소');
    }
  };
  const handleReplyClick = (comment: ReplyObject) => {
    setIsReply(true); // 대댓글 입력 활성화
    setReplyingToComment(comment); // 대댓글 대상 댓글 정보 저장
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

      <St.Form
        onSubmit={addComment}
        $isFocused={isFocused}
        onFocus={commentFocusHandler}
        onBlur={() => setIsFocused(false)}
      >
        <div>
          <St.CommentInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={
              replyingToComment
                ? replyingToComment.anon
                  ? '익명의 작업자에게 답글 달기...'
                  : `@${
                      replyingToComment.user.nickname ??
                      replyingToComment.user.username
                    }에게 답글 달기...`
                : '댓글을 입력하세요'
            }
          />
          <button type="submit">
            <St.SendIcon />
          </button>
        </div>

        <St.CheckBoxArea>
          <St.AnonLabel>
            <St.CheckBoxs
              type="checkbox"
              checked={anon}
              onChange={() => setAnon(!anon)}
            />
            익명
          </St.AnonLabel>
          <St.AnonLabel>
            <St.CheckBoxs
              type="checkbox"
              checked={secret}
              onChange={() => setSecret(!secret)}
            />
            비밀
          </St.AnonLabel>
        </St.CheckBoxArea>
      </St.Form>

      {commentUserInfo
        ?.filter((comment) => {
          return comment.parent_id === null;
        })
        .map((comment, index) => {
          const parseTime = parseDate(comment.created_at);
          const canViewSecretComment =
            !comment.secret ||
            comment.user_id === userId || // 현재 사용자가 댓글 작성자
            postUserId === userId ||
            comment.parentUser_id === userId;
          return (
            <St.CommentContainer key={index}>
              <St.Comment>
                {comment.secret && !canViewSecretComment ? (
                  <St.SecretComment>이 댓글은 비밀댓글입니다.</St.SecretComment>
                ) : (
                  <St.ParentComment>
                    <ReplyContent
                      comment={comment}
                      profile={profile}
                      isEdit={isEdit}
                      editComment={editComment}
                      editedCommentIndex={editedCommentIndex}
                      startEditComment={startEditComment}
                      updateCommentDetail={updateCommentDetail}
                      deleteComment={deleteComment}
                      setEditComment={setEditComment}
                    />
                    <button onClick={() => handleReplyClick(comment)}>
                      대댓글
                    </button>
                  </St.ParentComment>
                )}

                {childComment(comment.id)
                  ?.reverse()
                  .map((comment, index) => (
                    <St.ChildCommentContainer key={index}>
                      <p>ㄴ</p>
                      {comment.secret && !canViewSecretComment ? (
                        <St.CommentContent>
                          이 댓글은 비밀댓글입니다.
                        </St.CommentContent>
                      ) : (
                        <St.ChildComment>
                          <ReplyContent
                            comment={comment}
                            profile={profile}
                            isEdit={isEdit}
                            editComment={editComment}
                            editedCommentIndex={editedCommentIndex}
                            startEditComment={startEditComment}
                            updateCommentDetail={updateCommentDetail}
                            deleteComment={deleteComment}
                            setEditComment={setEditComment}
                          />
                        </St.ChildComment>
                      )}
                    </St.ChildCommentContainer>
                  ))}
              </St.Comment>

              {/* <button>신고</button> */}
            </St.CommentContainer>
          );
        })}
    </St.Container>
  );
};

export default React.memo(Reply);
