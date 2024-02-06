import React from 'react';
import { ImagePreviewerType } from './ImagePreviewerTypes';
import {
  StCloseBtn,
  StPreviewContainer,
  StPreviewItems,
  StdeleteImage
} from './ImagePreviewerStyles';

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
              <>
                <StPreviewItems $url={url} key={`${url}-${i}`}>
                  <StdeleteImage>
                    <div id={url} onClick={handleRemoveImage}>
                      <StCloseBtn />
                    </div>
                  </StdeleteImage>
                </StPreviewItems>
              </>
            );
          })}
        </StPreviewContainer>
      )}
    </>
  );
};

export default ImagePreviewer;
