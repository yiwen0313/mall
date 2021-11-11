<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";

  import {getHomeMultidata} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper
    },
    data() {
      return {
        banners: [],
        recommend: []
      }
    },
    created() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
