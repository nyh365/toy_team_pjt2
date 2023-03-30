<template>
    <div>      
      SSF : {{ ssf }}
    </div>
    <div>
      MTT : {{ mtt }}
    </div>
    <div>
        <RouterLink to="/trade"><button type="button" class="btn btn-primary">거래소</button></RouterLink>
        <button type="button" class="btn btn-primary">내보내기</button>
        <button type="button" class="btn btn-primary">입금하기</button>
        <button type="button" class="btn btn-primary" v-on:click="createNFT">만들기</button>
        
        <button type="button" class="btn btn-primary" v-on:click="buy">100개 사기</button>
        
        <button type="button" class="btn btn-primary" v-on:click="sell">100개 팔기</button>
        
        <button type="button" class="btn btn-primary" v-on:click="createAccount">주소 생성</button>
    </div>
  </template>
  
  <script>
  import { getMTTBalance, getSSFBalance, makeNFT, buyMMT, sellMMT } from '@/api/blockchain';
  import { createAccount, createRPCInstance } from "@/api";

  export default {
    name: "TokenBalance",
    data(){
      return{
        ssf : 0,
        mtt : 0
      }
    },
    computed: {
      privateKey() {
        console.log("뭐지이게", this.$store.state.privateKey);
        return this.$store.state.privateKey;
      }

    },  
    created(){
      const rpcInstance = createRPCInstance();
      const userAccount = rpcInstance.eth.accounts.privateKeyToAccount(this.privateKey);   
      getMTTBalance(userAccount.address).then(response => {
        this.mtt = response;
      });
      getSSFBalance(userAccount.address).then(response => {
        this.ssf = response;
      });
    },
    methods: {
      createNFT(){
       makeNFT("0x10CA83EdC0E53589B22f23f4dEaAb53EEe70b1f9", "jjjjjjjjjjj");
      },  

      buy(){
        buyMMT(this.privateKey, 100);
      },
      
      sell(){
        sellMMT(this.privateKey, 100);
      },

      createAccount
    }
}
  </script>
  
  <style></style>