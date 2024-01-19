import React, { FormEvent, useEffect, useState } from 'react';
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
    const newComment = comments[index];

    setComments(() => [...comments, { ...newComment, commment: editComment }]);
    if (isEdit && editedCommentIndex !== null) {
      // 수정 중인 댓글을 업데이트
      const updatedComments = [...comments];
      updatedComments[editedCommentIndex] = {
        ...updatedComments[editedCommentIndex],
        comment: editComment
      };
      setComments(updatedComments);
      setEditedCommentIndex(null);
      const commentObject = {
        updateData: {
          comment: updatedComments
        },
        paramId
      };
      upsertMutation.mutate(commentObject);

      // 수정이 완료되면 인덱스 초기화
    }
  };
  console.log(comments);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

  return (
    <Container>
      <Form onSubmit={updateComment}>
        <CommentInput
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <label>
          <AnonInput
            type="checkbox"
            checked={anon}
            onChange={() => setAnon(!anon)}
          />
          익명
        </label>
        <button type="submit">추가</button>
      </Form>

      {comments?.map((comment, index) => {
        const parseTime = parseDate(comment.time);
        return (
          <CommentContainer key={index}>
            <div>
              <LeftSide>
                <p>{comment.anon ? '익명의 작업자' : comment.nickname}</p>
                <p>{parseTime}</p>
                {/* {comment.comment_user === profile![0].id ? (
                  isEdit && editedCommentIndex === index ? (
                    <p onClick={() => updateCommentDetail(index)}>수정완료</p>
                  ) : (
                    <>
                      <p onClick={() => startEditComment(index)}>수정</p>
                      <p>|</p>
                      <p>삭제 </p>
                    </>
                  )
                ) : (
                  <></>
                )} */}
                {isEdit && editedCommentIndex === index ? (
                  <p onClick={() => updateCommentDetail(index)}>수정완료</p>
                ) : (
                  <>
                    <p onClick={() => startEditComment(index)}>수정</p>
                    <p>|</p>
                    <p>삭제 </p>
                  </>
                )}
              </LeftSide>
              {isEdit && editedCommentIndex === index ? (
                <input
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
              ) : (
                <p>{comment.comment}</p>
              )}
            </div>
            <button>신고</button>
          </CommentContainer>
        );
      })}
    </Container>
  );
};
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
  margin-top: 6px;
  margin-bottom: 6px;
`;
const CommentInput = styled.input`
  width: 80%;
  height: 38px;
`;
const AnonInput = styled.input`
  height: 28px;
`;
const CommentContainer = styled.div`
  margin-top: 10px;

  width: 100%;
  height: 94px;
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
`;
const LeftSide = styled.div`
  display: flex;
  gap: 20px;
  & p {
    margin-bottom: 20px;
  }
`;

export default React.memo(Comment);
