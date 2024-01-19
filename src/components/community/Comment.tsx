import React, { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import {
  fetchDetailPost,
  updateCommentMutation
} from '../../pages/community/commuQuery';
import {
  CommentProps,
  Comments,
  ProfileObject
} from '../../pages/community/model';
import parseDate from '../../util/getDate';
const Comment: React.FC<CommentProps> = ({ userId, paramId }) => {
  const [profile, setProfile] = useState<ProfileObject[]>([]);
  const [comment, setComment] = useState('');
  const [anon, setAnon] = useState(false);

  const [comments, setComments] = useState<Comments>([]);
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
  useEffect(() => {
    if (!isLoading && posts) {
      setComments(posts[0].comment);
      console.log(comment);
    }
  }, [isLoading, posts]);
  const upsertMutation = useMutation(updateCommentMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', paramId]);
      setAnon(false);
      setComment('');
    }
  });
  console.log(userId);
  const updateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComment = {
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
        {/* <p>{`${comments.length}개의 댓글`}</p> */}
      </Form>

      {comments?.map((comment) => {
        const parseTime = parseDate(comment.time);
        return (
          <CommentContainer>
            <div>
              <LeftSide>
                <p>{comment.anon ? '익명의 작업자' : comment.nickname}</p>
                <p>{parseTime}</p>
              </LeftSide>
              <p>{comment.comment}</p>
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
export default Comment;
