<template>
    <h2>
      NFT
    </h2>
    <div v-for="(nftId, idx) in nftIds" :key="nftId">
      <img src="http://dd93ub3tw0bvd.cloudfront.net/books/1/2/page0" width="200"/>
      <div>
        <div>
        토큰 : {{ nftId }}
        </div>
        <div>
          현재 잔액 : {{ nftBalances[idx] }}
        </div> 
        <div>
          총 수익 금액 : {{ nftTotalEarneds[idx] }}
        </div>       
        <button type="button" class="btn btn-primary" v-on:click="doWithdraw(nftId, nftBalaces[idx])">출금하기</button>
      </div>
        
    </div>
  </template>
  
  <script>
  import { getNFTList, withdraw } from '@/api/blockchain';
  import { createRPCInstance } from "@/api";
  
  export default {
    name: 'NFTList',
    data(){
      return{
        nftIds : [],
        nftBalances : [],
        nftTotalEarneds : []
      }
    },
    computed: {
      privateKey() {
        return this.$store.state.privateKey;
      }

    }, 
    created(){
      const rpcInstance = createRPCInstance();
      const userAccount = rpcInstance.eth.accounts.privateKeyToAccount(this.privateKey);  
      console.log("userAddress : " + userAccount.address); 
      getNFTList(userAccount.address)
      .then(res => {
        this.nftIds = res[0];
        this.nftBalances = res[1];
        this.nftTotalEarneds = res[2];        
      })
      .catch(console.error);
    },
    method: {
      doWithdraw(tokenId, amount){
        withdraw(tokenId, amount);
      }
    }
  }
  </script>
