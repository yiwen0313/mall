<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";

import {getDetail} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null
    }
  },
  created() {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid

    // 2.根据 iid请求详细数据
    getDetail(this.iid).then(res => {

    })
  }
}
</script>

<style scoped>

</style>
