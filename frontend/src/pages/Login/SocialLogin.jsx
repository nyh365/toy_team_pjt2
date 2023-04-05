/**
 * 카카오/구글 로그인 이후 redirect uri로 연결할 페이지
 * 여기서 response data를 처리하고 메인 페이지로 연결한다
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { setCookie } from 'utils/Cookie';
import { userStore } from 'store/userStore';
import Web3 from 'web3';
import { authApi, defaultApi } from 'api/axios';
import requests from 'api/config';

function SocialLogin() {
  const web3 = new Web3();
  const navigate = useNavigate();
  const {
    setUserId,
    setUserNickname,
    setUserImg,
    setUserRole,
    setToken,
    setUserWallet,
  } = userStore((state) => state);

  const userId = new URL(window.location.href).searchParams.get('userId');
  const userNickname = new URL(window.location.href).searchParams.get(
    'userNickname',
  );
  const accessToken = new URL(window.location.href).searchParams.get(
    'accessToken',
  );

  const profileImg = new URL(window.location.href).searchParams.get(
    'profileImgURL',
  );

  const refreshToken = new URL(window.location.href).searchParams.get(
    'refreshToken',
  );
  //첫 로그인(회원가입)이라면 닉네임 설정 페이지로?

  const userWallet = new URL(window.location.href).searchParams.get(
    'userWallet',
  );

  //리다이렉트
  useEffect(() => {
    //로컬스토리지에 저장
    localStorage.setItem('userId', userId);
    localStorage.setItem('userNickname', userNickname);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userImg', profileImg);
    setCookie('refreshToken', refreshToken);
    //전역상태 저장
    setUserId(userId);
    setUserNickname(userNickname);
    setUserImg(profileImg);
    setUserRole('reader');
    setToken(accessToken);

    //지갑 저장
    if (userWallet === ' ') {
      // console.log('없음');
      const wallet = web3.eth.accounts.create();
      setUserWallet(wallet.privateKey);
      // console.log(wallet);
      authApi.post(requests.POST_WALLET(userId), {
        wallet: wallet.privateKey,
      });
    } else {
      setUserWallet(userWallet);
      // console.log('로그인 성공');
      // console.log(userWallet);
    }

    navigate('/home');
  }, []);
}

export default SocialLogin;
