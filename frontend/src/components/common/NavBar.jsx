import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import LogoM from '../../assets/images/LogoM.png';
import Button from './Button';
import ProfileImg from './ProfileImg';
import UserIcon from 'assets/images/UserIcon.svg';
import LogoutModal from 'pages/Logout/LogoutModal';
// Styled Component

const Container = styled.div`
  ${tw`flex items-center justify-between fixed border-b h-[80px] w-full z-10 bg-brown1`}
`;
const TabWrapper = styled.div`
  ${tw`flex items-center h-[80px]`}
`;

const IconWrapper = styled.div`
  ${tw`flex items-center h-[80px] px-4 space-x-2`}
`;
const Tab = styled.span`
  ${tw`text-h3 px-2 hover:text-secondary hover:underline hover:underline-offset-4 cursor-pointer`}
`;
function NavBar() {
  const userId = localStorage.getItem('userId');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => {
    setIsModalOpen(false);
  };

  const location = useLocation().pathname;

  if (
    location.startsWith('/login') ||
    location.startsWith('/commentform') ||
    location.startsWith('/admin')
  ) {
    return null;
  }
  return (
    <div>
      <Container>
        <TabWrapper>
          <Link to="/home">
            <img style={{ height: 80 }} src={LogoM} alt="navbar-logo" />
          </Link>
          <Link to="/home">
            <Tab
              className={`${
                location === '/home'
                  ? 'text-secondary underline underline-offset-4'
                  : 'text-black'
              }`}
            >
              홈
            </Tab>
          </Link>
          <Link to="/prevchallenge">
            <Tab
              className={`${
                location === '/prevchallenge'
                  ? 'text-secondary underline underline-offset-4'
                  : 'text-black'
              }`}
            >
              이전 챌린지
            </Tab>
          </Link>
          <Link to="/notice">
            <Tab
              className={`${
                location === '/notice'
                  ? 'text-secondary underline underline-offset-4'
                  : 'text-black'
              }`}
            >
              공지사항
            </Tab>
          </Link>
        </TabWrapper>
        <IconWrapper>
          {userId ? (
            <Button
              title="로그아웃"
              buttonType="black"
              className="justify-end"
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            <Link to="/login">
              <Button
                title="로그인"
                buttonType="black"
                className="justify-end"
              />
            </Link>
          )}
          <Link to="/myprofile">
            <ProfileImg userImg={UserIcon} className="justify-end" />
          </Link>
        </IconWrapper>
      </Container>
      {isModalOpen ? <LogoutModal onClose={onClose} /> : null}
    </div>
  );
}

export default NavBar;
