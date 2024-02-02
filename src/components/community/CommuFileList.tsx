import React from 'react';
import { FilesObject } from '../../pages/community/model';
import * as St from '../../styles/community/CommunityDetailStyle';

interface FileListProps {
  files: FilesObject[];
}

const getFileIconComponent = (filename: string): JSX.Element => {
  const extension = filename.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'pdf':
      return <St.PdfIcon />;
    case 'hwp':
      return <St.HwpIcon />;
    case 'xls':
    case 'xlsx':
      return <St.ExcelIcon />;
    default:
      return <St.DefaultIcon />;
  }
};

const CommuFileList: React.FC<FileListProps> = ({ files }) => (
  <St.DetailFiles>
    {files.map((file, index) => {
      const lastDotPosition = file.name.lastIndexOf('.');
      const filenameWithoutExtension = file.name.substring(0, lastDotPosition);
      const fileUrl =
        file.url && file.url.length > index ? file.url[index] : undefined;
      return (
        <div key={index}>
          {getFileIconComponent(file.name)}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {filenameWithoutExtension.slice(0, 20)}
          </a>
        </div>
      );
    })}
  </St.DetailFiles>
);

export default CommuFileList;
