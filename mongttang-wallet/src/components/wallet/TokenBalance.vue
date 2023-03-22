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
    </div>
  </template>
  
  <script>
  export default {
    name: "TokenBalance",  
    data() {
    return {
      ssf : 123,
      mtt : 234,
    }
  },
}
  </script>
  
  <style></style>