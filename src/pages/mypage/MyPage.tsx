import Profile from '../../components/mypage/Profile/Profile';
import { MyPageContainer } from '../../styles/mypageStyle/MyPageStyle';
import Tabs from '../../components/mypage/Tabs/Tabs';
import QnAFrom from '../../components/mypage/Profile/QnAFrom';

const MyPage = () => {
  return (
    <MyPageContainer>
      <Profile />
      <Tabs />
      {/* <QnAFrom /> */}
    </MyPageContainer>
  );
};

export default MyPage;
