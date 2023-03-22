<template>
    <H2>
      NFT
    </H2>
    <div>
      NFTs come here
    </div>
    <div>
      <img src="http://dd93ub3tw0bvd.cloudfront.net/books/1/2/page0"/>
      <div>
        누적 MMT : {{ mmt }}
        <button type="button" class="btn btn-primary">출금하기</button>
      </div>
        
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        mmt : 3,
      }
    }
  }
  </script>
