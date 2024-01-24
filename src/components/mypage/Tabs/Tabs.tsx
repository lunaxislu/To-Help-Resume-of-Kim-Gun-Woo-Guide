import { useState } from 'react';
import { StTab, StTabsContainer } from '../../../styles/mypageStyle/TabsStyle';
import MyPageItemList from '../Items/MyPageItemList';
import MyPageCommunityPostList from '../Commnity/MyPageCommunityPostList';

const Tabs = () => {
  const tabMenuArray = [
    '내 물품',
    '구매한 물품',
    '찜한 물품',
    '내가 쓴 글',
    '추천한 글'
  ];
  const [toggle, setToggle] = useState<number | null>(0);
  const clickToggleTab = (index: number) => {
    setToggle(index);
  };

  console.log(toggle);

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

      {toggle === 0 || toggle === 1 || toggle === 2 ? (
        <MyPageItemList activeTab={toggle} />
      ) : (
        ''
      )}
      {toggle === 3 || toggle === 4 ? (
        <MyPageCommunityPostList activeTab={toggle} />
      ) : (
        ''
      )}
    </>
  );
};

export default Tabs;
