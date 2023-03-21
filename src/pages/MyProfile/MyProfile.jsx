import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
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
        <NickNameWrapper>
          <NickName>닉네임</NickName>
          <Link to="/myprofile/edit">
            <img
              src={EditProfileIcon}
              alt="edit icon"
              className="w-[40px] h-[40px]"
            />
          </Link>
        </NickNameWrapper>
        <InfoWrapper>
          <Following>팔로잉</Following>
          <Follower>팔로워</Follower>
        </InfoWrapper>
        <UserInfo>자기소개</UserInfo>
      </ProfileContainer>
      <CompletedBookList>
        <span className="text-[40px]">완성한 동화</span>
        <BookList width="w-[180px]" height="h-[250px]" books={books} />
      </CompletedBookList>
      <InCompleteBookList>
        <span className="text-[40px]">작업중인 동화</span>
        <BookList width="w-[180px]" height="h-[250px]" books={books} />
      </InCompleteBookList>
      <LikedBookList>
        <span className="text-[40px]">관심목록</span>
        <BookList width="w-[180px]" height="h-[250px]" books={books} />
      </LikedBookList>
      <PurchasedBookList>
        <span className="text-[40px]">구매목록</span>
        <BookList width="w-[180px]" height="h-[250px]" books={books} />
      </PurchasedBookList>
    </div>
  );
}

export default MyProfile;
