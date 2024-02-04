import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { IoClose } from 'react-icons/io5';

// 파일을 받는다
// 파일을 받아서 storage에 저장 후 url을 받아와 queue배열에 셋팅한다
// queue 배열에 담긴 것을 미리보기로 보여준다
// 전송 시 queue를 메세지 row에 담아 전송한다

// Array.from(file) => 객체를 배열로 반환하넹
// {0:file, 1:file} => [file, file]

/**
 * @param imageState - fileinput에서 받은 파일리스트
 * @returns
 */

type ImagePreviewerType = {
  imageState: (string | undefined)[];
  handleRemoveImage: any;
};

const ImagePreviewer = ({
  imageState,
  handleRemoveImage
}: ImagePreviewerType) => {
  return (
    <>
      {imageState && imageState.length > 0 && (
        <StPreviewContainer>
          {imageState.map((url, i) => {
            return (
              <StPreviewItems $url={url} key={`${url}-${i}`}>
                <StdeleteImage>
                  <div id={url} onClick={handleRemoveImage}>
                    <StCloseBtn />
                  </div>
                </StdeleteImage>
              </StPreviewItems>
            );
          })}
        </StPreviewContainer>
      )}
    </>
  );
};

export default ImagePreviewer;

const ImageAni = keyframes`
  from {
    opacity: 0;
    scale: 0;
  }

  to {
    opacity: 1;
    scale: 1;
  }
`;

const StPreviewContainer = styled.div`
  width: 100%;
  border-radius: 9px;
  margin-block: 1rem;
  padding: 1.25rem;
  display: flex;
  gap: 1.65rem;
  align-items: center;
  overflow-x: scroll;
  background-color: #1d1d1d30;
`;
type ItemType = {
  $url: string | undefined;
};

const StPreviewItems = styled.div<ItemType>`
  width: 12rem;
  height: 12rem;
  border-radius: 0.6rem;
  position: relative;
  ${(props) => {
    if (props.$url && props.$url !== undefined) {
      return css`
        background: url(${props.$url});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
      `;
    } else {
      return css`
        background: #eee;
      `;
    }
  }}

  animation: ${ImageAni} .3s ease
`;

const StdeleteImage = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  top: -0.6rem;
  right: -0.75rem;
  border-radius: 50%;
  background-color: var(--opc-100);
`;

const StCloseBtn = styled(IoClose)`
  color: black;
  padding-left: 0.15rem;
  padding-top: 0.1rem;
  font-weight: var(--fontWeight-bold);
  cursor: pointer;
`;
