import React from 'react';
import tw, { styled } from 'twin.macro';
import requests from 'api/config';

//imgs
import logoImage from '../../assets/images/LogoM.png';
import kakaoBtn from '../../assets/images/kakao_login_en.svg';
import googleBtn from '../../assets/images/google_login_en.svg';

const Wrapper = styled.div`
  ${tw`flex flex-col items-center h-full w-full pt-40`}

  & {
    .logo {
      ${tw`h-auto`}
    }

    .kakao {
    }

    .google {
    }
  }
`;

function UserLogin() {
  const kakaoLogin = () => {
    window.location.href = requests.KAKAO_LOGIN;
  };

  const googleLogin = () => {
    window.location.href = requests.GOOGLE_LOGIN;
  };

  return (
    <Wrapper>
      <img className="logo" src={logoImage} alt="" />
      <img className="kakao" src={kakaoBtn} onClick={kakaoLogin} alt="" />
      <img className="google" src={googleBtn} onClick={googleLogin} alt="" />
    </Wrapper>
  );
}

export default UserLogin;
