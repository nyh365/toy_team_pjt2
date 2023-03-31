<template>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4">
      <h2>{{ ssf }} SSF</h2>
      <h2>{{ mtt }} MTT</h2>
    </div>
    <div class="col-2"></div>
    <div class="col-2 pointer" @click="[doGetMTTBalance(), doGetSSFBalance()]">
      <img src="@/assets/pngwing.png" height="50" />
      <div style="font-size: smaller">잔액 <br />새로고침</div>
    </div>
  </div>
</template>

<script>
import { getMTTBalance, getSSFBalance } from "@/api/blockchain";

export default {
  name: "TokenBalance",
  data() {
    return {
      ssf: 0,
      mtt: 0,
      privateKey: this.$store.state.privateKey,
      address: this.$store.state.address,
    };
  },
  created() {
    this.doGetMTTBalance();
    this.doGetSSFBalance();
  },
  methods: {
    doGetMTTBalance() {
      console.log("두겟두겟");
      getMTTBalance(this.address).then((response) => {
        this.mtt = response;
      });
    },
    doGetSSFBalance() {
      console.log("두");
      getSSFBalance(this.address).then((response) => {
        this.ssf = response;
      });
    },
  },
};
</script>

<style></style>
