import React, { useEffect, useState } from 'react';
import {
  StButtonWrapper,
  StEditProfileButton,
  StEmail,
  StNickname,
  StNicknameInput,
  StProfileContainer,
  StProfileImage,
  StProfileWrapper,
  StUsername
} from '../../styles/mypageStyle/ProfileStyle';
import { supabase } from '../../api/supabase/supabaseClient';

import { useQuery } from 'react-query';

interface User {
  id: string;
  username: string;
  nickname: string;
  avatar_url: string;
  email: string;
}

const Profile = () => {
  const [userId, setUserId] = useState<string>();
  const [userData, setUserData] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userNickname, setUserNickname] = useState<string | undefined>();
  const [profileImage, setProfileImage] = useState<string | undefined>();

  // 현재 로그인한 사용자의 정보 가져오기
  const getCurrentUser = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    setUserId(user?.id);
  };

  // profile 테이블에서 현재 로그인한 사용자 id 필터
  const getUserInformation = async () => {
    let { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId);

    if (profiles && profiles.length > 0) {
      setUserData(profiles);
    }
  };

  // profile 수정 버튼
  const editProfileHandler = () => {
    setIsEditing(true);
  };

  // profile 수정 취소
  const cancelEditHandler = () => {
    setIsEditing(false);
  };

  // nickname input onChange
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setUserNickname(e.target.value);
  };

  // profile 저장
  const saveProfileHandler = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ nickname: userNickname })
      .eq('id', userId);

    setIsEditing(false);
  };

  // user profile image upload
  const uploadProfileImageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      const { data, error } = await supabase.storage
        .from('profiles')
        .upload(userId + '/' + userId, file, {
          upsert: true
        });
      console.log(data);
    } else {
      console.error('no file');
    }
  };

  // user image save
  const getImageUrlHandler = async () => {
    const { data } = await supabase.storage
      .from('profiles')
      .getPublicUrl(userId + '/' + userId);

    setProfileImage(data.publicUrl);
  };

  getImageUrlHandler();

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (userId) {
      getUserInformation();
    }
  }, [userId]);

  return (
    <StProfileContainer>
      {userData.map((user) => {
        return (
          <>
            <StProfileImage src={profileImage} alt="" />
            <input type="file" onChange={(e) => uploadProfileImageHandler(e)} />

            <StProfileWrapper key={user.id}>
              <StButtonWrapper>
                {isEditing ? (
                  <StNicknameInput
                    defaultValue={user.nickname}
                    onChange={onChangeNickname}
                  />
                ) : (
                  <StNickname>{user.nickname}</StNickname>
                )}

                {isEditing ? (
                  <>
                    <button onClick={cancelEditHandler}>취소</button>
                    <button onClick={saveProfileHandler}>저장</button>
                  </>
                ) : (
                  <StEditProfileButton onClick={editProfileHandler}>
                    프로필 수정
                  </StEditProfileButton>
                )}
              </StButtonWrapper>

              <StUsername>{user.username}</StUsername>
              <StEmail>{user.email}</StEmail>
            </StProfileWrapper>
          </>
        );
      })}
    </StProfileContainer>
  );
};

export default Profile;
