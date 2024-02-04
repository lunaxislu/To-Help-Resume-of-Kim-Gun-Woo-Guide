import React from 'react';
import {
  StMobileCancelButton,
  StMobileEditButton,
  StMobileNav,
  StMobileSaveButton,
  StProfileButtonWrapper
} from '../../../styles/mypageStyle/ProfileMobileNavStyle';
import { useNavigate } from 'react-router';

const ProfileMobileNav = () => {
  const navigate = useNavigate();
  return (
    <StMobileNav>
      <div>
        <img
          src="/assets/back.svg"
          alt="뒤로가기 아이콘"
          onClick={() => navigate(-1)}
        />
        <p>마이페이지</p>
      </div>
    </StMobileNav>
  );
};

export default ProfileMobileNav;
