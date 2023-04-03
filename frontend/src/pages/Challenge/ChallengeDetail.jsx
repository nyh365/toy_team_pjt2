import React from 'react';
import tw, { styled, css } from 'twin.macro';

import { authApi } from 'api/axios';
// import { challengeDetails } from 'api/data';
import requests from 'api/config';
import { Link, useParams } from 'react-router-dom';
import Button from 'components/common/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import BookListItem from 'components/common/BookListItem';
import BookBadge from 'components/common/BookBadge';

const BodyContainer = styled.div`
  ${tw`flex flex-col items-center pt-[5%]`}
`;

const BookTitleWrapper = styled.p`
  ${tw`text-3xl pl-[2%] pt-[5%] pb-[2%]`}
`;
const ChallengeInfoContainer = styled.div`
  ${tw`flex flex-col flex-wrap w-2/3`}
`;
const BookContainer = styled.div`
  ${tw`p-48`}
`;
const BestBookContainer = styled.div`
  ${tw``}
`;
const LikedBookContainer = styled.div``;
const RecentBookContainer = styled.div``;

const TitleWrapper = styled.p`
  ${tw`text-5xl m-0 pb-2 pt-[10%]`}
`;
const ContentWrapper = styled.p`
  ${tw`text-2xl m-0`}
`;
const LinkWrapper = styled.div`
  ${tw`flex justify-end text-base m-0`}
`;

function ChallengeDetail() {
  const [challengeDetails, setChallengeDetails] = useState();
  const [challengeInfo, setChallengeInfo] = useState();

  const params = useParams();
  const id = params.challengeId;

  useEffect(() => {
    const getData = async () => {
      try {
        authApi(requests.GET_CHALLENGE(id)).then((response) => {
          setChallengeDetails(response.data);
          console.log(response.data);
        });

        //url의 challengeId를 바탕으로 해당 challege에 대한 정보를 가져온다
        authApi(requests.GET_CHALLENGES()).then((response) =>
          response.data.thisWeekChallenge.map((challenge) => {
            if (challenge.challengeId === Number.parseInt(id)) {
              setChallengeInfo(challenge);
              // console.log(challenge);
            }
          }),
        );
      } catch (error) {}
    };
    getData();
  }, []);

  return (
    <BodyContainer>
      {challengeInfo ? (
        <ChallengeInfoContainer>
          <TitleWrapper>{challengeInfo.challengeTitle}</TitleWrapper>
          <ContentWrapper>{challengeInfo.challengeSummary}</ContentWrapper>
          <LinkWrapper>
            <Link>
              <Button title="동화 만들기 →" buttonType="mint" />
            </Link>
          </LinkWrapper>
        </ChallengeInfoContainer>
      ) : null}

      {challengeDetails ? (
        <BookContainer>
          <BestBookContainer>
            <BookTitleWrapper>베스트 동화</BookTitleWrapper>
            {challengeDetails.detailChallenge.bookList.map((book, index) => {
              return (
                <BookBadge book={book} key={book.bookId} index={index}>
                  <BookListItem book={book} width="w-40" height="h-48" />
                </BookBadge>
              );
            })}
          </BestBookContainer>
          <LikedBookContainer>
            <BookTitleWrapper>관련 동화</BookTitleWrapper>
            {challengeDetails.recent.map((book) => {
              return (
                <BookListItem
                  key={book.bookId}
                  book={book}
                  width="w-40"
                  height="h-48"
                />
              );
            })}
          </LikedBookContainer>
        </BookContainer>
      ) : null}
    </BodyContainer>
  );
}

export default ChallengeDetail;
