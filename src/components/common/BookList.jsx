import React from 'react';
import BookListItem from './BookListItem';
import tw, { styled, css } from 'twin.macro';

const BookListWrapper = styled.div`
  ${tw`flex flex-wrap`}
`;

function BookList({ width, height, books }) {
  if (books.length === 0) {
    return <p>책 내역이 없습니다.</p>; // or return an empty component like <></>
  }
  return (
    <BookListWrapper>
      {books
        ? books.map((book) => (
            <div key={book.bookId}>
              <BookListItem book={book} width={width} height={height} />
            </div>
          ))
        : ''}
    </BookListWrapper>
  );
}

export default BookList;
