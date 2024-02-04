import {
  StMobileBack,
  StMobileNav
} from '../../../styles/mypageStyle/ProfileMobileNavStyle';
import { useNavigate } from 'react-router';

const ProfileMobileNav = () => {
  const navigate = useNavigate();
  return (
    <StMobileNav>
      <div>
        <StMobileBack onClick={() => navigate(-1)} />
        <p>마이페이지</p>
      </div>
    </StMobileNav>
  );
};

export default ProfileMobileNav;
