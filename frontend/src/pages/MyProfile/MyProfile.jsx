import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import UserIcon from 'assets/images/UserIcon.svg';
import ProfileImg2 from 'components/common/ProfileImg2';
import BookList from 'components/common/BookList';
import EditProfileIcon from 'assets/icons/pencil03.svg';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[80px]`}
`;
const NickNameWrapper = styled.div`
  ${tw`flex items-center pt-2`}
`;

const NickName = styled.span`
  ${tw`text-[40px]`}
`;
const InfoWrapper = styled.div`
  ${tw`flex items-center justify-between`}
`;
const Following = styled.span`
  ${tw`text-[30px] pt-2 px-2`}
`;
const Follower = styled.span`
  ${tw`text-[30px] pt-2 px-2`}
`;
const UserInfo = styled.span`
  ${tw`text-[35px] pt-2`}
`;
const CompletedBookList = styled.div`
  ${tw`px-10`}
`;
const InCompleteBookList = styled.div`
  ${tw`px-10`}
`;
const LikedBookList = styled.div`
  ${tw`px-10`}
`;
const PurchasedBookList = styled.div`
  ${tw`px-10`}
`;

function MyProfile() {
  const userId = Number(localStorage.getItem('userId'));
  const [userImg, setUserImg] = useState(UserIcon);
  const [userNickname, setUserNickname] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFollower, setUserFollower] = useState('');
  const [userFollowing, setUserFollowing] = useState('');
  const [myBooks, setMyBooks] = useState('');
  const [inCompleteBooks, setInCompleteBooks] = useState('');
  const [interestBooks, setInterestBooks] = useState('');
  const [paidBooks, setPaidBooks] = useState('');

  const openWallet = () => {
    window.open(
      'http://localhost:8080/?key=0x6f2cf4943d60081bdd8179bde2996d83446ab2d0eccca90782ac91cb535e699a',
      'MyWallet',
      'toolbar=no, menubar=no, width=550, height=780',
    );
  };
  //프로필 조회 api사용
  useEffect(() => {
    const get_user = async () => {
      try {
        const { data } = await authApi.get(requests.GET_PROFILE(userId));
        setUserNickname(data.profile.userNickname);
        setUserFollower(data.profile.numOfFollower);
        setUserFollowing(data.profile.numOfFollowing);
        setUserInfo(data.profile.userInfo);
        setUserImg(data.profile.profileImgURL);
        setMyBooks(data.profile.myBooks);
        setInCompleteBooks(data.profile.inCompleteBooks);
        setInterestBooks(data.profile.interestBooks);
        setPaidBooks(data.profile.paidBooks);
      } catch (error) {
        throw error;
      }
    };

    get_user();
  }, [userImg]);

  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 userImg={userImg} />
        <NickNameWrapper>
          <NickName>{userNickname}</NickName>
          <Link to="/myprofile/edit">
            <img
              src={EditProfileIcon}
              alt="edit icon"
              className="w-[40px] h-[40px]"
            />
          </Link>
        </NickNameWrapper>
        <InfoWrapper>
          <Following>팔로잉 {userFollowing}</Following>
          <Follower>팔로워 {userFollower}</Follower>
        </InfoWrapper>
        {userInfo ? (
          <UserInfo>{userInfo}</UserInfo>
        ) : (
          <UserInfo>소개를 작성해 주세요</UserInfo>
        )}
        <NickName onClick={openWallet}>지갑보러가기</NickName>
      </ProfileContainer>
      <CompletedBookList>
        <span className="text-[40px]">완성한 동화</span>
        <BookList width="w-[180px]" height="h-[250px]" books={myBooks} />
      </CompletedBookList>
      <InCompleteBookList>
        <span className="text-[40px]">작업중인 동화</span>
        <BookList
          width="w-[180px]"
          height="h-[250px]"
          books={inCompleteBooks}
        />
      </InCompleteBookList>
      <LikedBookList>
        <span className="text-[40px]">관심목록</span>
        <BookList width="w-[180px]" height="h-[250px]" books={interestBooks} />
      </LikedBookList>
      <PurchasedBookList>
        <span className="text-[40px]">구매목록</span>
        <BookList width="w-[180px]" height="h-[250px]" books={paidBooks} />
      </PurchasedBookList>
    </div>
  );
}

export default MyProfile;
