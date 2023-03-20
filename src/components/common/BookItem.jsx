/**
 * 메인화면 및 챌린지화면에 들어갈 동화 상세로 이어질 컴포넌트
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import BookInfo from './BookInfo';

const BookItemWrapper = styled.div`
  ${tw``}
`;

const BookImage = styled.div`
  ${tw`z-0 absolute transition w-36 h-48 rounded duration-300 ease-in-out hover:opacity-40 hover:scale-110`}
  ${(props) =>
    css`
      background-image: url(${props.imgSrc});
      background-size: cover;
    `}
`;

const BookInfoWrapper = styled.div`
  ${tw`z-50`}
`;

//props로 가져와야하는 정보 : 책 아이디(경로지정용), 책 이미지, 책 정보들(책 제목, 작가명, 댓글 수, 좋아요 수), 책 링크
function BookItem({
  bookId,
  bookImgUrl,
  artistNickname,
  bookTitle,
  numOfLike,
  numOfComment,
}) {
  const [isHover, setIsHover] = useState(false); //마우스가 올라가있는지
  const bookImg = 'https://tecdn.b-cdn.net/img/new/fluid/city/113.webp'; //더미데이터
  // const bookImg = bookImgUrl;

  const navigate = useNavigate();

  const handleHover = (props) => {
    setTimeout(() => {
      setIsHover(props);
    }, 100);
    // setIsHover(props);
  };

  return (
    <BookItemWrapper>
      <BookImage
        onMouseOver={() => handleHover(true)}
        onMouseOut={() => handleHover(false)}
        onClick={() => navigate(`/books/${bookId}`)}
        imgSrc={bookImg}
      >
        {/* <img src={bookImg} alt="book" /> */}
      </BookImage>
      <BookInfoWrapper>
        {isHover ? (
          <BookInfo
            title={bookTitle}
            artist={artistNickname}
            likes={numOfLike}
            comments={numOfComment}
          />
        ) : null}
      </BookInfoWrapper>
    </BookItemWrapper>
  );
}

export default BookItem;
