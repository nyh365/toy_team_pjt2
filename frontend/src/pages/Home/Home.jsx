import React from 'react';

import tw, { styled, css } from 'twin.macro';

//Components
import NavBar from 'components/common/NavBar';
import Modal from 'components/common/Modal';
import ProfileImg from 'components/common/ProfileImg';
import ChallengeTimer from 'components/common/ChallengeTimer';
import BookShelf from 'components/common/BookShelf';

import thisChallenge from '../../assets/images/thisChallenge.png';
import { books, challenges } from 'api/data';
import requests from 'api/config';
import { authApi } from 'api/axios';

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 mt-[2%]`}
`;

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%] p-48`}
`;

const ChallengeContainer = styled.div`
  ${tw`pt-[10%]`}
`;

function Home() {
  const challenges = authApi(requests.GET_CHALLENGES()).then((response) => {
    return response.data;
  });

  return (
    <div>
      <BodyContainer>
        <CTWrapper>
          <img src={thisChallenge} alt="thisChallenge" />
        </CTWrapper>
        <ChallengeTimer
          endDate={challenges.thisWeekChallenge.challengeEndDate}
        />
        <ChallengeContainer>
          {challenges.thisWeekChallenge.map((challenge, index) => {
            return (
              <div key={index}>
                <BookShelf
                  books={challenge.bookList}
                  width="w-40"
                  height="h-48"
                  challenge={challenge}
                  size="b-5"
                />
              </div>
            );
          })}
        </ChallengeContainer>
      </BodyContainer>
    </div>
  );
}

export default Home;
