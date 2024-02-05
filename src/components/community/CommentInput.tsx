import React from 'react';
import { EditCommentInputProps } from '../../pages/community/api/model';

const EditCommentInput: React.FC<EditCommentInputProps> = ({
  value,
  onChange
}) => {
  return <input value={value} onChange={onChange} />;
};

export default React.memo(EditCommentInput);
