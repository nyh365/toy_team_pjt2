/**
 * 챌린지 남은시간 보여주는 타이머 컴포넌트
 * react-flip-clock-countdown base
 */
import React from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import tw, { styled, css } from 'twin.macro';

const TimerWrapper = styled.div`
  ${tw`flex flex-col items-center`}
  &
    p {
    font-size: 1.2rem;
  }
`;

function ChallengeTimer({ endDate }) {
  const date = new Date(`${endDate}`).getTime();
  // const date = new Date('2023-04-07').getTime(); //더미 데이터

  return (
    <TimerWrapper>
      <FlipClockCountdown
        to={date}
        showLabels={false}
        digitBlockStyle={{
          width: 40,
          height: 60,
          fontSize: 36,
          backgroundColor: '#A3DCCD',
        }}
        dividerStyle={{ color: '', height: 1 }}
        separatorStyle={{ color: 'black', size: '4px' }}
        duration={0.5}
        className="flip-clock"
      />
    </TimerWrapper>
  );
}

export default ChallengeTimer;
