import React from 'react';
import tw, { styled, css } from 'twin.macro';
import bookshelf from '../../assets/images/Shelf.svg';
import ChallengeInfo from './ChallengeInfo';

const ShelfWrapper = styled.div`
  ${tw`relative top-60`}
`;

const BookContainer = styled.div`
  ${tw`flex flex-row absolute bottom-14 left-14`}
`;

const Shelf = styled.div`
  ${tw`h-20`}
  ${css`
    background-image: url(${bookshelf});
    background-size: contain;
    background-repeat: no-repeat;
  `}
`;

function BookShelf() {
  return (
    <ShelfWrapper>
      <BookContainer>
        <ChallengeInfo />
      </BookContainer>
      <Shelf />
    </ShelfWrapper>
  );
}

export default BookShelf;
