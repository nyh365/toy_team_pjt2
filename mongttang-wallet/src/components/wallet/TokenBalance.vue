<template>
    <div>        
      SSF : {{ ssf }}
    </div>
    <div>
      MMT : {{ mtt }}
    </div>
    <div>
        <button type="button" class="btn btn-primary">거래소</button>
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
    created(){
      this.mtt = getMTTBalance("0x10CA83EdC0E53589B22f23f4dEaAb53EEe70b1f9");
      this.ssf = getSSFBalance("0x10CA83EdC0E53589B22f23f4dEaAb53EEe70b1f9");
    },
}
  </script>
  
  <style></style>