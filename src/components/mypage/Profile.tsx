import React, { useEffect, useRef, useState } from 'react';
import {
  StContent,
  StFileUploadInput,
  StNicknameInput,
  StProfileButton,
  StProfileButtonContainer,
  StProfileButtonWrapper,
  StProfileButtons,
  StProfileContainer,
  StProfileContentsContainer,
  StProfileImage,
  StProfileImageWrapper,
  StProfileSaveButton
} from '../../styles/mypageStyle/ProfileStyle';
import { supabase } from '../../api/supabase/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getUserProfile,
  updateUserImage,
  updateUserNickname
} from '../../api/supabase/profile';
import { userId } from '../../util/getUserId';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userNickname, setUserNickname] = useState<string | undefined>();
  const [profileImage, setProfileImage] = useState<string | null>();
  const [imagePath, setImagePath] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserProfile(userId)
  });

  console.log(user);
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
    setUserNickname(e.target.value);
  };

  // 사진 업로드 버튼 클릭
  const clickUploadProfileImage = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const { mutate: updateNickname } = useMutation(updateUserNickname, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    }
  });

  const { mutate: updateProfileImage } = useMutation(updateUserImage, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
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

  return (
    <>
      <StProfileButtonContainer>
        {isEditing ? (
          <StProfileButtonWrapper>
            <StProfileButtons onClick={cancelEditHandler}>
              취소
            </StProfileButtons>
            <StProfileSaveButton onClick={clickUpdateProfile}>
              저장
            </StProfileSaveButton>
          </StProfileButtonWrapper>
        ) : (
          <StProfileButtons onClick={editProfileHandler}>
            <img src="/assets/pen.svg" alt="" />
            프로필 수정하기
          </StProfileButtons>
        )}
      </StProfileButtonContainer>

      {user?.map((user) => {
        return (
          <StProfileContainer key={user.id}>
            <StProfileImageWrapper>
              <StProfileImage
                src={!profileImage ? user.avatar_url : profileImage}
                alt=""
              />
              <StFileUploadInput
                type="file"
                ref={fileInput}
                onChange={(e) => uploadProfileImage(e)}
              />
              {isEditing ? (
                <StProfileButton onClick={clickUploadProfileImage}>
                  사진업로드
                </StProfileButton>
              ) : (
                ''
              )}
            </StProfileImageWrapper>

            <StProfileContentsContainer key={user.id}>
              <StContent>닉네임</StContent>
              {isEditing ? (
                <StNicknameInput
                  defaultValue={user.nickname}
                  onChange={onChangeNickname}
                />
              ) : (
                <StContent>{user.nickname}</StContent>
              )}

              <StContent>이름</StContent>
              <StContent>{user.username}</StContent>

              <StContent>이메일</StContent>
              <StContent>{user.email}</StContent>
            </StProfileContentsContainer>
          </StProfileContainer>
        );
      })}
    </>
  );
};

export default Profile;
