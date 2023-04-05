/**
 * 메인화면 및 챌린지화면에 들어갈 동화 상세로 이어질 컴포넌트
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import { userStore } from 'store/userStore';

import BookInfo from './BookInfo';

const BookListItemWrapper = styled.div`
  ${tw`px-2`}
`;

const BookImage = styled.img`
  ${tw`border-b-2 border-r-4 border-gray-400 z-0 absolute transition rounded-lg duration-300 shadow-lg ease-in-out hover:opacity-20 hover:scale-110`}
  ${(props) =>
    css`
      background-image: url(${props.imgSrc});
      background-size: contain;
    `}
`;

const BookInfoWrapper = styled.div`
  ${tw`z-50`}
`;

//props로 가져와야하는 정보 : 책 아이디(경로지정용), 책 이미지, 책 정보들(책 제목, 작가명, 댓글 수, 좋아요 수), 책 링크
function BookListItem({ width, height, book, incomplete }) {
  const userId = localStorage.getItem('userId');
  const [incompleted, setIncompleted] = useState(false);
  const [isHover, setIsHover] = useState(false); //마우스가 올라가있는지
  // const bookImg = 'https://tecdn.b-cdn.net/img/new/fluid/city/113.webp'; //더미데이터
  useEffect(() => {
    setIncompleted(incomplete);
  });
  const navigate = useNavigate();

  const handleHover = (props) => {
    setTimeout(() => {
      setIsHover(props);
    }, 100);
  };

  // console.log(book);
  return (
    <BookListItemWrapper>
      <BookImage
        onMouseOver={() => handleHover(true)}
        onMouseOut={() => handleHover(false)}
        onClick={() => navigate(`/books/${userId}/${book.bookId}`)}
        src={book.bookImgUrl}
        className={`image-upload-preview ${width} ${height}`}
        alt="upload-preview"
      />

      <BookInfoWrapper>
        <BookInfo
          title={book.bookTitle}
          artist={book.artistNickname}
          profileImgURL={book.profileImgURL}
          artistId={book.artistId}
          likes={book.numOfLike}
          comments={book.numOfComment}
          width={width}
          height={height}
        />
      </BookInfoWrapper>
    </BookListItemWrapper>
  );
}

export default BookListItem;
