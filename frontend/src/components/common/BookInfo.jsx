import React from 'react';
import tw, { styled, css } from 'twin.macro';

import ProfileIcon from '../../assets/icons/UserIcon01.svg';
import ReviewIcon from '../../assets/icons/ReviewIcon.svg';
import LikeIcon from '../../assets/icons/LikeButtonFill.svg';

const BookInfoWrapper = styled.div`
  ${tw`flex flex-col justify-between`}
`;

const Title = styled.div`
  ${tw`text-xl`}
`;

const SubInfoContainer = styled.div`
  ${tw`flex justify-between flex-wrap text-[1rem] m-1`}
`;

const Artist = styled.div`
  ${tw`flex flex-row`}
`;

const SubInfoWrapper = styled.div`
  ${tw`flex flex-row space-x-1`}
`;

const Likes = styled.div`
  ${tw`flex flex-row`}
`;
const Comments = styled.div`
  ${tw`flex flex-row`}
`;

function BookInfo({ title, artist, likes, comments, width, height }) {
  return (
    <BookInfoWrapper className={`${width} ${height}`}>
      <Title>{title}</Title>
      <SubInfoContainer className={`${width}-1`}>
        <Artist>
          <img src={ProfileIcon} width={20} height={20} alt="" />
          {artist}
        </Artist>
        <SubInfoWrapper>
          <Likes>
            <img src={ReviewIcon} width={20} height={20} alt="" /> {likes}
          </Likes>
          <Comments>
            <img src={LikeIcon} width={20} height={20} alt="" />
            {comments}
          </Comments>
        </SubInfoWrapper>
      </SubInfoContainer>
    </BookInfoWrapper>
  );
}

export default BookInfo;
