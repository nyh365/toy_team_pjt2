import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import ProfileImg2 from 'components/common/ProfileImg2';
const Container = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[80px]`}
`;
const NickName = styled.span`
  ${tw`text-[40px] font-bold pt-2`}
`;
const InfoWrapper = styled.div`
  ${tw`flex items-center justify-between z-10`}
`;
const Following = styled.span`
  ${tw`text-[30px] font-bold pt-2 px-2`}
`;
const Follower = styled.span`
  ${tw`text-[30px] font-bold pt-2 px-2`}
`;
function MyProfile() {
  return (
    <Container>
      <ProfileImg2 />
      <NickName>닉네임</NickName>
      <InfoWrapper>
        <Following>팔로잉</Following>
        <Follower>팔로워</Follower>
      </InfoWrapper>
    </Container>
  );
}

export default MyProfile;
