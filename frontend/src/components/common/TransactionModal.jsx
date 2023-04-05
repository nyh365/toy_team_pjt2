import React, { useEffect, useRef, useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { userStore } from 'store/userStore';
import useOutsideClick from 'hooks/useOutsideClick';
import Web3 from 'web3';

const ModalOverlay = styled.div`
  ${tw`flex items-center justify-end z-50 h-3/5 w-full top-[8vh] right-[2vw] fixed`}
`;

const ModalWrapper = styled.div`
  ${tw`bg-white flex flex-col items-center absolute border-solid rounded-2xl h-auto shadow mt-[50%] mb-[50%] font-sans`}
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col justify-center items-center p-0.5 pt-0 text-lg `}
`;

const BtnWrapper = styled.div`
  ${tw`flex flex-col py-2 w-full bg-[#D6D3CE] text-[#626069] rounded-b-2xl`}
`;

export default function TransactionModal({ onClose }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const wallet = userStore((state) => state.userWallet);

  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  //모달 외부 클릭시 모달창 꺼짐
  useOutsideClick(modalRef, handleClose);

  useEffect(() => {
    // const $body = document.querySelector('body');
    // const overflow = $body.style.overflow;
    // $body.style.overflow = 'hidden';
    // return () => {
    //   $body.style.overflow = overflow;
    // };
  }, []);

  const openWallet = () => {
    onClose();
    window.open(
      `http://j8a308.p.ssafy.io:3333/trade/?key=${wallet}`,
      'MyWallet',
      'toolbar=no, menubar=no, width=550, height=780',
    );
  };

  const buyBook = () => {
    //구매요청 보내고
    //정상적으로 처리가 되면 viewer로 이동
  };

  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ContentContainer>
          {/**
           *  코인차감안내
           *  현재 보유 코인
           *  구매 후 남는 코인
           *  지갑 또는 거래소 이동 버튼
           */}
          <p>코인 차감 안내</p>
          <p>현재 보유 코인</p>
          <p>구매 후 남는 코인</p>
        </ContentContainer>

        <BtnWrapper>
          <button onClick={onClose}>취소</button>
        </BtnWrapper>
        {/* 잔액 부족하면 구매버튼 비활성화 */}
        <BtnWrapper>
          <button onClick={buyBook}>구매</button>
        </BtnWrapper>
      </ModalWrapper>
    </ModalOverlay>
  );
}
