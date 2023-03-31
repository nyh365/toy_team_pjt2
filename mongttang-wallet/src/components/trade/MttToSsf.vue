<template>
  <div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 1개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img class="pointer" v-on:click="sell(100)" src="@/assets/100MTT.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 2개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img class="pointer" v-on:click="sell(200)" src="@/assets/200MTT.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 5개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img class="pointer" v-on:click="sell(500)" src="@/assets/500MTT.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰 10개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img
          class="pointer"
          v-on:click="sell(1000)"
          src="@/assets/1000MTT.png"
        />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/SSAFYCoin.png" class="token-icon" />싸피토큰
        100개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img
          class="pointer"
          v-on:click="sell(10000)"
          src="@/assets/10000MTT.png"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { sellMTT } from "@/api/blockchain";

export default {
  methods: {
    sell(amount) {
      sellMTT(this.$store.state.privateKey, amount);
    },
  },
};
</script>
<style>
.trade-choice {
  margin-bottom: 15px;
}
.buy-button {
  margin-top: 5px;
  color: #ffffff;
  border-style: none;
  background-color: #00d8ff;
}
</style>
