import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import UserIcon from 'assets/images/UserIcon.svg';

const Avatar = styled.div`
  ${tw`bg-primary border-b rounded-full bg-cover bg-center`}
  background-image: url(${(props) => props.img || UserIcon});
  width: ${(props) => props.width || '3rem'};
  height: ${(props) => props.height || '3rem'};
`;
function ProfileImg({ userImg, userId, height, width }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (userId) {
      navigate(`/myprofile/${userId}`);
    }
  };
  return (
    <div onClick={handleClick}>
      <div>
        <Avatar img={userImg} height={height} width={width} />
      </div>
    </div>
  );
}

export default ProfileImg;
