import React, { MouseEvent, SetStateAction } from 'react';
import * as St from '../../pages/productsDetail/style';
import styled from 'styled-components';
import { Participants, RoomType } from '../chat/types';
import { CustomUser } from '../../pages/productsDetail/types';

const StSellTitle = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-block: 1rem;
  color: white;
  letter-spacing: 0.1rem;
`;

type ChatListProps = {
  createdChatList: RoomType[];
  setShowChatList: React.Dispatch<SetStateAction<boolean>>;
  curUser: CustomUser | null;
  setBuyerChatId: React.Dispatch<SetStateAction<string>>;
  selectedUser: string;
  setSelectedUser: React.Dispatch<SetStateAction<string>>;
  handleSellComplete: any;
};

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

  return (
    <>
      <St.StSelectChatBg onClick={() => setShowChatList(false)}>
        <St.StChatList onClick={(e) => e.stopPropagation()}>
          <StSellTitle>구매한 사용자를 선택해주세요</StSellTitle>
          {!createdChatList ||
            (createdChatList.length === 0 && (
              <h1
                style={{
                  textAlign: 'center',
                  height: '100%'
                }}
              >
                채팅 내역이 없습니다
              </h1>
            ))}
          {createdChatList &&
            createdChatList?.map((room: RoomType) => {
              return (
                <>
                  <St.StChatListItem
                    key={room.id}
                    id={
                      room.participants.filter(
                        (part: Partial<Participants>) => {
                          return part.user_id !== curUser?.id;
                        }
                      )[0].user_id
                    }
                    onClick={(e) => {
                      handleSetBuyer(e);
                      handleSelectedUser(e);
                    }}
                  >
                    <div>
                      {
                        room.participants.filter(
                          (part: Partial<Participants>) => {
                            return part.user_id !== curUser?.id;
                          }
                        )[0].user_name
                      }
                    </div>
                  </St.StChatListItem>
                  <St.StConfirmSellBtn onClick={handleSellComplete}>
                    <span>{selectedUser}</span> 님에게 판매 완료하기
                  </St.StConfirmSellBtn>
                </>
              );
            })}
        </St.StChatList>
      </St.StSelectChatBg>
    </>
  );
};

export default ProductChatList;
