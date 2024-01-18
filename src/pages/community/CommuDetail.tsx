import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import WriteLayout from './WriteLayout';
import { deletePostMutation, fetchDetailPost } from './commuQuery';
import { FilesObject } from './model';
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const CommuDetail: React.FC = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [isEditState, setIsEditState] = useState(false);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        setUserId(user!.id);
        console.log(userId);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  const deleteMutation = useMutation(deletePostMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    isError
  } = useQuery(['post', param.id], () => fetchDetailPost(param.id));
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }
  console.log('detail이에요');
  const deletePost = async () => {
    if (window.confirm(`정말로"${posts![0].title}" 글을 삭제하시겠습니까?`)) {
      deleteMutation.mutate(param.id);
      navigate('/community');
    }
  };

  return (
    <Container>
      {isEditState ? (
        <WriteWrap>
          <h1>게시글 수정</h1>
          <WriteLayout
            profile={undefined}
            isEdit={true}
            paramId={param.id}
            setIsEditState={setIsEditState}
          />
        </WriteWrap>
      ) : (
        <ContentsContainer>
          {posts![0].post_user === userId ? (
            <>
              <button
                onClick={() => {
                  setIsEditState(true);
                }}
              >
                수정
              </button>
              <button onClick={deletePost}>삭제</button>
            </>
          ) : (
            ''
          )}

          {posts?.map((post) => {
            return (
              <div key={post.post_id}>
                <Topper>
                  <TopperLeft>
                    <h1>{post.title}</h1>
                    <p>{!!post.anon ? '익명의 작업자' : post.nickname}</p>
                  </TopperLeft>

                  <TopperRight>
                    <p>{post.created_at}</p>
                    <IconContainer>
                      <Icon src="/assets/comment.png" />
                      <p>0</p>
                      <Icon src="/assets/heart.png" />
                      <p>0</p>
                    </IconContainer>
                  </TopperRight>
                </Topper>{' '}
                <Category>{post.category}</Category>
                <Content>{parse(post.content)}</Content>
                {post.files && post.files.length > 0 && (
                  <div>
                    {post.files.map((file: FilesObject, index: number) => (
                      <a
                        key={index}
                        href={file.url[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </ContentsContainer>
      )}

      <form>
        <input />
        <button>댓글 등록하기</button>
      </form>
    </Container>
  );
};
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  line-height: 30px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
  & p {
    display: flex;
  }
`;
const ContentsContainer = styled.div`
  width: 80%;
  max-width: 1116px;
  min-height: 600px;
`;
const WriteWrap = styled.div`
  width: 80%;
  max-width: 906px;

  & h1 {
    font-size: 30px;
    margin-top: 50px;
    text-align: center;
    margin-bottom: 20px;
  }
`;
const Icon = styled.img`
  width: 20px;
`;
const Topper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1116px;
  margin-bottom: 10px;
`;
const TopperRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TopperLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & h1 {
    font-size: 20px;
    font-weight: bold;
  }
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: end;
`;
const Category = styled.p`
  background-color: #636363;
  color: white;
  width: fit-content;
  padding: 12px;
  border-radius: 6px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 906px;
  width: 80%;
  & select {
    width: 100px;
    height: 40px;
  }
  & button {
    width: 100px;
    height: 40px;
  }
  & h1 {
    font-size: 30px;
    margin-top: 50px;
    text-align: center;
  }
`;
const CategoryContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const CheckBoxInput = styled.input`
  height: 20px;
  width: 20px;
`;
const TitleInput = styled.input`
  height: 54px;
  width: 100%;
  background-color: #f3f3f3;
  border: none;
  border-radius: 5px;
  padding-left: 16px;
  &::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
  }
`;

const FileUploader = styled.label`
  background-color: #f3f3f3;
  border-radius: 5px;
  height: 54px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  & input {
    display: none;
  }
`;
const QuillEditor = styled(ReactQuill)`
  background-color: #f3f3f3;
  border-radius: 5px;

  .ql-container {
    min-height: 600px;
    border: none;
    display: flex;
  }
  .ql-toolbar {
    border: none;
  }
  .ql-editor strong {
    font-weight: bold;
  }
  .ql-editor em {
    font-style: italic;
  }
  .ql-editor ::placeholder {
    font-style: normal;
  }
  .ql-editor p {
    display: flex;
    line-height: 30px;
    font-size: 16px;
  }
`;
export default CommuDetail;
