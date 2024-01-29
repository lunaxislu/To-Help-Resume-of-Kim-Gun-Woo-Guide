import React, { useEffect, useRef, useState } from 'react';
import {
  Pen,
  StButtonCotainer,
  StMobileCancelButton,
  StMobileEditButton,
  StMobileNav,
  StMobileSaveButton,
  StNicknameAndButton,
  StProfileButtonWrapper,
  StProfileContainer,
  StProfileContent,
  StProfileContentContainer,
  StProfileContentWrapper,
  StProfileEditButtonWrapper,
  StProfileImageWrapper,
  StSaveButton
} from '../../styles/mypageStyle/ProfileStyle';
import { supabase } from '../../api/supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getUserProfile,
  updateUserImage,
  updateUserNickname
} from '../../api/supabase/profile';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/reduxHooks/reduxBase';
import { setSuccessLogout } from '../../redux/modules/authSlice';

interface User {
  username: string;
}

const Profile = () => {
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [userNickname, setUserNickname] = useState<string | undefined>();
  const [profileImage, setProfileImage] = useState<string | null>();
  const [imagePath, setImagePath] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<User | boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const queryClient = useQueryClient();

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: () => getUserProfile(userId)
  });

  // profile 수정 버튼
  const clickEditHandler = () => {
    setIsEditing(true);
  };

  // profile 수정 취소
  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  // nickname input onChange
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };

  // auth에 있는 avatar_url 변경
  const updateAuthAvatarHandler = async () => {
    const { data, error } = await supabase.auth.updateUser({
      data: { avatar_url: profileImage }
    });
  };

  // 사진 업로드 버튼 클릭
  const clickUploadProfileImage = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const { mutate: updateNickname } = useMutation(updateUserNickname, {
    onSuccess: () => {
      queryClient.invalidateQueries('userData');
    }
  });

  const { mutate: updateProfileImage } = useMutation(updateUserImage, {
    onSuccess: () => {
      queryClient.invalidateQueries('userData');
    }
  });

  const clickUpdateProfile = () => {
    if (userNickname && userId) {
      updateNickname({
        nickname: userNickname,
        id: userId
      });
    }

    if (profileImage && userId) {
      updateProfileImage({
        avatar_url: profileImage,
        id: userId
      });
    }
    updateAuthAvatarHandler();
    setIsEditing(false);
  };

  const getUrl = async () => {
    if (imagePath !== undefined) {
      const { data } = await supabase.storage
        .from('profiles')
        .getPublicUrl(imagePath);
      setProfileImage(data.publicUrl);
    }
  };

  useEffect(() => {
    getUrl();
  }, [imagePath]);

  const uploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      const { data, error } = await supabase.storage
        .from('profiles')
        .upload(userId + '/' + uuidv4(), file, {
          upsert: true
        });

      if (data) {
        setImagePath(data?.path);
      } else {
        console.log(error);
      }
    }
  };

  // 로그아웃 버튼
  const handleLogOutButtonClick = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      // 로그아웃이 성공 시 로그아웃 상태로 업데이트하기
      dispatch(setSuccessLogout());
      // 사용자 정보 초기화
      setUser(false);
      setAvatarUrl(undefined);
      // 이락균이 추가함 //
      navigate('/');
    }
    if (error) {
      console.log(error);
    } else {
      // 로그아웃이 성공 시 로그아웃 상태로 업데이트하기
      dispatch(setSuccessLogout());
      // 사용자 정보 초기화
      setUser(false);
      setAvatarUrl(undefined);
    }
  };

  return (
    <StProfileContainer>
      <StMobileNav>
        <div>
          <img
            src="/assets/back.svg"
            alt="뒤로가기 아이콘"
            onClick={() => navigate(-1)}
          />
          <p>마이페이지</p>
        </div>
        {isEditing ? (
          <StProfileButtonWrapper>
            <StMobileCancelButton onClick={cancelEditHandler}>
              취소
            </StMobileCancelButton>
            <StMobileSaveButton onClick={clickUpdateProfile}>
              저장
            </StMobileSaveButton>
          </StProfileButtonWrapper>
        ) : (
          <StMobileEditButton onClick={clickEditHandler}>
            수정하기
          </StMobileEditButton>
        )}
      </StMobileNav>

      {userData?.map((user) => {
        return (
          <StProfileContentContainer key={user.id}>
            <StProfileImageWrapper>
              <img
                src={!profileImage ? user.avatar_url : profileImage}
                alt="사용자 프로필 사진"
              />
              <input
                type="file"
                ref={fileInput}
                onChange={(e) => uploadProfileImage(e)}
              />
              {isEditing ? (
                <button onClick={clickUploadProfileImage}>사진 업로드</button>
              ) : (
                ''
              )}
            </StProfileImageWrapper>

            <StProfileContentWrapper>
              <StButtonCotainer>
                <StNicknameAndButton>
                  {isEditing ? (
                    <input
                      defaultValue={
                        !user.nickname ? user.username : user.nickname
                      }
                      onChange={onChangeNickname}
                      placeholder="최대 8자"
                      maxLength={8}
                    />
                  ) : (
                    <h2>{!user.nickname ? user.username : user.nickname}</h2>
                  )}
                  {isEditing ? (
                    <StProfileButtonWrapper>
                      <button onClick={cancelEditHandler}>취소</button>
                      <StSaveButton onClick={clickUpdateProfile}>
                        저장
                      </StSaveButton>
                    </StProfileButtonWrapper>
                  ) : (
                    <StProfileEditButtonWrapper>
                      <Pen />
                      <button onClick={clickEditHandler}>수정하기</button>
                    </StProfileEditButtonWrapper>
                  )}
                </StNicknameAndButton>
                <button onClick={handleLogOutButtonClick}>로그아웃</button>
              </StButtonCotainer>

              <StProfileContent>
                <span>이름</span>
                <span>{user.username}</span>
                <span>이메일</span>
                <span>{user.email}</span>
              </StProfileContent>
            </StProfileContentWrapper>
          </StProfileContentContainer>
        );
      })}
    </StProfileContainer>
  );
};

export default Profile;
