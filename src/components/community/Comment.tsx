import React, { FormEvent, useEffect, useState } from 'react';
import { BsChatRightFill } from 'react-icons/bs';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import {
  fetchDetailPost,
  updatePostMutation
} from '../../pages/community/commuQuery';
import {
  CommentProps,
  Comments,
  ProfileObject
} from '../../pages/community/model';
import parseDate from '../../util/getDate';
const Comment: React.FC<CommentProps> = ({ userId, paramId }) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: profiles, error } = await supabase
          .from('user')
          .select('*')
          .eq('id', userId);
        console.log(profiles);
        if (error) {
          console.log(error);
        }

        if (profiles != null) {
          setProfile(profiles);
          console.log(profiles);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const {
    data: posts,
    isLoading,
    isError
  } = useQuery(['post', paramId], () => fetchDetailPost(paramId));

  const [isEdit, setisEdit] = useState(false);
  const [comments, setComments] = useState<Comments>([]);
  const [profile, setProfile] = useState<ProfileObject[]>([]);
  const [comment, setComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [editedCommentIndex, setEditedCommentIndex] = useState<number | null>(
    null
  ); // 수정 중인 댓글의 인덱스
  const [anon, setAnon] = useState(false);
  useEffect(() => {
    if (!isLoading && posts) {
      setComments(posts[0].comment);
      console.log(comment);
    }
  }, [isLoading, posts]);
  const upsertMutation = useMutation(updatePostMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', paramId]);
      setAnon(false);
      setComment('');
    }
  });
  const updateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
      //   comment_id: uuid(),
      comment_user: profile![0].id,
      nickname: profile![0].nickname
        ? profile![0].nickname
        : profile![0].username,
      comment,
      anon,
      time: Date()
    };
    setComments((prevComments) => [...prevComments, newComment]);
    const commentObject = {
      updateData: {
        comment: [...comments, newComment]
      },
      paramId
    };
    upsertMutation.mutate(commentObject);
  };

  // 댓글 수정 버튼 클릭 시
  const startEditComment = (index: number) => {
    setisEdit(true);
    setEditedCommentIndex(index);
    setEditComment(comments[index].comment);
  };

  const updateCommentDetail = (index: number) => {
    if (isEdit && editedCommentIndex !== null) {
      // 수정 중인 댓글을 업데이트
      const updatedComments = comments.map((comment, index) =>
        index === editedCommentIndex
          ? { ...comment, comment: editComment }
          : comment
      );

      setComments(updatedComments);
      setEditedCommentIndex(null);

      const commentObject = {
        updateData: {
          comment: updatedComments
        },
        paramId
      };
      upsertMutation.mutate(commentObject);
    }
  };

  const deleteComment = (index: number) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const updatedComments = comments.filter((_, idx) => idx !== index);

      setComments(updatedComments);

      // 삭제된 댓글을 서버로 업데이트
      const commentObject = {
        updateData: {
          comment: updatedComments
        },
        paramId
      };
      upsertMutation.mutate(commentObject);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <Container>
      <CountDivTop>
        {' '}
        <CommentIcon />
        {`${comments.length}`}
      </CountDivTop>

      <Form onSubmit={updateComment}>
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <AnonLabel>
          <CheckBoxs
            type="checkbox"
            checked={anon}
            onChange={() => setAnon(!anon)}
          />
          익명
        </AnonLabel>
        <button type="submit">추가</button>
      </Form>
      <CountDiv>{`${comments.length}개의 댓글`}</CountDiv>
      {comments?.map((comment, index) => {
        const parseTime = parseDate(comment.time);
        return (
          <CommentContainer key={index}>
            <div>
              <LeftSide>
                <Name>{comment.anon ? '익명의 작업자' : comment.nickname}</Name>
                <p>{parseTime}</p>
              </LeftSide>
              {isEdit && editedCommentIndex === index ? (
                <input
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
              ) : (
                <CommentContent>{comment.comment}</CommentContent>
              )}
            </div>{' '}
            <UpdateBtnContainer>
              {profile.length > 0 && comment.comment_user === profile[0].id ? (
                isEdit && editedCommentIndex === index ? (
                  <p onClick={() => updateCommentDetail(index)}>수정완료</p>
                ) : (
                  <>
                    <p onClick={() => startEditComment(index)}>수정</p>
                    <p>|</p>
                    <p onClick={() => deleteComment(index)}>삭제</p>
                  </>
                )
              ) : (
                <></>
              )}
            </UpdateBtnContainer>
            {/* <button>신고</button> */}
          </CommentContainer>
        );
      })}
    </Container>
  );
};
const Name = styled.p`
  font-size: var(--fontSize-H5);
`;
const CommentContent = styled.p`
  font-size: var(--fontSize-H6);
  width: 45rem;
`;
const CommentIcon = styled(BsChatRightFill)`
  color: #dbff00;
  opacity: 50%;
`;
const CountDiv = styled.div`
  width: 100%;
  margin: 2rem;
  font-size: var(--fontSize-H5);
`;

const AnonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: var(--fontSize-H5);
`;
const CountDivTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1rem;
  border-bottom: 0.1rem solid var(--12-gray);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: var(--fontSize-H5);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const Form = styled.form`
  width: 100%;
  max-width: 1116px;
  height: 7.1rem;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: #1f1f1f;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.2rem;
  & button {
    height: 3rem;
    width: 4rem;
    border-radius: 0.5rem;
    border: none;
    background-color: var(--5-gray);

    font-weight: var(--fontWeight-semiBold);
  }
`;
const CommentInput = styled.input`
  width: 80%;
  height: 38px;
  background-color: transparent;
  border: none;
  color: var(--12-gray);
  &::placeholder {
    color: var(--5-gray);
    font-size: 16px;
  }
`;
const CheckBoxs = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: var(--5-gray); /* 선택되지 않은 상태의 배경 색상 */
  border: none;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-right: 5px; /* 여백을 조절할 수 있습니다. */

  /* 체크 표시 스타일 */
  &:checked:before {
    content: '✔';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    color: var(--opc-100);
  }
`;
const CommentContainer = styled.div`
  margin-top: 10px;
  background-color: #1f1f1f;
  width: 100%;
  min-height: 9.4rem;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  & button {
    padding: 10px;
    border-radius: 20px;
    border: none;
    background-color: #f3f3f3;
  }
  & input {
    width: 30rem;
    background-color: var(--7-gray);
    border: none;
    height: 3.8rem;
    border-radius: 1rem;
  }
`;
const LeftSide = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & p {
    margin-bottom: 20px;
  }
`;
const UpdateBtnContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

export default React.memo(Comment);
