import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';
import ImageAdd from './ImageAdd';

import Button from 'components/common/Button';

const BookContentWrapper = styled.div`
  ${tw`flex justify-center w-full mt-[80px]`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const CreateForm = styled.div`
  ${tw`w-[30vw] m-2`}
  ${css`
    height: calc(100vh - 120px);
  `}
`;
const Title = styled.span`
  ${tw`text-[32px]`}
`;
const TitleInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[30vw] h-[40px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const SummaryInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[30vw] h-[150px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ContentInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[30vw] h-[260px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center px-1 py-1`}
`;

const DrawingForm = styled.div`
  ${tw`w-[50vw] w-full flex-col justify-center overflow-auto`}
  ${css`
    height: calc(100vh - 120px);
  `}
`;
function NewBookEditor() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookSummary, setBookSummary] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [buttons, setButtons] = useState([]);
  function addNewButton() {
    setButtons((prevButtons) => [
      ...prevButtons,
      <Button
        key={prevButtons.length}
        title={prevButtons.length}
        buttonType="black"
        className=""
      />,
    ]);
  }
  return (
    <div className="flex">
      <BookContentWrapper>
        <CreateForm>
          <div className="flex justify-between items-center">
            <PageTitle>동화 만들기</PageTitle>
          </div>
          <Title>제목</Title>
          <form action="submit">
            <TitleInputContainer
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              name="Challenge Title"
            />
          </form>

          <Title>줄거리(가이드라인)</Title>
          <form action="submit">
            <SummaryInputContainer
              type="text"
              value={bookSummary}
              onChange={(e) => setBookSummary(e.target.value)}
              name="Challenge Summary"
            />
          </form>
          <Title>스토리 편집</Title>
          <form action="submit">
            <ContentInputContainer
              type="text"
              value={bookContent}
              onChange={(e) => setBookContent(e.target.value)}
              name="Challenge Content"
            />
          </form>
          <ButtonContainer>
            <div className="mx-1">
              <Button title="등록" buttonType="black" className="" />
            </div>
            <div>
              <Button title="취소" buttonType="black" className="" />
            </div>
          </ButtonContainer>
        </CreateForm>
        <DrawingForm>
          <ButtonContainer>
            <ImageAdd />
          </ButtonContainer>
          <Button title="취소" buttonType="black" className="" />
          {buttons}
        </DrawingForm>
      </BookContentWrapper>
    </div>
  );
}

export default NewBookEditor;
