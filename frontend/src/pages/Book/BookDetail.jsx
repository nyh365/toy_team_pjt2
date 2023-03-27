import React, { useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import { books } from 'api/data';
import { Link, useParams } from 'react-router-dom';
import Button from 'components/common/Button';
import Coin from '../../assets/icons/Coin.svg';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { authApi } from 'api/axios';
import requests from 'api/config';
import CommentForm from 'components/common/CommentForm';

const queryClient = new QueryClient();
const book = books[0]; //책 1개 더미데이터

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

function BookDetail({ userId }) {
  /**
   * 만약 react-query를 쓴 방법이 잘 안먹힌다면???
   * 관심목록 추가하면 자체 state로 좋아요수 +1 제거하면 -1해서 표기하자
   * 어차피 새로고침해서 다시 받아오면 백엔드에 실제로 적용된 값을 받아올 테니까
   */
  const params = useParams(); //{ bookId: 27 }
  const bookId = params.bookId;
  /////////////////react-query////////////////////////
  //좋아요 수 가져오기
  const { status, data, error } = useQuery(
    'getlikes',
    authApi(requests.GET_BOOK_DETAIL(userId, bookId)),
  );

  //좋아요 누르면 실행
  const likesMutation = useMutation(
    authApi(requests.POST_BOOKLIKE(userId, bookId)),
    {
      onSuccess: () => {
        queryClient.setQueryData('getlikes');
      },
    },
  );

  const dislikesMutation = useMutation(
    authApi(requests.DELETE_BOOKLIKE(userId, bookId)),
    {
      onSuccess: () => {
        queryClient.setQueryData('getlikes');
      },
    },
  );
  //////////////////////////////////////////////////////////
  //userId는 props로, bookId는 url에서?

  //bookId로 Book Detail 정보를 API로 요청
  //요청받은 정보로 화면 렌더링
  const [isLiked, setIsLiked] = useState(false);

  const title = book.bookTitle;
  const artistNickname = book.artistNickname;
  const bookContent = book.bookSummary;
  const bookImgUrl = book.bookImgUrl;

  //react-query로 실시간 동기화가 필요 ?
  const bookPrice = '무료';
  const bookLikes = book.numOfLike;

  const likeBook = () => {
    setIsLiked(true);
    //관심목록 추가 API 호출
    likesMutation.mutate({ userId, bookId });
  };

  const dislikeBook = () => {
    setIsLiked(false);
    //관심목록 제거 API 호출
    dislikesMutation.mutate({ userId, bookId });
  };
  return (
    <BodyContainer>
      <BookInfoContainer>
        <BookImgWrapper imgSrc={bookImgUrl} />
        <MainInfoContainer>
          <TitleContainer>
            <TitleWrapper>{title}</TitleWrapper>
            <ArtistWrapper>
              <ArtistImgWrapper />
              {artistNickname}
            </ArtistWrapper>
          </TitleContainer>
          <ContentWrapper>{bookContent}</ContentWrapper>
          <SubInfoContainer>
            <LikeBtnWrapper>
              {!isLiked ? (
                <button onClick={likeBook}>관심목록 추가</button>
              ) : (
                <button onClick={dislikeBook}>관심 취소</button>
              )}
            </LikeBtnWrapper>
            <LikesWrapper>{data}</LikesWrapper>
          </SubInfoContainer>
          <ServiceContainer>
            <PriceWrapper>
              <PriceImgWrapper>
                <img src={Coin} alt="coin" />
              </PriceImgWrapper>
              {bookPrice}
            </PriceWrapper>
            <LinkWrapper>
              <Link to={`/books/viewer/${bookId}`}>
                <Button title="동화 보러가기 →" buttonType="mint" />
              </Link>
            </LinkWrapper>
          </ServiceContainer>
        </MainInfoContainer>
      </BookInfoContainer>

      <CommentContainer>
        <CommentForm />
      </CommentContainer>
    </BodyContainer>
  );
}

export default BookDetail;
