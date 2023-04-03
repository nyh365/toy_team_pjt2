import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'components/common/Button';
import Coin from '../../assets/icons/Coin.svg';
import { authApi } from 'api/axios';
import requests from 'api/config';
import CommentForm from 'components/common/CommentForm';
import { userStore } from 'store/userStore';
import LikeButtonFill from 'assets/icons/LikeButtonFill.svg';
import LikeButtonEmpty from 'assets/icons/LikeButtonEmpty.svg';

const BodyContainer = styled.div`
  ${tw`flex flex-col items-center pt-[5%]`}
`;

const BookInfoContainer = styled.div`
  ${tw`flex w-2/3 space-x-16`}
`;
const BookImgWrapper = styled.div`
  ${tw`w-80 h-96 rounded-lg shadow-lg`}
  ${(props) =>
    css`
      background-image: url(${props.imgSrc});
      background-size: cover;
    `}
`;
const MainInfoContainer = styled.div`
  ${tw`flex w-2/3 flex-col m-0 p-[2%]`}
`;
const TitleContainer = styled.div`
  ${tw`flex justify-between text-3xl pb-[2%]`}
`;
const TitleWrapper = styled.div``;
const ArtistWrapper = styled.div`
  ${tw`flex items-end text-xl`}
`;
const ArtistImgWrapper = styled.div``;

const ContentWrapper = styled.div`
  ${tw`pb-[2%]`}
  ${css`
    // white-space: pre-line; //줄바꿈 옵션(들여쓰기 x)
  `}
`;
const SubInfoContainer = styled.div`
  ${tw`flex justify-end space-x-2 pt-2`}
`;
const PriceWrapper = styled.div`
  ${tw`flex justify-end`}
`;
const LikeBtnWrapper = styled.div`
  ${tw`w-fit h-[24px] p-1 text-sub-bold bg-btnBlack text-white rounded-full flex justify-center items-center shadow cursor-pointer`}
`;

const ServiceContainer = styled.div`
  ${tw`flex justify-end space-x-2 pt-2`}
`;

const LinkWrapper = styled.div`
  ${tw`flex justify-end text-base m-0`}
`;

const PriceImgWrapper = styled.div`
  ${tw`m-0 pr-1`}
`;
const LikesWrapper = styled.div``;
const CommentContainer = styled.div``;

function BookDetail() {
  const params = useParams(); //{ bookId: 27 }
  const bookId = params.bookId;
  const navigate = useNavigate();
  const [book, setBook] = useState();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    authApi(requests.GET_BOOK_DETAIL(userId, bookId)).then((res) => {
      setBook(res.data.bookDetail);
      setIsLiked(res.data.bookDetail.liked);
      setIsInterested(res.data.bookDetail.interested);
    });
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const interestBook = () => {
    setIsInterested(true);
    //관심목록 추가 API 호출
    authApi.post(requests.POST_INTEREST(userId, bookId)).then((res) => {});
  };

  const uninterestBook = () => {
    setIsInterested(false);
    //관심목록 제거 API 호출
    authApi.delete(requests.DELETE_INTEREST(userId, bookId)).then((res) => {});
  };

  const likeBook = () => {
    setIsLiked(true);
    //좋아요
    authApi.post(requests.POST_BOOKLIKE(userId, bookId)).then((res) => {
      if (res.data.message === 'success') {
        authApi(requests.GET_BOOK_DETAIL(userId, bookId)).then((res) => {
          setBook(res.data.bookDetail);
          // console.log(res.data.bookDetail);
        });
      }
    });
  };

  const dislikeBook = () => {
    setIsLiked(false);
    //좋아요 취소
    authApi.delete(requests.DELETE_BOOKLIKE(userId, bookId)).then((res) => {
      if (res.data.message === 'success') {
        authApi(requests.GET_BOOK_DETAIL(userId, bookId)).then((res) => {
          setBook(res.data.bookDetail);
          // console.log(res.data.bookDetail);
        });
      }
    });
  };

  const gotoViewer = async () => {
    try {
      // console.log('userID: ', userId, 'bookId; ', bookId);
      await authApi(requests.GET_BOOK_AUTH(userId, bookId)).then((res) => {
        navigate(`/books/viewer/${bookId}`);
        // console.log(res);
      });
    } catch (error) {}
  };
  return (
    <BodyContainer>
      {book ? (
        <BookInfoContainer>
          <BookImgWrapper imgSrc={book.illustPath} onClick={gotoViewer} />
          <MainInfoContainer>
            <TitleContainer>
              <TitleWrapper>{book.bookTitle}</TitleWrapper>
              <ArtistWrapper>
                <ArtistImgWrapper />
                {book.artistNickname}
              </ArtistWrapper>
            </TitleContainer>
            <ContentWrapper>{book.bookSummary}</ContentWrapper>
            <SubInfoContainer>
              <LikeBtnWrapper>
                {!isInterested ? (
                  <button onClick={interestBook}>관심목록 추가</button>
                ) : (
                  <button onClick={uninterestBook}>관심 취소</button>
                )}
              </LikeBtnWrapper>
              <LikesWrapper>{}</LikesWrapper>
              <div>
                {!isLiked ? (
                  <button onClick={likeBook}>
                    <img src={LikeButtonEmpty} alt="" />
                  </button>
                ) : (
                  <button onClick={dislikeBook}>
                    <img src={LikeButtonFill} alt="" />
                  </button>
                )}
              </div>
              <LikesWrapper>{book.numOfLike}</LikesWrapper>
            </SubInfoContainer>
            <ServiceContainer>
              <PriceWrapper>
                <PriceImgWrapper>
                  <img src={Coin} alt="coin" />
                </PriceImgWrapper>
                {book.price}
              </PriceWrapper>
              <LinkWrapper>
                <Button
                  title="동화 보러가기 →"
                  buttonType="mint"
                  onClick={gotoViewer}
                />
              </LinkWrapper>
            </ServiceContainer>
          </MainInfoContainer>
        </BookInfoContainer>
      ) : null}
      {book ? (
        <CommentContainer>
          <CommentForm bookComments={book.comments} />
        </CommentContainer>
      ) : null}
    </BodyContainer>
  );
}

export default BookDetail;
