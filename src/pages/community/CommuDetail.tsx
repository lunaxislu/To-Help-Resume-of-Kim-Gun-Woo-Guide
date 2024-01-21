import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { supabase } from '../../api/supabase/supabaseClient';
import Comment from '../../components/community/Comment';
import parseDate from '../../util/getDate';
import WriteLayout from './WriteLayout';
import { deletePostMutation, fetchDetailPost } from './commuQuery';
import { FilesObject } from './model';
// Quill.register('modules/imageActions', ImageActions);
// Quill.register('modules/imageFormats', ImageFormats);

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

  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    isError
  } = useQuery(['posts', param.id], () => fetchDetailPost(param.id));
  const deleteMutation = useMutation(deletePostMutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    }
  });
  const deletePost = async () => {
    if (window.confirm(`정말로"${posts![0].title}" 글을 삭제하시겠습니까?`)) {
      deleteMutation.mutate(param.id);
      navigate('/community');
    }
  };
  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }

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
          <div>
            {posts?.map((post) => {
              return (
                <div key={post.post_id}>
                  <Topper>
                    <TopperLeft>
                      <h1>{post.title}</h1>
                      <p>{!!post.anon ? '익명의 작업자' : post.nickname}</p>
                    </TopperLeft>

                    <TopperRight>
                      <p>{parseDate(post.created_at)}</p>
                    </TopperRight>
                  </Topper>{' '}
                  <Category>{post.category}</Category>
                  <Content>{parse(post.content)}</Content>
                  {post.files && post.files.length > 0 && (
                    <div>
                      {post.files.map((file: FilesObject, index: number) => (
                        <>
                          <a
                            key={index}
                            href={file.url[index]}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.name}
                          </a>
                          <br />
                          <br />
                        </>
                      ))}
                    </div>
                  )}{' '}
                  <FeatureArea>
                    {posts![0].post_user === userId ? (
                      <div>
                        <BtnStyle
                          onClick={() => {
                            setIsEditState(true);
                          }}
                        >
                          수정
                        </BtnStyle>
                        <BtnStyle onClick={deletePost}>삭제</BtnStyle>
                      </div>
                    ) : (
                      ''
                    )}
                  </FeatureArea>
                </div>
              );
            })}{' '}
          </div>

          <div>
            <Comment userId={userId} paramId={param.id} />
          </div>
        </ContentsContainer>
      )}
    </Container>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  line-height: 3rem;
  min-height: 60rem;
  color: var(--8-gray);
  font-size: var(--fontSize-H4);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--12-gray);
  margin-bottom: 5rem;
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
const FeatureArea = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
const ContentsContainer = styled.div`
  width: 80%;
  max-width: 111.6rem;
  min-height: 60rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const WriteWrap = styled.div`
  width: 80%;
  max-width: 100.6rem;

  & h1 {
    font-size: 30px;
    margin-top: 50px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--4-gray);
    margin-bottom: 2rem;
  }
`;
const BtnStyle = styled.button`
  height: 3rem;
  width: 4rem;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--5-gray);
  margin-right: 1rem;
  font-weight: var(--fontWeight-semiBold);
`;
const Topper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 111.6rem;
  margin-bottom: 1rem;
`;
const TopperRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: var(--fontSize-H5);
  color: var(--8-gray);
`;
const TopperLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & h1 {
    font-size: var(--fontSize-H3);
    font-weight: var(--fontWeight-semiBold);
  }
  & p {
    font-size: var(--fontSize-H5);
    color: var(--4-gray);
  }
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: end;
  font-size: var(--fontSize-H5);
  align-items: center;
`;
const Category = styled.p`
  background-color: var(--4-gray);
  color: var(--12-gray);
  width: fit-content;
  padding: 1.2rem;
  border-radius: 0.6rem;
  font-size: var(--fontSize-H5);
`;

export default CommuDetail;
