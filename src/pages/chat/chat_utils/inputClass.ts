import { User } from '@supabase/supabase-js';
import { ChangeEvent, RefObject, SetStateAction } from 'react';
import { UtilForChat } from './functions';

export class InputHandler {
  // 채팅 인풋을 받아 state에 업뎃
  handleUserInput = async (
    e: ChangeEvent<HTMLTextAreaElement>,
    setChatInput: React.Dispatch<SetStateAction<string>>
  ) => {
    const { name, value } = e.target;
    console.log(value, 'in InputHandler');

    name === 'chat' && setChatInput(value);
  };

  // 줄바꿈인지 제출인지 판단하는 함수
  isPressEnter = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    formRef: RefObject<HTMLFormElement>,
    curUser: User | null | undefined,
    clicked: string | undefined,
    chatInput: string,
    setChatInput: React.Dispatch<SetStateAction<string>>,
    setImages: React.Dispatch<SetStateAction<any>>,
    images: (string | undefined)[],
    setShowFileInput: React.Dispatch<SetStateAction<boolean>>
  ) => {
    const util = new UtilForChat();
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        console.log(chatInput, 'in pressEnter');
        // 폼 제출
        const formElement = formRef.current;
        if (formElement) {
          util.sendMessage(e, curUser, clicked, chatInput, images).then(() => {
            setImages([]);
            setShowFileInput(false);
            setChatInput('');
          });
        }
      }
    }
  };
}
