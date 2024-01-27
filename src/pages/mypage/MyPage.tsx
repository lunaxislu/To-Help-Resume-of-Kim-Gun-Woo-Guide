import Profile from '../../components/mypage/Profile';
import { MyPageContainer } from '../../styles/mypageStyle/MyPageStyle';
import Tabs from '../../components/mypage/Tabs/Tabs';

const MyPage = () => {
  return (
    <MyPageContainer>
      <Profile />
      <Tabs />
    </MyPageContainer>
  );
};

export default MyPage;
