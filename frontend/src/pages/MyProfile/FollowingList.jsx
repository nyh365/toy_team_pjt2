import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import FollowingListItem from './FollowingListItem';
import FollowerListItem from './FollowerListItem';

const FollowerContainer = styled.div`
  ${tw`w-[30vw] h-[40vw] flex-col border-2 justify-center rounded-xl overflow-auto`}
`;
function FollowingList({ followings }) {
  return (
    <FollowerContainer>
      {followings !== []
        ? [...followings].map((following) => (
            <FollowingListItem
              key={following.userId}
              userId={following.userId}
              nickname={following.userNickname}
              profileImg={following.profileImgURL}
            />
          ))
        : ''}
    </FollowerContainer>
  );
}

export default FollowingList;
