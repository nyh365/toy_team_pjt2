import React from 'react';
import tw, { styled, css } from 'twin.macro';
import bookshelf from '../../assets/images/Shelf.svg';
import BookList from './BookList';
import BookListItem from './BookListItem';
import ChallengeInfo from './ChallengeInfo';

import shelf from '../../assets/images/Shelf.svg';

const ShelfContainer = styled.div`
  ${tw`relative mt-[12%]`}
`;

const ChallengeContainer = styled.div`
  ${tw`flex flex-wrap justify-around`}
`;

const BookContainer = styled.div`
  ${tw`flex items-center absolute bottom-16`}
`;

const ShelfWrapper = styled.div`
  ${tw``}
`;

function BookShelf({ books, width, height, challenge }) {
  return (
    <ShelfContainer>
      <ChallengeContainer>
        <BookContainer>
          <ChallengeInfo challenge={challenge} />
          <BookList books={books} width={width} height={height} />
        </BookContainer>
        <ShelfWrapper>
          <img src={shelf} alt="shelf" />
        </ShelfWrapper>
      </ChallengeContainer>
    </ShelfContainer>
  );
}

export default BookShelf;
