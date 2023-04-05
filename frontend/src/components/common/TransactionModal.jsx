import React, { useEffect, useRef, useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import { userStore } from 'store/userStore';
import useOutsideClick from 'hooks/useOutsideClick';
import Coin from '../../assets/icons/Coin.svg';
import Web3 from 'web3';

const ModalOverlay = styled.div`
  ${tw`flex items-center justify-center z-50 h-3/5 w-full h-2/3 fixed `}
`;

const ModalWrapper = styled.div`
  ${tw`bg-white flex flex-col items-center absolute border-solid rounded-2xl h-auto shadow mt-[50%] mb-[50%] font-edu`}
`;

const PriceWrapper = styled.div`
  ${tw`text-[#626069] flex flex-row items-center underline underline-offset-4 px-1`}
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col justify-center items-center px-4 pt-2 text-lg space-y-1`}
`;

const BtnContainer = styled.div`
  ${tw`bg-[#D6D3CE] text-[#626069] flex flex-row mt-1 w-full h-full space-x-10 justify-center text-lg rounded-b-2xl`}
`;

const BtnWrapper = styled.div`
  ${tw`py-2`}
`;

export default function TransactionModal({ bookId, onClose }) {
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
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
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
    //현재 잔액과 작품 구독비 비교
    //잔액이 모자랄 시 구매버튼 누르면 거래소로 안내
    // if (window.confirm('잔액이 부족합니다. 거래소로 이동하시겠습니까?')) {
    //   openWallet();
    // }
    //구매요청 -> 블록체인 네트워크
    //구매요청 -> 백엔드
    //정상적으로 처리가 되면 viewer로 이동
    alert('작품 구매가 완료되었습니다.');
    navigate(`/books/viewer/${bookId}`);
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
          <PriceWrapper>
            <img src={Coin} alt="coin" />
            코인 차감 안내
          </PriceWrapper>
          <div>현재 보유 코인 : 1.739 MTT</div>
          <div>구매 후 코인 : 0.739 MTT</div>
        </ContentContainer>

        <BtnContainer>
          {/* 잔액 부족하면 구매버튼 비활성화 */}
          <BtnWrapper>
            <button onClick={buyBook}>구매</button>
          </BtnWrapper>
          <BtnWrapper>
            <button onClick={onClose}>취소</button>
          </BtnWrapper>
        </BtnContainer>
      </ModalWrapper>
    </ModalOverlay>
  );
}
