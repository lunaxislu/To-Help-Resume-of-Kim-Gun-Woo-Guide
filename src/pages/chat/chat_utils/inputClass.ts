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
    setImages: React.Dispatch<SetStateAction<string>>,
    images: string,
    setShowFileInput: React.Dispatch<SetStateAction<boolean>>
  ) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        // 폼 제출
        const formElement = formRef.current;
        const util = new UtilForChat();
        if (formElement) {
          util.sendMessage(
            e,
            curUser,
            clicked,
            chatInput,
            images,
            setChatInput,
            setImages,
            setShowFileInput
          );
        }
      }
    }
  };
}
