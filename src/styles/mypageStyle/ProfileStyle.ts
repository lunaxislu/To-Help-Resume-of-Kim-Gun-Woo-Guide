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
  padding-bottom: 5rem;
  border-bottom: 1px solid var(--5-gray);
`;

export const StProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export const StProfileImage = styled.img`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
`;

export const StFileUploadInput = styled.input`
  width: 9rem;
  display: none;
`;

export const StProfileButton = styled.button`
  width: 10rem;
  background: var(--opc-100);
  border: none;
  padding: 0.7rem 2rem;
  border-radius: 0.5rem;
`;

// 유저 정보 부분 스타일
export const StProfileContentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
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
