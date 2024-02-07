import React, { MouseEvent } from 'react';
import * as St from '../../../pages/productsDetail/style';
import { ChatListProps } from './ChatListTypes';
import { Participants, RoomType } from '../../chat/types';

const ProductChatList = ({
  createdChatList,
  setShowChatList,
  curUser,
  setBuyerChatId,
  selectedUser,
  setSelectedUser,
  handleSellComplete
}: ChatListProps) => {
  // 누구한테 팔지 선택할 때 (클릭한 사용자의 uid를 받아) state에 저장
  const handleSetBuyer = (e: MouseEvent<HTMLDivElement>) => {
    const buyerChatroomId = e.currentTarget.id;
    setBuyerChatId(buyerChatroomId);
  };

  // 클릭 된 유저 이름 받아오기
  const handleSelectedUser = (e: MouseEvent<HTMLDivElement>) => {
    const selected = e.currentTarget.innerText;
    setSelectedUser(selected);
  };

  const getTargetId = (room: RoomType) => {
    const targetId = room.participants.filter((part: Partial<Participants>) => {
      return part.user_id !== curUser?.id;
    })[0].user_id;

    return targetId;
  };

  const getTargetName = (room: RoomType) => {
    const targetName = room.participants.filter(
      (part: Partial<Participants>) => {
        return part.user_id !== curUser?.id;
      }
    )[0].user_name;

    return targetName;
  };

  return (
    <>
      <St.StSelectChatBg onClick={() => setShowChatList(false)}>
        <St.StChatList onClick={(e) => e.stopPropagation()}>
          <div style={{ height: '100%', overflow: 'scoll' }}>
            <St.StSellTitle>구매한 사용자를 선택해주세요</St.StSellTitle>
            {!createdChatList ||
              (createdChatList.length === 0 && (
                <St.StNoListText>채팅 내역이 없습니다</St.StNoListText>
              ))}

            {createdChatList &&
              createdChatList?.map((room: RoomType) => {
                return (
                  <>
                    <St.StChatListItem
                      key={room.id}
                      id={getTargetId(room)}
                      onClick={(e) => {
                        handleSetBuyer(e);
                        handleSelectedUser(e);
                      }}
                    >
                      <div>{getTargetName(room)}</div>
                    </St.StChatListItem>
                  </>
                );
              })}
          </div>
          <St.StConfirmSellBtn onClick={handleSellComplete}>
            <span>{selectedUser}</span> 님에게 판매 완료하기
          </St.StConfirmSellBtn>
        </St.StChatList>
      </St.StSelectChatBg>
    </>
  );
};

export default ProductChatList;
