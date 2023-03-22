import React, { useEffect, useState } from 'react';
import ProfileImg from './ProfileImg';
import tw, { styled, css } from 'twin.macro';

const InputContainer = styled.div`
  ${tw`flex pt-2 pb-2 px-4`}

  & {
    input {
      ${tw`rounded-lg mb-1 p-1 box-border h-6 text-main`}
      ${(props) =>
        props.isValid
          ? tw`focus:outline focus:outline-primary`
          : tw`focus:outline focus:outline-secondary`}
    }
  }
`;
const Formcontainer = styled.div`
  ${`flex items-center`}
`;
const UserInfoContainer = styled.div`
  ${`flex flex-col`}
`;
function CommentForm() {
  return (
    <div>
      <form action="submit">
        <Formcontainer>
          <UserInfoContainer>
            <ProfileImg />
            <p>asd</p>
          </UserInfoContainer>
          <InputContainer>
            <input
              type="text"
              placeholder="감상을 적어주세요"
              name="Username"
            />
          </InputContainer>
        </Formcontainer>
      </form>
    </div>
  );
}

export default CommentForm;
