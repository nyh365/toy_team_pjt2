import React from 'react';

function FormatDate(rawDate) {
  /*
< prop >
1. rawDate : "2023-02-15 00:36:06"과 같은 형식의 raw 데이터

< 반환값 >
{년, 월, 일, 시, 분}을 담은 객체를 반환
*/
  // console.log('rawDate', rawDate);
  const date = new Date(rawDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}.${month}.${day}`;
}

export default FormatDate;
