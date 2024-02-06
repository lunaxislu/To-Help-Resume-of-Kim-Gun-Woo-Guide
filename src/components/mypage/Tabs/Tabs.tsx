import {
  useAppDispatch,
  useAppSelector
} from '../../../redux/reduxHooks/reduxBase';
import { setSelectedTab } from '../../../redux/modules/tabSlice';
import { StTab, StTabsContainer } from '../../../styles/mypageStyle/TabsStyle';
import { useEffect } from 'react';

const Tabs = () => {
  const tabMenu = [
    '내 물품',
    '구매한 물품',
    '찜한 물품',
    '내가 쓴 글',
    '추천한 글'
  ];

  const { selectedTab } = useAppSelector((state) => state.tab);
  const dispatch = useAppDispatch();

  const clickSelectTab = (tab: string) => {
    dispatch(setSelectedTab(tab));
  };
  useEffect(() => {
    clickSelectTab('내 물품');
  }, []);

  return (
    <StTabsContainer>
      {tabMenu.map((tab) => (
        <StTab
          key={tab}
          onClick={() => clickSelectTab(tab)}
          $activetab={selectedTab === tab ? true : false}
        >
          {tab}
        </StTab>
      ))}
    </StTabsContainer>
  );
};

export default Tabs;
