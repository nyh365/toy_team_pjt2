import React from 'react';
import Modal from 'components/common/Modal';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from 'utils/Cookie';
import { authApi } from 'api/axios';
import requests from 'api/config';

import tw, { styled, css } from 'twin.macro';

const ContentContainer = styled.div`
  ${tw`m-4 font-bold`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex flex-row m-1 mt-2 space-x-2 justify-around border-none text-sm`}
`;

function LogoutModal({ onClose }) {
  const navigate = useNavigate();

  const logout = () => {
    const userId = localStorage.getItem('userId');

    authApi(requests.GET_LOGOUT(userId)).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        localStorage.clear();
        removeCookie('refreshToken');

        navigate('/home');
      }
    });
  };

  return (
    <Modal onClose={onClose}>
      <ContentContainer>몽땅연필에서 로그아웃하시겠습니까?</ContentContainer>
      <hr />
      <ButtonWrapper>
        <button onClick={onClose}>취소</button>
        <button onClick={logout} style={{ color: '#A3DCCD' }}>
          로그아웃
        </button>
      </ButtonWrapper>
    </Modal>
  );
}

export default LogoutModal;
