import React, { useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoIosClose } from 'react-icons/io';
import { IoPeopleSharp } from 'react-icons/io5';
import { IoPersonSharp } from 'react-icons/io5';
import { BiWon } from 'react-icons/bi';
import { LuPalette } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";
import { BsChatDotsFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../../../api/supabase/supabaseClient';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => Promise<void>;
  user: boolean | User;
  setUser: (value: boolean | User) => void;
  avatarUrl?: string;
}

interface User {
  username: string;
}
interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  avatar_url: string;
  email: string;
}
const Hamburger: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  onLogout,
  user,
  setUser,
  avatarUrl
}) => {
  const handleLogOut = () => {
    onLogout();
    onClose();
  };
  const getUserInfo = async (id: string | null) => {
    const { data: profile } = await supabase
      .from('user')
      .select('*')
      .eq('id', id);
    return profile;
  };

  useEffect(() => {}, [user]);
  return (
    <HamburgerModalContainer $isOpen={isOpen}>
      <CloseHamburger>
        <IoIosClose
          style={{
            color: 'var(--opc-100)',
            fontSize: '3rem',
            cursor: 'pointer'
          }}
          onClick={onClose}
        />
      </CloseHamburger>
      <UserInfo>
        {avatarUrl && <img src={avatarUrl} alt="Avatar" />}
        <p></p>
      </UserInfo>

      <NavToBoard>
        <NavToProducts to="/products" onClick={onClose}>
          <LuPalette/>
          <p>중고거래</p>
        </NavToProducts>

        <NavToCommunity to="/community" onClick={onClose}>
          <IoPeopleSharp />
          <p>커뮤니티</p>
        </NavToCommunity>
      </NavToBoard>
          <HrStyle/>
      <NavToBoard>
      <NavToProducts to="/productsposts" onClick={onClose}>
          <BiWon />
          <p>판매하기</p>
        </NavToProducts>

        <NavToCommunity to="/community_write" onClick={onClose}>
          <BiEdit />
          <p>소통하기</p>
        </NavToCommunity>
      </NavToBoard>
          <HrStyle/>
      <UserMenu>
        <NavToMypage to="/mypage" onClick={onClose}>
          <IoPersonSharp />
          <p>마이페이지</p>
        </NavToMypage>

        <NavToChatRoom to="/chat" onClick={onClose}>
          <BsChatDotsFill />
          <p>채팅</p>
        </NavToChatRoom>
        <Logout>
          <TbLogout />
          <p onClick={handleLogOut}>로그아웃</p>
        </Logout>
      </UserMenu>
    </HamburgerModalContainer>
  );
};

export default Hamburger;

const HamburgerModalContainer = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  width: 30%;
  height: 60rem;
  top: 0;
  right: 0;
  padding: 1.5rem;
  border: 0.1px solid var(--opc-100);
  border-radius: 1rem;
  background-color: #FFFEFA;
  z-index: 1000;
  @media screen and (max-width: 768px) {
    width: 30%;
  }
  @media screen and (max-width: 570px) {
    width: 40%;
  }
  @media screen and (max-width: 440px) {
    width: 50%;
  }
`;
const CloseHamburger = styled.div`
  border-bottom: 1px solid var(--4-gray);
  display: flex;
  justify-content: right;
  align-items: center;
  margin: auto 0;
`;
const UserInfo = styled.div`
  cursor: pointer;
  display: flex;
  border-bottom: 1px solid var(--4-gray);
  justify-content: center;
  margin: 0 auto;
  padding: 1rem;
  img {
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
  }
`;
const NavToBoard = styled.div`
  display: flex;
  flex-direction: column;
  //gap: 1.2rem;
  padding-top: 1rem;
`;

const NavToProducts = styled(Link)`
  text-decoration: none;
  color: var(--black);
  display: flex;
  margin-top: 2rem;
  gap: 0.5rem;
  svg {
    color: var(--opc-100);
  }
  &:hover {
    font-weight: var(--fontWeight-bold);
  }
`;

const NavToCommunity = styled(Link)`
  text-decoration: none;
  color: var(--11-gray);
  display: flex;
  margin-top: 2rem;
  gap: 0.5rem;
  svg {
    color: var(--opc-100);
  }
  &:hover {
    font-weight: var(--fontWeight-bold);
  }
`;

const UserMenu = styled.div`
  cursor: pointer;
  border-top: 1px solid var(--4-gray);
  //margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const NavToMypage = styled(Link)`
  text-decoration: none;
  color: var(--11-gray);
  display: flex;
  gap: 0.5rem;
  margin-top: 3rem;

  svg {
    color: var(--opc-100);
  }
  &:hover {
    font-weight: var(--fontWeight-bold);
  }
`;

const NavToChatRoom = styled(Link)`
  text-decoration: none;
  color: var(--11-gray);
  display: flex;
  gap: 0.5rem;

  svg {
    color: var(--opc-100);
  }
  &:hover {
    font-weight: var(--fontWeight-bold);
  }
`;
const Logout = styled.div`
  cursor: pointer;
  display: flex;
  gap: 0.5rem;

  svg {
    color: var(--opc-100);
    font-weight: var(--fontWeight-bold);
  }
  &:hover {
    font-weight: var(--fontWeight-bold);
  }
`;

const HrStyle = styled.hr`
  width: 100%;
  height: 0.01rem;
  border: none;
  background-color: var(--opc-100);
  margin-top: 3rem;
`
