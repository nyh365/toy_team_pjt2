import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import tw, { styled } from 'twin.macro';

const ButtonContainer = styled.div`
  ${tw`w-fit h-[24px] p-1 py-[12px] text-sub-bold text-black rounded-full flex justify-center items-center shadow`}
  ${(props) =>
    props.buttonType === 'mint'
      ? tw`bg-btnMint text-black`
      : tw`bg-btnBlack text-whiteText`}
`;

function Button({ title, buttonType }) {
  const [type, setType] = useState('');
  useEffect(() => {
    setType(buttonType);
  }, []);
  return (
    <>
      <div className={`${type === 'mint' ? '' : 'hidden'}`}>
        <ButtonContainer buttonType={type}>
          <span>{title}</span>
        </ButtonContainer>
      </div>
      <div className={`${type === 'black' ? '' : 'hidden'}`}>
        <ButtonContainer buttonType={type}>
          <span>{title}</span>
        </ButtonContainer>
      </div>
    </>
  );
}

export default Button;
