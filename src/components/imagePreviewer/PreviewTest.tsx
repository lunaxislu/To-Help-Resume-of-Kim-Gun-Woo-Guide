import React, { ChangeEvent, useState } from 'react';
import ImagePreviewer from './ImagePreviewer';

const PreviewTest = () => {
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setFileList(files);
  };

  return (
    <div>
      <input
        type="file"
        name="images"
        id="images"
        multiple
        onChange={handleChangeFileInput}
      />
    </div>
  );
};

export default PreviewTest;
