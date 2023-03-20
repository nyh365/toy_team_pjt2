import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import ProfileImg2 from 'components/common/ProfileImg2';
import BookListItem from 'components/common/BookListItem';
import BookItem from 'components/common/BookItem';
import LogoL from 'assets/images/LogoL.png';
import BookInfo from 'components/common/BookInfo';
import BookList from 'components/common/BookList';
const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[80px]`}
`;
const NickName = styled.span`
  ${tw`text-[40px] pt-2`}
`;
const InfoWrapper = styled.div`
  ${tw`flex items-center justify-between z-10`}
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

function MyProfile() {
  const books = [
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 12,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 11,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
  ];
  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 />
        <NickName>닉네임</NickName>
        <InfoWrapper>
          <Following>팔로잉</Following>
          <Follower>팔로워</Follower>
        </InfoWrapper>
        <UserInfo>자기소개</UserInfo>
      </ProfileContainer>
      <BookList width="w-[220px]" height="h-[300px]" books={books} />
    </div>
  );
}

export default MyProfile;
