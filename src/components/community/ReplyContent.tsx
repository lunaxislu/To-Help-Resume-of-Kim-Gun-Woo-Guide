import React from 'react';
import { ProfileObject, ReplyObject } from '../../pages/community/api/model';
import * as St from '../../styles/community/CommentStyle';
import parseDate from '../../util/getDate';
type ReplyContentProps = {
  comment: ReplyObject;
  profile: ProfileObject[];
  isEdit: boolean;
  editedCommentIndex: number | null;
  startEditComment: (commentId: number, currentContent: string) => void;
  updateCommentDetail: (commentId: number) => void;
  deleteComment: (commentId: number) => void;
  editComment: string;
  setEditComment: React.Dispatch<React.SetStateAction<string>>;
};
const ReplyContent: React.FC<ReplyContentProps> = ({
  setEditComment,
  editComment,
  comment,
  profile,
  isEdit,
  editedCommentIndex,
  startEditComment,
  updateCommentDetail,
  deleteComment
}) => {
  const parseTime = parseDate(comment.created_at);
  return (
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
          {profile.length > 0 && comment.user_id === profile[0].id ? (
            isEdit && editedCommentIndex === comment.id ? (
              <p onClick={() => updateCommentDetail(comment.id)}>수정완료</p>
            ) : (
              <>
                <p
                  onClick={() => startEditComment(comment.id, comment.content)}
                >
                  수정
                </p>
                <p>|</p>
                <p onClick={() => deleteComment(comment.id)}>삭제</p>
              </>
            )
          ) : (
            <p>신고</p>
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
    </St.LeftCommentSide>
  );
};

export default ReplyContent;
