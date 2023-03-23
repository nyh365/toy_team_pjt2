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
    </div>
  </template>
  
  <script>
  import { getMTTBalance, getSSFBalance } from '@/api/blockchain';

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
        return this.$store.state.privateKey;
      }

    },  
    created(){
      getMTTBalance(this.privateKey).then(response => {
        this.mtt = response;
      });
      getSSFBalance(this.privateKey).then(response => {
        this.ssf = response;
      });
    },
}
  </script>
  
  <style></style>