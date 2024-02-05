import Profile from '../../components/mypage/Profile/Profile';
import { MyPageContainer } from '../../styles/mypageStyle/MyPageStyle';
import Tabs from '../../components/mypage/Tabs/Tabs';
import QnAFrom from '../../components/mypage/Profile/QnAFrom';
import { useAppSelector } from '../../redux/reduxHooks/reduxBase';

const MyPage = () => {
  const { isOpen } = useAppSelector((state) => state.openForm);

  return (
    <>
      <MyPageContainer>
        <Profile />
        <Tabs />
      </MyPageContainer>
      {isOpen && <QnAFrom />}
    </>
  );
};

export default MyPage;
