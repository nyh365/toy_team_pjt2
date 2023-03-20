import React from 'react';
import { Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import challengeBg from '../../assets/images/challengeInfo.svg';

const Challenge = styled.div`
  ${tw`relative `}
`;

const ImageWrapper = styled.div`
  ${tw`w-3/4 h-3/4`}
`;

const TextContainer = styled.div`
  ${tw`w-3/4 absolute p-1 px-3`}
`;

const TextWrapper = styled.div`
  ${tw`h-28 overflow-hidden `}
`;

const TitleWrapper = styled.p`
  ${tw`text-xl`}
`;
const ContentWrapper = styled.p`
  ${tw`text-sm m-0.5`}
`;
const LinkWrapper = styled.div`
  ${tw`text-right text-sm`}
`;

function ChallengeInfo({ challenge }) {
  // const title = challenge.challengeTitle;
  const title = '토끼와거북이';

  // const content = challenge.challengeSummary;
  const content = `옛날 옛적에, 토끼와 거북이가 살고 있었다. 토끼는 매우 빨랐고, 거북이는 매우 느렸다. 어느날..ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ`;

  //참가자수
  // const participant = challenge.challengeParticipants;

  //챌린지 번호
  // const id = challenge.challengeId;
  const id = 10;

  return (
    <Challenge>
      <TextContainer>
        <TextWrapper>
          <TitleWrapper>{title}</TitleWrapper>
          <ContentWrapper>{content}</ContentWrapper>
        </TextWrapper>
        <LinkWrapper>
          <Link to={`/challenge/${id}`}>더 많은 동화 보러가기 →</Link>
        </LinkWrapper>
      </TextContainer>
      <ImageWrapper>
        <img src={challengeBg} alt="challengeImg" />
      </ImageWrapper>
    </Challenge>
  );
}

export default ChallengeInfo;
