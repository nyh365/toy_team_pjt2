import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import AdminNoticeItem from './AdminNoticeItem';
import Button from 'components/common/Button';

const NoticeWrapper = styled.div`
  ${tw`flex justify-center w-full mt-10`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const NoticeList = styled.div`
  width: 50vw;
`;
function AdminNotice() {
  const pageLimit = 3; //현재 등록된 공지수 / 10?
  // const notice = authApi
  //   .get(requests.GET_NOTICE(pageId, pageLimit))
  //   .then((response) => response.notices.content);

  const notice = [
    {
      noticeId: 7,
      noticeTitle: '[공지] 서비스 점검시간 안내',
      noticeContent: `안녕하세요. 몽땅연필 관리팀입니다.
        총 6시간에 걸쳐 서비스 점검이 시작됩니다.
        [점검 예상 시간]  09:00 ~ 15:00
        이용에 불편을 드려서 죄송합니다.`,
      createdTime: '2023-03-15T16:04:54',
    },
    {
      noticeId: 6,
      noticeTitle: '[공지] 불량 게시물 제재 안내',
      noticeContent: `이하와 같은 게시물을 제재하였습니다.

      "ㅎㅇㅎㅇ"
      "ㅇㅇㅇ"
      
      `,
      createdTime: '2023-03-15T16:02:03',
    },
    {
      noticeId: 5,
      noticeTitle: '공지사항 제목11',
      noticeContent: `공지사항 내용11`,
      createdTime: '2023-03-15T15:39:44',
    },
  ];
  return (
    <div className="ml-[279px] flex">
      <NoticeWrapper>
        <NoticeList>
          <div className="flex justify-between items-center">
            <PageTitle>공지사항</PageTitle>
            <Link to="/admin/notice/create">
              <Button title="작성" buttonType="black" />
            </Link>
          </div>
          {[...notice].map((article) => (
            <AdminNoticeItem
              key={article.noticeId}
              title={article.noticeTitle}
              content={article.noticeContent.replace(/\r\n/gi, '<br>')}
              createdTime={article.createdTime}
            />
          ))}
        </NoticeList>
      </NoticeWrapper>
    </div>
  );
}

export default AdminNotice;
