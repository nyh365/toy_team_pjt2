import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import AdminChallengeItem from './AdminChallengeItem';
import Button from 'components/common/Button';

const ChallengeWrapper = styled.div`
  ${tw`flex justify-center w-full mt-10`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const ChallengeList = styled.div`
  width: 50vw;
`;
function AdminChallenge() {
  const pageLimit = 3; //현재 등록된 공지수 / 10?
  const [challenges, setChallenges] = useState();
  // const notice = authApi
  //   .get(requests.GET_NOTICE(pageId, pageLimit))
  //   .then((response) => response.notices.content);
  useEffect(() => {
    const get_challenge_admin = async () => {
      try {
        const { data } = await authApi.get(requests.GET_CHALLENGE_ADMIN());
        // console.log(data);
        setChallenges(data.notices);
        return console.log(data);
      } catch (error) {
        throw error;
      }
    };

    get_challenge_admin();
  }, []);
  const testChallenges = [
    {
      challengeId: 1,
      challengeTitle: '챌린지 제목',
      challengeContent: '챌린지 내용',
      challengeSummary: '챌린지 줄거리',
      challengeStartDate: '2023-02-01T10:27:14',
      challengeEndDate: '2023-02-01T10:27:14',
      createdTime: '2023-03-17T09:11:59',
    },
    {
      challengeId: 2,
      challengeTitle: '챌린지 제목33',
      challengeContent: '챌린지 내용33',
      challengeSummary: '챌린지 줄거리입니다33.',
      challengeStartDate: '2023-02-01T10:27:14',
      challengeEndDate: '2023-02-06T10:27:14',
      createdTime: '2023-03-17T09:14:52',
    },
    {
      challengeId: 3,
      challengeTitle: '챌린지 제목33',
      challengeContent: '챌린지 내용33',
      challengeSummary: '챌린지 줄거리입니다33.',
      challengeStartDate: '2023-02-01T10:27:14',
      challengeEndDate: '2023-02-06T10:27:14',
      createdTime: '2023-03-17T09:16:01',
    },
    {
      challengeId: 4,
      challengeTitle: '챌린지 제목22',
      challengeContent: '챌린지 내용22',
      challengeSummary: '챌린지 줄거리입니다22.',
      challengeStartDate: '2023-02-01T10:27:14',
      challengeEndDate: '2023-02-04T10:27:14',
      createdTime: '2023-03-17T09:42:21',
    },
  ];
  return (
    <div className="ml-[279px] flex">
      <ChallengeWrapper>
        <ChallengeList>
          <div className="flex justify-between items-center">
            <PageTitle>챌린지 관리</PageTitle>
            <Link to="/admin/challenge/create">
              <Button title="작성" buttonType="black" />
            </Link>
          </div>
          {[...testChallenges].map((article) => (
            <AdminChallengeItem
              key={article.challengeId}
              title={article.challengeTitle}
              content={article.challengeContent.replace(/\r\n/gi, '<br>')}
              createdTime={article.createdTime}
            />
          ))}
        </ChallengeList>
      </ChallengeWrapper>
    </div>
  );
}

export default AdminChallenge;
