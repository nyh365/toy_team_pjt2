<template>
  <div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/MonttangCoin.png" class="token-icon" />몽땅토큰
        100개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img class="pointer" v-on:click="buy(100)" src="@/assets/1SSF.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/MonttangCoin.png" class="token-icon" />몽땅토큰
        200개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img class="pointer" v-on:click="buy(200)" src="@/assets/2SSF.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/MonttangCoin.png" class="token-icon" />몽땅토큰
        500개r
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img class="pointer" v-on:click="buy(500)" src="@/assets/5SSF.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/MonttangCoin.png" class="token-icon" />몽땅토큰
        1000개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img class="pointer" v-on:click="buy(1000)" src="@/assets/10SSF.png" />
      </div>
    </div>
    <div class="row trade-choice">
      <div class="col-5">
        <img src="../../assets/MonttangCoin.png" class="token-icon" />몽땅토큰
        10000개
      </div>
      <div class="col-3"></div>
      <div class="col-4">
        <img
          class="pointer"
          v-on:click="buy(10000)"
          src="@/assets/100SSF.png"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { buyMTT } from "@/api/blockchain";

export default {
  methods: {
    buy(amount) {
      buyMTT(this.$store.state.privateKey, amount);
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
