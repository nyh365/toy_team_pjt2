import React, { useState } from 'react';
import FormatDate from 'utils/FormatDate';

import tw, { styled, css } from 'twin.macro';
import upToggleBtn from '../../assets/icons/upToggle.svg';
import downToggleBtn from '../../assets/icons/downToggle.svg';

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 0.9em;
  font-weight: 700;
`;
const Time = styled.div`
  display: block;
  font-size: 0.5em;
  font-weight: 200;
`;
const ToggleButton = styled.button`
  margin-top: 0.3em;
  display: inline-block;
  width: 1em;
  height: 1em;
  outline: none;
`;

const ContentContainer = styled.div``;
const Content = styled.section`
  font-family: Pretendard;
  font-size: 0.7rem;
  background-color: #d6d3cd;
  white-space: pre-line;
  padding: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
`;

function NoticeListItem({ title, content, createdTime }) {
  const [isRead, setIsRead] = useState(false);
  const { year, month, day, hour, minute } = FormatDate(createdTime);

  const readContent = () => {
    setIsRead(!isRead);
  };

  return (
    <div>
      <hr />
      <TitleContainer onClick={readContent}>
        <Title>{title}</Title>
        <ToggleButton>
          {isRead ? (
            <img src={upToggleBtn} alt="" />
          ) : (
            <img src={downToggleBtn} alt="" />
          )}
        </ToggleButton>
      </TitleContainer>
      <Time>
        {year}-{month}-{day} {hour}:{minute}
      </Time>

      <ContentContainer>
        {isRead ? <></> : <Content>{content}</Content>}
      </ContentContainer>
    </div>
  );
}

export default NoticeListItem;
