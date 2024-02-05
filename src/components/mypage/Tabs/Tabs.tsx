import {
  useAppDispatch,
  useAppSelector
} from '../../../redux/reduxHooks/reduxBase';
import { setSelectedTab } from '../../../redux/modules/tabSlice';
import { StTab, StTabsContainer } from '../../../styles/mypageStyle/TabsStyle';

const Tabs2 = () => {
  const tabMenu = [
    '내 물품',
    '구매한 물품',
    '찜한 물품',
    '내가 쓴 글',
    '추천한 글'
  ];

  const dispatch = useAppDispatch();
  const { selectedTab } = useAppSelector((state) => state.tab);
  const clickSelectTab = (tab: string) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <StTabsContainer>
      {tabMenu.map((tab, index) => (
        <StTab
          key={tab}
          onClick={() => clickSelectTab(tab)}
          activeTab={selectedTab === tab ? true : false}
        >
          {tab}
        </StTab>
      ))}
    </StTabsContainer>
  );
};

export default Tabs2;
