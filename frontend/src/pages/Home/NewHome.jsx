import React from 'react';

import tw, { styled, css } from 'twin.macro';

//Components
import NavBar from 'components/common/NavBar';
import Modal from 'components/common/Modal';
import ProfileImg from 'components/common/ProfileImg';
import ChallengeTimer from 'components/common/ChallengeTimer';
import BookShelf from 'components/common/BookShelf';

import thisChallenge from '../../assets/images/thisChallenge.png';
import requests from 'api/config';
import { authApi, defaultApi } from 'api/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import BookList from 'components/common/BookList';
import { Link } from 'react-router-dom';

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 mt-[2%]`}
`;

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%] p-48`}
`;

const ChallengeContainer = styled.div`
  ${tw`pt-[10%]`}
`;

const TitleContainer = styled.div`
  ${tw`flex items-baseline space-x-1`}
`;

const TitleWrapper = styled.p`
  ${tw`text-3xl font-bold py-2`}
`;

function NewHome() {
  const [challenges, setChallenges] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        await authApi(requests.GET_CHALLENGES()).then((response) => {
          setChallenges(response.data);
        });
      } catch (error) {}
    };
    getData();
  }, []);

  return (
    <div>
      <BodyContainer>
        <CTWrapper>
          <img src={thisChallenge} alt="thisChallenge" />
        </CTWrapper>
        {challenges ? (
          <ChallengeTimer
            endDate={challenges.thisWeekChallenge[0].challengeEndDate}
          />
        ) : null}
        {/* 여기에 할인정보 */}
        <ChallengeContainer>
          {challenges
            ? challenges.thisWeekChallenge.map((challenge, index) => {
                // console.log(challenge);
                return (
                  <div key={index}>
                    <TitleContainer>
                      <TitleWrapper>{challenge.challengeTitle}</TitleWrapper>
                      <Link
                        to={`/challenge/${challenge.challengeId}`}
                        style={{ fontSize: 'small' }}
                      >
                        더 많은 동화 보러가기 →
                      </Link>
                    </TitleContainer>
                    <BookList
                      books={challenge.bookList}
                      width="w-40"
                      height="h-48"
                      fromHome="true"
                    />
                  </div>
                );
              })
            : null}
        </ChallengeContainer>
      </BodyContainer>
    </div>
  );
}

export default NewHome;
