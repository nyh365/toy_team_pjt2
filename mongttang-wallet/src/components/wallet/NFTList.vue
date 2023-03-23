<template>
    <h2>
      NFT
    </h2>
    <div v-for="nft in nftList" :key="nft[0]">
      <img src="http://dd93ub3tw0bvd.cloudfront.net/books/1/2/page0"/>
      <div>
        누적 MMT : {{ nft[1] }}        
        <button type="button" class="btn btn-primary">출금하기</button>
      </div>
        
    </div>
  </template>
  
  <script>
  import { getNTFList } from '@/api/blockchain';
  
  export default {
    name: 'NFTList',
    data(){
      return{
        nftList : [],
      }
    },
    created(){
      getNTFList("0x10CA83EdC0E53589B22f23f4dEaAb53EEe70b1f9")
      .then(res => {
        console.log(res);
        this.nftList = res});
    },
  }
  </script>
