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

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 mt-[2%]`}
`;

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%]`}
`;

function Home() {
  return (
    <div>
      <NavBar />
      <BodyContainer>
        <CTWrapper>
          <img src={thisChallenge} alt="" />
        </CTWrapper>
        <ChallengeTimer endDate={challenges.endDate} />
        <BookShelf
          books={books}
          width="w-40"
          height="h-48"
          challenge={challenges.challenges[0]}
        />
        <BookShelf
          books={books}
          width="w-40"
          height="h-48"
          challenge={challenges.challenges[1]}
        />
      </BodyContainer>
    </div>
  );
}

export default Home;
