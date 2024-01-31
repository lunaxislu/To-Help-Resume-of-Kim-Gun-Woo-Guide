import React, {
  ChangeEvent,
  MouseEvent,
  SetStateAction,
  useRef,
  useState
} from 'react';
import * as St from '../style';
import { UtilForChat } from '../chat_utils/functions';
import { InputHandler } from '../chat_utils/inputClass';
import { User } from '@supabase/supabase-js';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { handleFileUpload } from '../../../components/imagePreviewer/ImagePreviewFn';
import ImagePreviewer from '../../../components/imagePreviewer/ImagePreviewer';

interface ChatFormProps {
  showFileInput: boolean;
  curUser: User | null | undefined;
  clicked: string | undefined;
  setShowFileInput: React.Dispatch<SetStateAction<boolean>>;
}

const StImageButton = styled(FaPlus)`
  position: absolute;
  right: 4rem;
  top: 50%;
  color: var(--opc-100);
  transform: translateY(-50%);
  cursor: pointer;

  @media screen and (max-width: 768px) {
    right: 2rem;
  }
`;

const ChatForm = ({
  showFileInput,
  curUser,
  clicked,
  setShowFileInput
}: ChatFormProps) => {
  const [chatInput, setChatInput] = useState<string>('');
  const [images, setImages] = useState<(string | undefined)[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const inputHandler = new InputHandler();

  const handleSetFileList = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urlArray = await Promise.all(await handleFileUpload(files));
      setImages(urlArray);
    }
  };

  const handleRemoveImage = (e: MouseEvent<HTMLElement>) => {
    const targetURL = e.currentTarget.id;
    const filtered = images.filter((url) => url !== targetURL);
    setImages(filtered);
  };

  return (
    <St.StChatForm ref={formRef}>
      {images && (
        <ImagePreviewer
          imageState={images}
          handleRemoveImage={handleRemoveImage}
        />
      )}
      {showFileInput && (
        <>
          <St.ImageInput
            onChange={handleSetFileList}
            placeholder="이미지 보내기"
          />
        </>
      )}
      <div style={{ display: 'flex' }}>
        <St.StChatInput
          onChange={(e) => inputHandler.handleUserInput(e, setChatInput)}
          onKeyDown={(e) => {
            inputHandler.isPressEnter(
              e,
              formRef,
              curUser,
              clicked,
              chatInput,
              setChatInput,
              setImages,
              images,
              setShowFileInput
            );
          }}
          name="chat"
          value={chatInput}
        />
        <div style={{ position: 'relative' }}>
          <StImageButton
            onClick={() => setShowFileInput((prev: boolean) => !prev)}
          />
        </div>
      </div>
    </St.StChatForm>
  );
};

export default ChatForm;
