import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProfileImg from './ProfileImg';
import tw, { styled, css } from 'twin.macro';
import Button from './Button';
import CommentItem from './CommentItem';
import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

const CommentContainer = styled.div`
  ${tw`flex`}
`;
const UserInfoContainer = styled.div`
  ${tw`flex flex-col mx-2`}
`;
const CommentFormcontainer = styled.div`
  ${tw`flex items-center border-y-2 justify-center mb-2`}
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
const ButtonContainer = styled.div`
  ${tw`flex justify-end my-1`}
`;
const Username = styled.span`
  ${tw`text-[20px]`}
`;
const Comment = styled.span`
  ${tw`text-[50px]`}
`;
function CommentForm() {
  const testComments = [
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
    {
      commentId: 3,
      userId: 12,
      userNickname: '홍길동',
      numOfLike: 13,
      isLiked: false,
      isReported: false,
      commentContent: '동화가 너무 재미있네요3',
      commentCreateDate: '2023-02-01T10:27:14.153045',
    },
  ];

  const navigate = useNavigate();
  const userId = Number(localStorage.getItem('userId'));
  const [comments, setComments] = useState(testComments);
  const [commentContent, setCommentContent] = useState('');
  const submitHandler = () => {
    //댓글 등록 API 호출

    const post_comment_submit = async () => {
      try {
        const response = await authApi.post(requests.POST_COMMENT(userId), {
          commentUserId: userId,
          commentBookId: 1,
          commentContent: commentContent,
        });

        return console.log(response.data);
      } catch (error) {
        throw error;
      }
    };
    post_comment_submit();
    setCommentContent('');
    //댓글목록 받은거 setComments로 넣어주기
  };
  return (
    <div>
      <Comment>
        <Comment>댓글</Comment>
        <CommentFormcontainer>
          <UserInfoContainer>
            <ProfileImg />

            <Username>닉네임</Username>
          </UserInfoContainer>
          <form action="submit">
            <InputContainer
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="감상을 적어주세요"
              name="Comment Content"
            />
            <ButtonContainer>
              <div onClick={submitHandler}>
                <Button title="등록" buttonType="black" className="" />
              </div>
            </ButtonContainer>
          </form>
        </CommentFormcontainer>
        {comments
          ? comments.map((comment) => (
              <div key={comment.commentId}>
                <CommentItem
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              </div>
            ))
          : ''}
      </Comment>
    </div>
  );
}

export default CommentForm;
