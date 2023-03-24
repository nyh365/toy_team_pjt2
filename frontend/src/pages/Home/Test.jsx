import React from 'react';
import ChallengeTimer from 'components/common/ChallengeTimer';
import BookShelf from 'components/common/BookShelf';

function Test() {
  const books = [
    {
      bookId: 13,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 12,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
    {
      bookId: 11,
      bookImgUrl:
        'https://bagguimgbucket.s3.ap-northeast-2.amazonaws.com/item/e57fdfa1-804e-43c4-98c5-9d98b91f090d.png',
      artistId: 12,
      artistNickname: 'string type value',
      bookTitle: 'string type value',
      bookSummary: 'string type value',
      numOfLike: 13,
      latesLikeDate: '2023-02-01T10:27:14.153045',
      numOfComment: 14,
    },
  ];

  return (
    <div>
      {/* <ChallengeTimer /> */}
      <BookShelf books={books} width="w-40" height="h-48" />
    </div>
  );
}

export default Test;
