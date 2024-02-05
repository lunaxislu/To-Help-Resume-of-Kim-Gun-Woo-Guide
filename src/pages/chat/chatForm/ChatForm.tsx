import React, {
  ChangeEvent,
  MouseEvent,
  SetStateAction,
  useRef,
  useState
} from 'react';
import { User } from '@supabase/supabase-js';
import { handleFileUpload } from '../../../components/imagePreviewer/ImagePreviewFn';
import { InputHandler } from '../chat_utils/inputClass';
import ImagePreviewer from '../../../components/imagePreviewer/ImagePreviewer';
import * as St from '../style';

interface ChatFormProps {
  showFileInput: boolean;
  curUser: User | null | undefined;
  clicked: string | undefined;
  setShowFileInput: React.Dispatch<SetStateAction<boolean>>;
}

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
      // storage 업로드 후 publicURL을 받아오는 비동기 함수
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
        <label htmlFor="file">
          <St.ImageInput
            onChange={handleSetFileList}
            placeholder="이미지 보내기"
            id="file"
            name="file"
          />
        </label>
      )}
      <St.ButtonWrapper>
        <St.StButtonBox>
          <St.StImageButton
            onClick={() => setShowFileInput((prev: boolean) => !prev)}
          />
        </St.StButtonBox>

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
      </St.ButtonWrapper>
    </St.StChatForm>
  );
};

export default ChatForm;
