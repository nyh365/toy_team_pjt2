import React from 'react';
import tw, { styled } from 'twin.macro';
import Button from 'components/common/Button';
import { useNavigate } from 'react-router-dom';

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-screen w-screen`}
`;
const ImgWrapper = styled.div`
  width: 256px;
  // height: 84.73px;
  overflow: hidden;
`;

const TitleWrapper = styled.p`
  ${tw`text-2xl font-bold p-1`}
`;

const ContentWrapper = styled.p`
  ${tw`text-lg text-[#626069]`}
`;
export default function ErrorPage() {
  const navigate = useNavigate();
  console.log('도착했다');
  return (
    <BodyContainer>
      <TitleWrapper>페이지를 찾을 수 없습니다.</TitleWrapper>
      <ContentWrapper>
        찾으려는 페이지의 주소가 잘못 입력되었거나,
      </ContentWrapper>
      <ContentWrapper>
        주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
      </ContentWrapper>
      <ContentWrapper>
        입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
      </ContentWrapper>
      <br />
      <Button title="홈으로" buttonType="black" onClick={() => navigate('/')} />
    </BodyContainer>
  );
}
