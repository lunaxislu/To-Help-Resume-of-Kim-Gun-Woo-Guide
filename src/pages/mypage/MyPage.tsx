import Profile from '../../components/mypage/Profile/Profile';
import { MyPageContainer } from '../../styles/mypageStyle/MyPageStyle';
import QnAFrom from '../../components/mypage/Profile/QnAFrom';
import { useAppSelector } from '../../redux/reduxHooks/reduxBase';
import MyPageItemList from '../../components/mypage/Items/MyPageItemList';
import Tabs from '../../components/mypage/Tabs/Tabs';
import MyPageCommunityPostList from '../../components/mypage/Commnity/MyPageCommunityPostList';

const MyPage = () => {
  const { isOpen } = useAppSelector((state) => state.openForm);
  const { selectedTab } = useAppSelector((state) => state.tab);

  return (
    <>
      <MyPageContainer>
        <Profile />
        <Tabs />
        {selectedTab.includes('물품') && <MyPageItemList />}
        {selectedTab.includes('글') && <MyPageCommunityPostList />}
      </MyPageContainer>
      {isOpen && <QnAFrom />}
    </>
  );
};

export default MyPage;
