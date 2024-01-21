import styled from 'styled-components';

// 버튼 스타일
export const StProfileButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const StProfileButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
`;

export const StProfileButtons = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: var(--8-gray);
  cursor: pointer;

  &:hover {
    color: var(--opc-90);
  }
`;

export const StProfileSaveButton = styled.a`
  color: var(--opc-100);
  cursor: pointer;
  &:hover {
    color: var(--opc-90);
  }
`;

// 유저 이미지 부분 스타일
export const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  gap: 5rem;
  border-radius: 1rem;
`;

export const StProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StProfileImage = styled.img`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
`;

export const StFileUploadInput = styled.input`
  width: 9rem;
`;

// 유저 정보 부분 스타일
export const StProfileContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 8rem;
`;

export const StContent = styled.p`
  color: var(--11-gray);
  text-align: left;
`;

export const StNicknameInput = styled.input`
  background: var(--4-gray);
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.6rem;
  color: var(--11-gray);

  &:focus {
    border: 1px solid var(--opc-90);
  }
`;
