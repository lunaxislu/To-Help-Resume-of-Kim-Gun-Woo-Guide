import styled from 'styled-components';
import React from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
interface DropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickMenu: string;
  setClickMenu: React.Dispatch<React.SetStateAction<string>>;
}

const DropDownMenu: React.FC<DropdownProps> = ({
  isOpen,
  setIsOpen,
  clickMenu,
  setClickMenu
}) => {
  const toggleDropdownButton = () => {
    setIsOpen(!isOpen);
  };
  const currentClickMenu = (menu: string) => {
    setClickMenu(menu);
  };
  return (
    <DropdownMenu>
      <DropdownButton onClick={toggleDropdownButton}>
        <p>{clickMenu}</p>
        <IoChevronDownOutline />
      </DropdownButton>
      <DropdownContent style={{ display: isOpen ? 'block' : 'none' }}>
        <DropdownItem
          onClick={() => {
            currentClickMenu('최신순');
            toggleDropdownButton();
          }}
        >
          최신순
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            currentClickMenu('낮은가격순');
            toggleDropdownButton();
          }}
        >
          낮은가격순
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            currentClickMenu('높은가격순');
            toggleDropdownButton();
          }}
        >
          높은가격순
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
};

export default DropDownMenu;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;
const DropdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.3rem;
  height: 3.2rem;
  margin-top: 0.3rem;
  text-decoration: none;
  cursor: pointer;
  font-weight: var(--fontWeight-bold);
  gap: 0.8rem;
  background: transparent;
  font-size: var(--fontSize-H5);
  font-weight: var(--fontWeight-medium);
  color: var(--7-gray);
  border: none;
  &:hover {
    color: #e3e8e8;
  }
`;
const DropdownContent = styled.div`
  position: absolute;
  top: 3.2rem;
  right: 0;
  width: 10rem;
  box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DropdownItem = styled.div`
  padding: 1rem;
  text-decoration: none;
  color: var(--11-gray);
  font-size: var(--fontSize-H6);
  font-weight: var(--fontWeight-bold);
  cursor: pointer;
  width: 100%;
  text-align: center;
  &:hover {
    background-color: #83ad2e;
    color: #101d1c;
  }
`;
