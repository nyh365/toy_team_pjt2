import React from 'react';
import { Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import challengeBg from '../../assets/images/challengeInfo.svg';

const Challenge = styled.div`
  ${tw`relative top-2`}
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
  const title = challenge.challengeTitle;

  const content = challenge.challengeSummary;

  //참가자수
  const participant = challenge.challengeParticipants;

  //챌린지 번호
  const id = challenge.challengeId;

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
