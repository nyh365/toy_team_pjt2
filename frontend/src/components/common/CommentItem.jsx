import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import ProfileImg from './ProfileImg';
import Button from './Button';
import useFormatDate from 'hooks/useFormatDate';
import LikeButtonFill from 'assets/icons/LikeButtonFill.svg';
import LikeButtonEmpty from 'assets/icons/LikeButtonEmpty.svg';
import pencil from 'assets/icons/pencil03.svg';
import trashCan from 'assets/icons/trashCan.svg';
const UserInfoContainer = styled.div`
  ${tw`flex flex-col mx-2`}
`;
const CommentFormcontainer = styled.div`
  ${tw`flex flex-nowrap items-center justify-center border-b-2`}
`;

const InputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg mt-4 p-1 w-[900px] h-[80px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;

const CommentContentContainer = styled.span`
  ${tw` flex flex-wrap justify-between my-1 w-[900px] text-[25px]`}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center my-1`}
`;
const Username = styled.span`
  ${tw`text-[22px]`}
`;
const CreaetTime = styled.span`
  ${tw`text-[14px]`}
`;
const NumOfLike = styled.span`
  ${tw`text-[20px] mr-1`}
`;

function CommentItem({ comment, comments, setComments }) {
  const formatDate = useFormatDate(comment.commentCreateDate);
  const [numOfLike, setNumOfLike] = useState(comment.numOfLike);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [editComment, setEditComment] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  const cancleLike = () => {
    setIsLiked(!isLiked);
    setNumOfLike(numOfLike - 1);
    //좋아요 취소 API 호출
  };
  const pressLike = () => {
    setIsLiked(!isLiked);
    setNumOfLike(numOfLike + 1);
    //좋아요 API 호출
  };
  const submitHandler = () => {
    //댓글 등록 API 호출
    setCommentContent('');
    setEditComment(false);
    //댓글목록 API 재 호출
    setComments([
      {
        commentId: 1,
        userId: 13,
        userNickname: '홍길동',
        numOfLike: 13,
        isLiked: true,
        isReported: false,
        commentContent: '동화가 너무 재미있네요1',
        commentCreateDate: '2023-02-01T10:27:14.153045',
      },
      {
        commentId: 2,
        userId: 12,
        userNickname: '홍길동',
        numOfLike: 13,
        isLiked: true,
        isReported: false,
        commentContent: '동화가 너무 재미있네요2',
        commentCreateDate: '2023-02-01T10:27:14.153045',
      },
    ]);
    //댓글목록 다시 불러오면 state에 저장하고 리 렌더링하기 (현재는 테스트용)
  };
  const editCommentHandler = () => {
    setEditComment(true);
  };
  const exitHandler = () => {
    setEditComment(false);
  };
  const deleteCommentHandler = () => {
    //댓글 삭제 api 호출
    // setComments()
  };
  return (
    <CommentFormcontainer>
      <UserInfoContainer>
        <ProfileImg />
        <Username>{comment.userNickname}</Username>
        <CreaetTime>{formatDate}</CreaetTime>
      </UserInfoContainer>
      {editComment ? (
        <form action="submit">
          <InputContainer
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={comment.commentContent}
            name="Comment Content"
          />
          <ButtonContainer>
            <div className="mx-1" onClick={submitHandler}>
              <Button title="수정" buttonType="black" className="" />
            </div>
            <div onClick={exitHandler}>
              <Button title="취소" buttonType="black" className="" />
            </div>
          </ButtonContainer>
        </form>
      ) : (
        <form action="submit">
          <CommentContentContainer>
            {comment.commentContent}
            {comment.userId === 13 ? (
              <img
                src={trashCan}
                alt=""
                className="w-3 h-3"
                onClick={deleteCommentHandler}
              />
            ) : (
              ''
            )}
          </CommentContentContainer>
          <ButtonContainer>
            {isLiked === true ? (
              <img src={LikeButtonFill} alt="" onClick={cancleLike} />
            ) : (
              <img src={LikeButtonEmpty} alt="" onClick={pressLike} />
            )}
            <NumOfLike>{numOfLike}</NumOfLike>
            {/* 나중에 local에 저장된 유저 Id와 비교 */}
            {comment.userId === 13 ? (
              <img
                src={pencil}
                alt=""
                className="w-4 h-4 mr-[6px]"
                onClick={editCommentHandler}
              />
            ) : (
              <Button title="신고" buttonType="black" />
            )}
          </ButtonContainer>
        </form>
      )}
    </CommentFormcontainer>
  );
}

export default CommentItem;
