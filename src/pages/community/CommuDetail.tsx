import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import * as St from '../../styles/community/CommunityDetailStyle';

import { supabase } from '../../api/supabase/supabaseClient';
import Comment from '../../components/community/Comment';
import SkeletonCommunityDetail from '../../components/skeleton/SkeletonCommunityDetail';
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
  const [editToolOpen, setEditToolOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();
        setUserId(user!.id);
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
      setEditToolOpen(!editToolOpen);
      navigate('/community');
    }
  };
  if (isLoading) {
    return <SkeletonCommunityDetail />;
    // return <></>;
  }

  if (isError) {
    return <div>Error loading posts</div>;
  }
  const handleOnClickBack = () => {
    const confirm = window.confirm(
      '수정한 글이 적용되지 않습니다. 그래도 페이지를 떠나시겠습니까?'
    );
    if (confirm) {
      navigate(-1);
    }
  };

  return (
    <St.Container>
      {isEditState ? (
        <St.WriteWrap>
          <St.TitleTopper>
            <St.BackBtnBox>
              <St.BackIcon onClick={handleOnClickBack} />
            </St.BackBtnBox>

            <h1>게시글 수정</h1>
            <p>*필수항목</p>
          </St.TitleTopper>

          <WriteLayout
            profile={undefined}
            isEdit={true}
            paramId={param.id}
            setIsEditState={setIsEditState}
          />
        </St.WriteWrap>
      ) : (
        <St.ContentsContainer>
          <St.DetailBody>
            {posts?.map((post) => {
              return (
                <div key={post.post_id}>
                  <div>
                    <St.MainTopper>
                      <St.TitleCategory>
                        <St.BackBtnBox>
                          <St.BackIcon onClick={() => navigate(-1)} />
                        </St.BackBtnBox>
                        <h1>{post.title}</h1>
                        <St.Category>{post.category}</St.Category>
                      </St.TitleCategory>
                      <St.Dots onClick={() => setEditToolOpen(!editToolOpen)} />
                      {posts![0].post_user === userId ? (
                        ''
                      ) : (
                        <St.ReportArea>
                          <St.AlertIcon />
                          <p>신고하기</p>
                        </St.ReportArea>
                      )}
                    </St.MainTopper>

                    <St.SubTopper>
                      <St.TitleCategory>
                        <St.NameP>
                          {!!post.anon ? '익명의 작업자' : post.nickname}
                        </St.NameP>
                        <St.TimeP>{parseDate(post.created_at)}</St.TimeP>
                      </St.TitleCategory>

                      {editToolOpen && (
                        <St.EditDropdown>
                          {posts[0].post_user === userId ? (
                            <>
                              <St.DropdownItem
                                onClick={() => {
                                  setIsEditState(true);
                                  setEditToolOpen(!editToolOpen);
                                }}
                              >
                                수정하기
                              </St.DropdownItem>
                              <St.DropdownItem onClick={deletePost}>
                                삭제하기
                              </St.DropdownItem>
                            </>
                          ) : (
                            <St.DropdownItem>신고하기</St.DropdownItem>
                          )}
                        </St.EditDropdown>
                      )}
                      <St.FeatureArea>
                        {posts![0].post_user === userId ? (
                          <St.IconContainer>
                            <St.PenIcon />
                            <St.BtnStyle
                              onClick={() => {
                                setIsEditState(true);
                              }}
                            >
                              수정
                            </St.BtnStyle>
                            <St.TrachIcon />
                            <St.BtnStyle onClick={deletePost}>삭제</St.BtnStyle>
                          </St.IconContainer>
                        ) : (
                          ''
                        )}
                      </St.FeatureArea>
                    </St.SubTopper>
                  </div>{' '}
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
                </div>
              );
            })}{' '}
          </St.DetailBody>
          <St.NoticeLike>글이 마음에 든다면 추천을 눌러보세요!</St.NoticeLike>

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
