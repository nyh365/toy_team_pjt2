import React, { useState } from 'react';
import Modal from './Modal';
import tw, { styled, css } from 'twin.macro';
import { authApi } from 'api/axios';
import requests from 'api/config';
import { removeCookie } from 'utils/Cookie';
import { useNavigate } from 'react-router-dom';

const ContentContainer = styled.div`
  ${tw`flex flex-col justify-center p-1`}
`;

const ProfileImgWrapper = styled.div``;
const ProfileInfoContainer = styled.div``;
const UserNameWrapper = styled.div``;
const FollowWrapper = styled.div``;
const FollowingWrapper = styled.div``;

const BtnContainer = styled.div``;
const BtnWrapper = styled.div`
  ${tw`flex flex-row m-1 mt-2 space-x-2 justify-around border-none text-sm`}
`;

function ProfileModal({ onClose }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [userImg, setUserImg] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [numOfFollower, setNumOfFollower] = useState(0);
  const [numOfFollowing, setNumOfFollowing] = useState(0);

  authApi(requests.GET_PROFILE(userId)).then((response) => {
    if (response.status === 200) {
      setUserImg(response.data.profileImgURL);
      setUserNickname(response.data.userNickname);
      setNumOfFollower(response.data.numOfFollower);
      setNumOfFollowing(response.data.numOfFollowing);
    }
  });
  const logout = () => {
    authApi(requests.GET_LOGOUT(userId)).then((response) => {
      if (response.status === 200) {
        localStorage.clear();
        removeCookie('refreshToken');

        navigate('/home');
      }
    });
  };
  return (
    <Modal onClose={onClose}>
      <ContentContainer>
        <ProfileImgWrapper>
          <img src={userImg} alt="" />
        </ProfileImgWrapper>
        <ProfileInfoContainer>
          <UserNameWrapper>{userNickname}님</UserNameWrapper>
          <FollowWrapper>팔로워 {numOfFollower}명</FollowWrapper>
          <FollowingWrapper>팔로잉 {numOfFollowing}명</FollowingWrapper>
        </ProfileInfoContainer>
        <hr />
        <BtnContainer />
      </ContentContainer>
      <BtnWrapper>
        <button onClick={logout}>로그아웃</button>
      </BtnWrapper>
    </Modal>
  );
}

export default ProfileModal;
