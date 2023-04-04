import React from 'react';
import tw, { styled, css } from 'twin.macro';

import ProfileIcon from '../../assets/icons/UserIcon01.svg';
import CommentIcon from '../../assets/icons/ReviewIcon.svg';
import LikeIcon from '../../assets/icons/LikeButtonFill.svg';
import ProfileImg from './ProfileImg';
const BookInfoWrapper = styled.div`
  ${tw`flex flex-col justify-between`}
`;

const Title = styled.div`
  ${tw`text-xl`}
`;

const SubInfoContainer = styled.div`
  ${tw`flex justify-between items-end flex-wrap text-[1rem] m-1`}
`;

const Artist = styled.div`
  ${tw`flex flex-col items-center`}
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

function BookInfo({
  title,
  artist,
  likes,
  comments,
  width,
  height,
  profileImgURL,
  artistId,
}) {
  return (
    <BookInfoWrapper className={`${width} ${height}`}>
      <Title>{title}</Title>
      <SubInfoContainer className={`${width}-1`}>
        <Artist>
          <ProfileImg userImg={profileImgURL} userId={artistId} />
          <div>{artist}</div>
        </Artist>
        <SubInfoWrapper>
          <Comments>
            <img
              src={CommentIcon}
              width={20}
              height={20}
              alt=""
              style={{ marginRight: 3 }}
            />
            {comments}
          </Comments>
          <Likes>
            <img
              src={LikeIcon}
              width={20}
              height={20}
              alt=""
              style={{ marginRight: 3 }}
            />
            {likes}
          </Likes>
        </SubInfoWrapper>
      </SubInfoContainer>
    </BookInfoWrapper>
  );
}

export default BookInfo;
