import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import * as St from '../../styles/community/CommunityDetailStyle';

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
    <St.Container>
      {isEditState ? (
        <St.WriteWrap>
          <h1>게시글 수정</h1>
          <WriteLayout
            profile={undefined}
            isEdit={true}
            paramId={param.id}
            setIsEditState={setIsEditState}
          />
        </St.WriteWrap>
      ) : (
        <St.ContentsContainer>
          <div>
            {posts?.map((post) => {
              return (
                <div key={post.post_id}>
                  <St.Topper>
                    <St.TopperLeft>
                      <h1>{post.title}</h1>
                      <p>{!!post.anon ? '익명의 작업자' : post.nickname}</p>
                    </St.TopperLeft>

                    <St.TopperRight>
                      <p>{parseDate(post.created_at)}</p>
                    </St.TopperRight>
                  </St.Topper>{' '}
                  <St.Category>{post.category}</St.Category>
                  <St.Content>{parse(post.content)}</St.Content>
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
                  <St.FeatureArea>
                    {posts![0].post_user === userId ? (
                      <div>
                        <St.BtnStyle
                          onClick={() => {
                            setIsEditState(true);
                          }}
                        >
                          수정
                        </St.BtnStyle>
                        <St.BtnStyle onClick={deletePost}>삭제</St.BtnStyle>
                      </div>
                    ) : (
                      ''
                    )}
                  </St.FeatureArea>
                </div>
              );
            })}{' '}
          </div>

          <div>
            <Comment
              userId={userId}
              paramId={param.id}
              likes={posts![0].likes}
            />
          </div>
        </St.ContentsContainer>
      )}
    </St.Container>
  );
};

export default CommuDetail;
