<template>
  <TokenBalance></TokenBalance>
  <NFTList></NFTList>
</template>

<script>
import TokenBalance from '@/components/wallet/TokenBalance.vue';
import NFTList from '@/components/wallet/NFTList.vue';

// import { API_BASE_URL } from '@/config';

export default {
  name: 'WalletView',
  components: {
    TokenBalance,
    NFTList,
  }
}
</script>
