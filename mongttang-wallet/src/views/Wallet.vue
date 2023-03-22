<template>
  현재 주소 : {{ address }}
  <TokenBalance></TokenBalance>
  <NFTList></NFTList>
</template>

<script>
import TokenBalance from '@/components/wallet/TokenBalance.vue';
import NFTList from '@/components/wallet/NFTList.vue';

// import { API_BASE_URL } from '@/config';

export default {
  name: 'WalletView',
  created() {
    this.getAddress();
  },
  data() {
    return {
      address : 1324,
    }
  },
  methods: {
    getAddress() {
      let id = `123`;
      this.$store.dispatch("getAddress", id);    
    //   axios.get(`${API_BASE_URL}/api/user`, {}).then(res => {
    //     console.log(res.data);
    //   })  
    }
  },
  components: {
    TokenBalance,
    NFTList,
  }
}
</script>
