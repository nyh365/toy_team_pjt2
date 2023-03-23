<template>
    <h2>
      NFT
    </h2>
    <div>
      NFTs come here
      {{ nftList }}
    </div>
    <div v-for="nft in nftList" :key="nft">
      <img src="http://dd93ub3tw0bvd.cloudfront.net/books/1/2/page0"/>
      <div>
        누적 MMT :         
        <button type="button" class="btn btn-primary">출금하기</button>
      </div>
        
    </div>
  </template>
  
  <script>
  export default {
    name: 'NFTList',
    computed : {
    },
  }
  </script>
