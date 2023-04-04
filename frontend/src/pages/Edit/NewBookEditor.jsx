import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';
import ImageItem from './ImageItem';
import Button from 'components/common/Button';

const BarWrapper = styled.div`
  ${tw`m-0 w-full h-16 flex justify-center items-center`}
`;

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
  ${tw`w-[50vw] flex-col justify-center overflow-auto`}
  ${css`
    height: calc(100vh - 120px);
  `}
`;
function NewBookEditor() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookSummary, setBookSummary] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [images, setImages] = useState([{ id: uuidv4(), file: null }]);
  const navigate = useNavigate();
  const goToList = () => {
    navigate();
  };
  const tempSaveBook = () => {};
  const saveBook = () => {};
  const deleteBook = () => {};
  const handleImageSelect = (id, file) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === id ? { ...img, file } : img)),
    );
  };

  const handleAddImage = () => {
    setImages((prevImages) => [...prevImages, { id: uuidv4(), file: null }]);
  };

  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      'BookContent',
      JSON.stringify({
        challengeId: 2,
        bookId: 2,
        bookTitle,
        bookSummary,
        bookContent,
        isComplete: 'complete', // or 'temporary'
      }),
    );
    images.forEach((img) => formData.append('imgList', img.file));
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

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
              <Button
                title="삭제하기"
                buttonType="mint"
                className=""
                onClick={goToList}
              />
            </div>
            <div>
              <Button
                title="목록으로"
                buttonType="mint"
                className=""
                onClick={goToList}
              />
            </div>
          </ButtonContainer>
          <ButtonContainer>
            <div className="mx-1">
              <Button
                title="임시저장"
                buttonType="mint"
                className=""
                onClick={goToList}
              />
            </div>
            <div>
              <Button
                title="완료하기"
                buttonType="mint"
                className=""
                onClick={goToList}
              />
            </div>
          </ButtonContainer>
        </CreateForm>
        <DrawingForm>
          <form onSubmit={handleSubmit}>
            {images.map((image, index) => (
              <div key={image.id}>
                <ImageItem
                  id={image.id}
                  onImageSelect={handleImageSelect}
                  onDeleteImage={handleDeleteImage}
                />
                <BarWrapper>
                  <input
                    value={index + 1}
                    type="range"
                    min={0}
                    max={images.length}
                    className="w-[30vw]"
                  />
                  {Number.parseInt(index + 1) + '/' + images.length}
                </BarWrapper>
              </div>
            ))}
            <ButtonContainer>
              <div>
                <Button
                  title="템플릿 추가"
                  buttonType="black"
                  className="image-upload-delete"
                  onClick={handleAddImage}
                />
              </div>
            </ButtonContainer>
            <button type="submit">Submit</button>
          </form>
        </DrawingForm>
      </BookContentWrapper>
    </div>
  );
}

export default NewBookEditor;
