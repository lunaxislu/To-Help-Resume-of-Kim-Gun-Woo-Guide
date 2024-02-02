import React, { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../api/supabase/supabaseClient';
import * as St from '../../styles/community/CommentStyle';

import { useNavigate } from 'react-router';
import {
  fetchDetailPost,
  updatePostMutation
} from '../../pages/community/commuQuery';
import {
  CommentProps,
  ProfileObject,
  ReplyObject
} from '../../pages/community/model';
import parseDate from '../../util/getDate';
const Reply: React.FC<CommentProps> = ({ userId, paramId, likes }) => {
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
  // post에 관한거 가져오는 건데  리팩토링 때 community에 likes랑 likes 유저만 필요한데 프롭스로 내릴까.?
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
  const [isReply, setIsReply] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [replyingToComment, setReplyingToComment] =
    useState<ReplyObject | null>(null);
  const [editToolOpenId, setEditToolOpenId] = useState<number | null>(null);
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
    }
  });
  // console.log(comments);

  useEffect(() => {
    const getCommentsWithUserData = async () => {
      try {
        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*')
          .order('id', { ascending: false })
          .eq('post_id', paramId);

        if (commentsError) throw commentsError;
        // const thisComment = comments.filter((comment) => {
        //   return editToolOpenId === comment.id;
        // });
        // console.log(thisComment);
        //각 댓글에 담긴 user_id로 유저데이터 가져오기
        const commentUserInfo = await Promise.all(
          commentsData.map(async (comment) => {
            const { data: user, error: userError } = await supabase
              .from('user')
              .select('*')
              .eq('id', comment.user_id)
              .single();
            if (userError) throw userError;
            return { ...comment, user }; // user정보 객체에 추가
          })
        );

        setComments(commentUserInfo);
      } catch (error) {
        console.error('댓글 및 사용자 정보 가져오기 오류:', error);
      }
    };

    getCommentsWithUserData();
  }, []);
  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const insertReply = {
      parent_id: parentId,
      user_id: userId,
      post_id: paramId,
      content: comment,
      anon,
      secret
    };
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([insertReply]);
      if (error) throw error;
      setAnon(false);
      setComment('');
      setSecret(false);
      setReplyingToComment(null); // 대댓글 대상 댓글 정보 저장
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const startEditComment = (commentId: number, currentContent: string) => {
    setEditComment(currentContent); // 현재 댓글 내용으로 설정
    setEditedCommentIndex(commentId); // 수정 중인 댓글의 ID 설정
    setIsEdit(true);
  };
  const updateCommentDetail = async (commentId: number) => {
    const updateReply = {
      content: editComment,
      anon,
      secret
    };
    try {
      const { data, error } = await supabase
        .from('comments')
        .update([updateReply])
        .eq('id', commentId);
      if (error) throw error;
      setAnon(false);
      setComment('');
      setSecret(false);
      setIsEdit(false); // 수정 모드 종료
      setEditedCommentIndex(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      try {
        const { data, error } = await supabase
          .from('comments')
          .delete()
          .eq('id', commentId);
        if (error) throw error;

        setEditedCommentIndex(null);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    } else {
      alert('삭제취소');
    }
  };
  const handleReplyClick = (comment: ReplyObject) => {
    setIsReply(true); // 대댓글 입력 활성화
    setReplyingToComment(comment); // 대댓글 대상 댓글 정보 저장
    setParentId(comment.id);
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

  const parentComment = comments?.filter((comment) => {
    return comment.parent_id === null;
  });
  const childComment = (commentId: number) =>
    comments.filter((reply) => reply.parent_id === commentId);
  if (isLoading) {
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
        <p>{`${comments.length}개의 댓글`}</p>
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

      {comments
        ?.filter((comment) => {
          return comment.parent_id === null;
        })
        .map((comment, index) => {
          const parseTime = parseDate(comment.created_at);
          return (
            <St.CommentContainer key={index}>
              {comment.secret ? (
                <></>
              ) : (
                <St.Comment>
                  <St.ParentComment>
                    <St.LeftCommentSide>
                      <St.LeftSide>
                        <St.ProfileImage src={comment.user.avatar_url} />
                        <St.Name>
                          {comment.anon
                            ? '익명의 작업자'
                            : comment.user.nickname
                            ? comment.user.nickname
                            : comment.user.username}
                        </St.Name>
                        <St.Time>{parseTime}</St.Time>
                        <St.UpdateBtnContainer>
                          {profile.length > 0 &&
                          comment.user_id === profile[0].id ? (
                            isEdit && editedCommentIndex === comment.id ? (
                              <p
                                onClick={() => updateCommentDetail(comment.id)}
                              >
                                수정완료
                              </p>
                            ) : (
                              <>
                                <p
                                  onClick={() =>
                                    startEditComment(
                                      comment.id,
                                      comment.content
                                    )
                                  }
                                >
                                  수정
                                </p>
                                <p>|</p>
                                <p onClick={() => deleteComment(comment.id)}>
                                  삭제
                                </p>
                              </>
                            )
                          ) : (
                            <></>
                          )}
                        </St.UpdateBtnContainer>
                      </St.LeftSide>
                      {isEdit && editedCommentIndex === comment.id ? (
                        <input
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                        />
                      ) : (
                        <St.CommentContent>{comment.content}</St.CommentContent>
                      )}
                    </St.LeftCommentSide>{' '}
                    <button onClick={() => handleReplyClick(comment)}>
                      대댓글
                    </button>
                  </St.ParentComment>

                  {childComment(comment.id).map((comment) => (
                    <St.ChildCommentContainer>
                      <p>ㄴ</p>
                      <St.ChildComment>
                        <St.LeftCommentSide>
                          <St.LeftSide>
                            <St.ProfileImage src={comment.user.avatar_url} />
                            <St.Name>
                              {comment.anon
                                ? '익명의 작업자'
                                : comment.user.nickname
                                ? comment.user.nickname
                                : comment.user.username}
                            </St.Name>
                            <St.Time>{parseTime}</St.Time>
                            <St.UpdateBtnContainer>
                              {profile.length > 0 &&
                              comment.user_id === profile[0].id ? (
                                isEdit && editedCommentIndex === comment.id ? (
                                  <p
                                    onClick={() =>
                                      updateCommentDetail(comment.id)
                                    }
                                  >
                                    수정완료
                                  </p>
                                ) : (
                                  <>
                                    <p
                                      onClick={() =>
                                        startEditComment(
                                          comment.id,
                                          comment.content
                                        )
                                      }
                                    >
                                      수정
                                    </p>
                                    <p>|</p>
                                    <p
                                      onClick={() => deleteComment(comment.id)}
                                    >
                                      삭제
                                    </p>
                                  </>
                                )
                              ) : (
                                <></>
                              )}
                            </St.UpdateBtnContainer>
                          </St.LeftSide>
                          {isEdit && editedCommentIndex === comment.id ? (
                            <input
                              value={editComment}
                              onChange={(e) => setEditComment(e.target.value)}
                            />
                          ) : (
                            <St.CommentContent>
                              {comment.content}
                            </St.CommentContent>
                          )}
                        </St.LeftCommentSide>{' '}
                        <button onClick={() => handleReplyClick(comment)}>
                          대댓글
                        </button>
                      </St.ChildComment>
                    </St.ChildCommentContainer>
                  ))}
                </St.Comment>
              )}

              {/* <button>신고</button> */}
            </St.CommentContainer>
          );
        })}
    </St.Container>
  );
};

export default React.memo(Reply);
