<template>
    <div>
    
        <span class="trade-left-menu">수량</span>
        <input v-model="price"><div></div>

        <button class="trade-request">구매</button>
    </div>
</template>
<style>
.trade-left-menu {
    font-weight: bold;
    margin-left: 20px;
    margin-right: 20px;
    width: 130px;
    height: 40px;
    
    align-items: center;
}
.trade-request {
    margin-top: 20px;
}
</style>