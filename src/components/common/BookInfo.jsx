import React from 'react';
import tw, { styled, css } from 'twin.macro';

import ProfileIcon from '../../assets/icons/UserIcon01.svg';
import ReviewIcon from '../../assets/icons/ReviewIcon.svg';
import LikeIcon from '../../assets/icons/LikeButtonFill.svg';

const BookInfoWrapper = styled.div`
  ${tw`flex flex-col justify-between`}
`;

const Title = styled.div`
  ${tw`text-lg`}
`;

const SubInfoContainer = styled.div`
  ${tw`flex justify-between flex-wrap text-[0.7rem] m-0.5`}
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
      <Title>제목</Title>
      <SubInfoContainer className={`${width}-1`}>
        <Artist>
          <img src={ProfileIcon} width={16} height={16} alt="" />
          작가명
        </Artist>
        <SubInfoWrapper>
          <Likes>
            <img src={ReviewIcon} width={16} height={16} alt="" />
            1234
          </Likes>
          <Comments>
            <img src={LikeIcon} width={16} height={16} alt="" />
            22
          </Comments>
        </SubInfoWrapper>
      </SubInfoContainer>
    </BookInfoWrapper>
  );
}

export default BookInfo;
