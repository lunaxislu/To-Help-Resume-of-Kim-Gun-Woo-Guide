import React, { MouseEvent, SetStateAction } from 'react';
import { DeleteAllNotiProps } from '../SideBarFn';
import {
  StNotiContainer,
  StNotiItem,
  StNoticeButtonContainer,
  StNoticeDeleteBtn
} from '../../../styles/headerStyle/HeaderStyle';
type NotiRenderProps = {
  notification: any[];
  showNoti: boolean;
  clickNoti: (e: MouseEvent<HTMLDivElement>) => void;
  sender: any[];
  deleteAllNotification: ({ setNotification }: DeleteAllNotiProps) => void;
  setNotification: React.Dispatch<SetStateAction<any[]>>;
  setShowNoti: React.Dispatch<SetStateAction<boolean>>;
  setIsShow: React.Dispatch<SetStateAction<boolean>>;
};

const NotiRender = ({
  notification,
  showNoti,
  clickNoti,
  sender,
  deleteAllNotification,
  setNotification,
  setShowNoti,
  setIsShow
}: NotiRenderProps) => {
  return (
    <>
      {notification.length > 0 && showNoti && (
        <>
          <StNotiContainer>
            {notification?.map((noti, i) => {
              return (
                <StNotiItem
                  id={noti.id}
                  onClick={(e) => {
                    clickNoti(e);
                    e.stopPropagation();
                  }}
                  key={noti.id}
                >
                  {sender[i] &&
                    `${
                      sender[i][0]?.nickname
                        ? sender[i][0]?.nickname
                        : sender[i][0]?.username
                    }님의 메세지가 왔습니다`}
                </StNotiItem>
              );
            })}
            <StNoticeButtonContainer>
              <StNoticeDeleteBtn
                onClick={() => deleteAllNotification({ setNotification })}
              >
                알림 지우기
              </StNoticeDeleteBtn>
            </StNoticeButtonContainer>
          </StNotiContainer>
        </>
      )}
      {notification.length === 0 && showNoti && (
        <StNotiContainer>
          <StNotiItem
            onClick={(e) => {
              setShowNoti(false);
              setIsShow(false);
              e.stopPropagation();
            }}
          >
            알림이 없습니다
          </StNotiItem>
          <StNoticeButtonContainer>
            <StNoticeDeleteBtn
              onClick={() => deleteAllNotification({ setNotification })}
            >
              알림 지우기
            </StNoticeDeleteBtn>
          </StNoticeButtonContainer>
        </StNotiContainer>
      )}
    </>
  );
};

export default NotiRender;
