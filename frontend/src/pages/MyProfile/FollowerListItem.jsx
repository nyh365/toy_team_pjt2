import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import { useParams } from 'react-router-dom';
import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import ProfileImg from 'components/common/ProfileImg';
import Button from 'components/common/Button';
const UserInfoContainer = styled.div`
  ${tw`flex flex-col mx-2 items-center`}
`;
const CommentFormcontainer = styled.div`
  ${tw`flex flex-nowrap items-center justify-center border-b-2`}
`;

const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center my-1`}
`;
const Username = styled.span`
  ${tw`text-[16px] text-center w-[6rem]`}
`;

function FollowerListItem({ userId, nickname, profileImg, page }) {
  const userIdx = Number(localStorage.getItem('userId'));
  const params = useParams();
  //   const cancleLike = () => {
  //     setIsLiked(!isLiked);
  //     setNumOfLike(numOfLike - 1);
  //   };
  //   const pressLike = () => {
  //     setIsLiked(!isLiked);
  //     setNumOfLike(numOfLike + 1);
  //   };

  return (
    <CommentFormcontainer>
      <UserInfoContainer>
        <ProfileImg userId={userId} userImg={profileImg} />
        <Username>{nickname}</Username>
      </UserInfoContainer>
      <ButtonContainer>
        <div className="mx-1">
          <Button title="수정" buttonType="black" className="" />
        </div>
      </ButtonContainer>
    </CommentFormcontainer>
  );
}

export default FollowerListItem;
