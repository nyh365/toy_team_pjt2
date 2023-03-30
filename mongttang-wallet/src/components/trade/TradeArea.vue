<template>
    <div class="trade-area">
        <!--구입, 판매 상단메뉴-->
        <div class="trade-title">
            토큰교환
        </div>
        

        <div class="row token-choice">  
            <div class="col-6" id="ssfTomtt" @click="showSsfToMtt">
                SSF<img src="../../assets/ssfIcon.png" class="token-icon"><img src="../../assets/arrow.png" class="token-icon">MTT<img src="../../assets/mttIcon.png" class="token-icon">
            </div>
            <div class="col-6" id="mttTossf" @click="showMttToSsf">
                MTT<img src="../../assets/mttIcon.png" class="token-icon"><img src="../../assets/arrow.png" class="token-icon">SSF<img src="../../assets/ssfIcon.png" class="token-icon">
            </div>
        </div>
        <div class="row token-count">  
            <div class="col-4">
                <img src="../../assets/pngwing.png" class="token-icon">보유한 토큰
            </div>
            <div class="col-4">
                {{ ssf }} SSF<img src="../../assets/ssfIcon.png" class="token-icon">
            </div>
            <div class="col-4">
                {{ mtt }} MTT<img src="../../assets/mttIcon.png" class="token-icon">
            </div>
            
        </div>
        <!--상단메뉴 선택에 따라 구입, 판매메뉴 컴포넌트 변경-->
        <div v-if="ssfToMttStatus"><SsfToMtt></SsfToMtt></div>
        <div v-if="mttToSsfStatus"><MttToSsf></MttToSsf></div>
    </div>
</template>
<script>
import { getMTTBalance, getSSFBalance } from '@/api/blockchain';
import SsfToMtt from '@/components/trade/SsfToMtt.vue';
import MttToSsf from '@/components/trade/MttToSsf.vue';

export default {
    name: "TradeArea",
    components: {
        SsfToMtt,
        MttToSsf,
    },
    methods: {
        showSsfToMtt: function() {
            ssfToMttStatus = true;
            mttToSsfStatus = false;
        },
        showMttToSsf: function() {
            ssfToMttStatus = false;
            mttToSsfStatus = true;
        },
    },
    data() {
        return {
            ssf : 0,
            mtt : 0,
            ssfToMttStatus : true,
            mttToSsfStatus : false,
        }
    },
    computed: {
        privateKey() {
            console.log("Holy", this.$store.state.privateKey);
            return this.$store.state.privateKey;
        }
    },
    created() {
        getSSFBalance(this.privateKey).then(response => {
            this.ssf = response;
        });
        getMTTBalance(this.privateKey).then(response => {
            this.mtt = response;
        });  
    }
}
</script>
<style>
#ssfTomtt:hover {
    background-color: #B2EBF4;
    cursor: pointer;
}
#mttTossf:hover {
    background-color: #B2EBF4;
    cursor: pointer;
}
.row {
    padding-top: 10px;
    padding-bottom: 10px;
}
.token-count {
    padding-bottom: 10px;
    border-bottom: 1px solid #EAEAEA;
}
.token-choice {
    font-size: 20px;
    border-bottom: 1px solid #EAEAEA;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 0px;
}
.token-icon {
    height: 30px;
    width: 30px;
    margin: 5px;
}
.trade-title {
    height: 40px;
    font-size: 20px;
    border-bottom: 1px solid #EAEAEA;
}
.trade-area {
    padding-top: 10px;
    margin: 40px auto;
    width: 500px;
    height: 500px;
    border: 1px solid #EAEAEA;
}
.top-area {
    padding: 0px;
    display: flex;
    height: 50px;
    list-style: none;
}
li {
    position: relative;
    width: 50%;
    height: 100%;
}
.tab-menu {
    font-size: 20px;
    position: absolute;
    left: 45%;
    top: 30%;
    text-align: center;
    font-weight: bold;
}
</style>