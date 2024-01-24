import { useState } from 'react';
import { StTab, StTabsContainer } from '../../../styles/mypageStyle/TabsStyle';
import MyPageItemList from '../MyPageItemList';
import MyPageCommunityPostList from '../MyPageCommunityPostList';

const Tabs = () => {
  const tabMenuArray = [
    '내 물품',
    '구매한 물품',
    '찜한 물품',
    '내가 쓴 글',
    '추천한 글'
  ];
  const [toggle, setToggle] = useState<number | null>(1);
  const clickToggleTab = (index: number) => {
    setToggle(index);
  };

  return (
    <>
      <StTabsContainer>
        {tabMenuArray.map((menu, index) => {
          return (
            <StTab
              key={index}
              onClick={() => clickToggleTab(index)}
              active={toggle === index}
            >
              {menu}
            </StTab>
          );
        })}
      </StTabsContainer>

      {toggle === 1 || toggle === 2 || toggle === 3 ? (
        <MyPageItemList activeTab={toggle} />
      ) : (
        ''
      )}

      {toggle === 4 || toggle === 5 ? (
        <MyPageCommunityPostList activeTab={toggle} />
      ) : (
        ''
      )}
    </>
  );
};

export default Tabs;
