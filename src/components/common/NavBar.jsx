import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import LogoM from '../../assets/images/LogoM.png';
import Button from './Button';
// Styled Component

const Container = styled.div`
  ${tw`flex items-center fixed border-b h-[80px] w-full z-10 bg-brown1`}
`;
const Tab = styled.span`
  ${tw`text-h3 px-2 hover:text-secondary hover:underline hover:underline-offset-4`}
`;
function NavBar() {
  const [currentUrl, setCurrentUrl] = useState('');
  const location = useLocation().pathname;

  useEffect(() => {
    setCurrentUrl(location);
    console.log(currentUrl);
  }, [location]);
  return (
    <Container>
      <img style={{ height: 80 }} src={LogoM} alt="navbar-logo" />
      <Tab
        className={`${
          location === '/home'
            ? 'text-secondary underline underline-offset-4'
            : 'text-black'
        }`}
      >
        홈
      </Tab>
      <Tab
        className={`${
          location === '/previous'
            ? 'text-secondary underline underline-offset-4'
            : 'text-black'
        }`}
      >
        이전 챌린지
      </Tab>
      <Tab
        className={`${
          location === '/notice'
            ? 'text-secondary underline underline-offset-4'
            : 'text-black'
        }`}
      >
        공지사항
      </Tab>
      <Button title="로그인" buttonType="black" />
    </Container>
  );
}

export default NavBar;
