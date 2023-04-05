import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import FollowingListItem from './FollowingListItem';
import FollowerListItem from './FollowerListItem';

const FollowerContainer = styled.div`
  ${tw`w-[30vw] h-[40vw] flex-col border-2 justify-center overflow-auto`}
`;
function FollowList({ followers, followings, page }) {
  return (
    <FollowerContainer>
      {followers !== []
        ? [...followers].map((follower) => (
            <FollowerListItem
              key={follower.userId}
              userId={follower.userId}
              nickname={follower.userNickname}
              profileImg={follower.profileImgURL}
              page={page}
            />
          ))
        : ''}
      {followings !== []
        ? [...followings].map((following) => (
            <FollowingListItem
              key={following.userId}
              userId={following.userId}
              nickname={following.userNickname}
              profileImg={following.profileImgURL}
              page={page}
            />
          ))
        : ''}
    </FollowerContainer>
  );
}

export default FollowList;
