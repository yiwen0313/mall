<template>
  <div class="cart-list">
      <cart-list-item
        v-for="(item,index) in cartList"
        :key="index"
        :itemInfo="item"/>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import {mapGetters} from "vuex";

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>

</style>
