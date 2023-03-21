import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import ProfileImg2 from 'components/common/ProfileImg2';
import Button from 'components/common/Button';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[80px]`}
`;
const ButtonContainer = styled.div`
  ${tw`flex mt-2 justify-center`}
`;
function MyProfileEdit() {
  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 />
        <ButtonContainer>
          <div className="mx-2">
            <Button title="기본사진" buttonType="black" className="" />
          </div>
          <div className="mx-2">
            <Button title="사진수정" buttonType="black" className="" />
          </div>
        </ButtonContainer>
      </ProfileContainer>
    </div>
  );
}

export default MyProfileEdit;
