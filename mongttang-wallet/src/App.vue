<template>
  <router-view />
</template>

<script>
import { createRPCInstance } from "@/api";

export default {
  created() {
    const URLSearch = new URLSearchParams(location.search);
    const privateKey = URLSearch.get(`key`);
    console.log(privateKey);
    this.$store.commit("SET_PRIVATEKEY", privateKey);
    const rpcInstance = createRPCInstance();
    const userAccount =
      rpcInstance.eth.accounts.privateKeyToAccount(privateKey);
    this.$store.commit("SET_ADDRESS", userAccount.address);
  },
};
</script>

<style>
@font-face {
  font-family: "GangwonEdu_OTFBoldA";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.title {
  color: #34bbbb;
}
#app {
  font-family: "GangwonEdu_OTFBoldA";
  text-align: center;
}
</style>
