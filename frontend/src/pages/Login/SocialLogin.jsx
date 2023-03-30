/**
 * 카카오/구글 로그인 이후 redirect uri로 연결할 페이지
 * 여기서 response data를 처리하고 메인 페이지로 연결한다
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { setCookie } from 'utils/Cookie';
import { userStore } from 'store/userStore';

function SocialLogin() {
  const navigate = useNavigate();
  const { setUserId, setUserNickname, setUserImg, setUserRole, setToken } =
    userStore((state) => state);

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
    if (userNickname === '' || userNickname === undefined) {
      navigate('/myprofile/edit/nickname');
    } else {
      navigate('/home');
    }
  }, []);
}

export default SocialLogin;
