import React from 'react';
import { ProfileObject, ReplyObject } from '../../pages/community/api/model';
import * as St from '../../styles/community/CommentStyle';
import ReplyContent from './ReplyContent';
type CommentListProps = {
  comments: ReplyObject[];
  profile: ProfileObject[];
  isEdit: boolean;
  editComment: string;
  editedCommentIndex: number | null;
  handleReplyClick: (comment: ReplyObject) => void;
  startEditComment: (commentId: number, currentContent: string) => void;
  updateCommentDetail: (commentId: number) => void;
  deleteComment: (commentId: number) => void;
  setEditComment: (comment: string) => void;
  canViewSecretComment: (comment: ReplyObject) => boolean;
  childComment: (commentId: number) => ReplyObject[] | undefined;
};
const ReplyList: React.FC<CommentListProps> = ({
  comments,
  profile,
  isEdit,
  editComment,
  editedCommentIndex,
  handleReplyClick,
  startEditComment,
  updateCommentDetail,
  deleteComment,
  setEditComment,
  canViewSecretComment,
  childComment
}) => {
  return (
    <>
      {' '}
      {comments
        ?.filter((comment) => comment.parent_id === null)
        .map((comment, index) => (
          <St.CommentContainer key={index}>
            <St.Comment>
              {comment.secret && !canViewSecretComment(comment) ? (
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
                .map((childComment, index) => (
                  <St.ChildCommentContainer key={index}>
                    <p>ㄴ</p>
                    {childComment.secret &&
                    !canViewSecretComment(childComment) ? (
                      <St.CommentContent>
                        이 댓글은 비밀댓글입니다.
                      </St.CommentContent>
                    ) : (
                      <St.ChildComment>
                        <ReplyContent
                          comment={childComment}
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
          </St.CommentContainer>
        ))}
    </>
  );
};

export default ReplyList;
