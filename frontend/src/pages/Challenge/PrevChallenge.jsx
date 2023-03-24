import React from 'react';

import tw, { styled, css } from 'twin.macro';
import BookShelf from 'components/common/BookShelf';
import prevChallenge from '../../assets/images/prevChallenge.png';

import { books, prevChallenges } from 'api/data';

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%] p-48`}
`;

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 mb-[2%]`}
`;

function PrevChallenge() {
  return (
    <BodyContainer>
      <CTWrapper>
        <img src={prevChallenge} alt="" />
      </CTWrapper>

      {prevChallenges.totalChallenges.map((season) => {
        return season.challenges.map((ch, idx) => {
          return (
            <div key={idx}>
              <BookShelf
                books={books}
                width="w-40"
                height="h-48"
                challenge={ch}
                size="b-12"
              />
            </div>
          );
        });
      })}
    </BodyContainer>
  );
}

export default PrevChallenge;
