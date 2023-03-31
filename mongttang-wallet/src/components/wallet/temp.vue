<template>
  <br />
  <h1 class="title">내 지갑</h1>
  <hr />
  <h2>{{ ssf }} SSF</h2>
  <h2>{{ mtt }} MTT</h2>
  <hr />
  <div class="container">
    <div class="row">
      <div class="col">
        <div>
          <RouterLink to="/trade"
            ><img src="@/assets/trade.png" height="70"
          /></RouterLink>
        </div>
        거래소
      </div>
      <div class="col">
        <div>
          <img src="@/assets/Polygon2.png" height="70" />
        </div>
        보내기
      </div>
      <div class="col">
        <div>
          <img src="@/assets/deposit.png" height="70" />
        </div>
        입금하기
      </div>
    </div>
    <!-- <RouterLink to="/trade"><img src="@/assets/trade.png"/></RouterLink>
          <button type="button" class="btn btn-primary">내보내기</button>
          <button type="button" class="btn btn-primary">입금하기</button>
          <button type="button" class="btn btn-primary" v-on:click="createNFT">만들기</button>
          
          <button type="button" class="btn btn-primary" v-on:click="buy">100개 사기</button>
          
          <button type="button" class="btn btn-primary" v-on:click="sell">100개 팔기</button>
          
          <button type="button" class="btn btn-primary" v-on:click="createAccount">주소 생성</button> -->
  </div>
</template>

<script>
import {
  getMTTBalance,
  getSSFBalance,
  makeNFT,
  buyMMT,
  sellMMT,
} from "@/api/blockchain";
import { createAccount, createRPCInstance } from "@/api";

export default {
  name: "TokenBalance",
  data() {
    return {
      ssf: 0,
      mtt: 0,
    };
  },
  computed: {
    privateKey() {
      return this.$store.state.privateKey;
    },
  },
  created() {
    const rpcInstance = createRPCInstance();
    const userAccount = rpcInstance.eth.accounts.privateKeyToAccount(
      this.privateKey
    );
    getMTTBalance(userAccount.address).then((response) => {
      this.mtt = response;
    });
    getSSFBalance(userAccount.address).then((response) => {
      this.ssf = response;
    });
  },
  methods: {
    createNFT() {
      makeNFT("0x10CA83EdC0E53589B22f23f4dEaAb53EEe70b1f9", "jjjjjjjjjjj");
    },

    buy() {
      buyMMT(this.privateKey, 100);
    },

    sell() {
      sellMMT(this.privateKey, 100);
    },

    createAccount,

    open() {
      window.open(
        "http://localhost:8080/?key=0x6f2cf4943d60081bdd8179bde2996d83446ab2d0eccca90782ac91cb535e699a",
        "MyWallet",
        "toolbar=no, menubar=no, width=550, height=780"
      );
    },
  },
};
</script>

<style></style>
