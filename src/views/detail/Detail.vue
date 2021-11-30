<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScoll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "network/detail";
import {itemListenerMixin} from "common/mixin";
import {debounce} from "../../common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    // 1.保存传入的 iid
    this.iid = this.$route.params.iid

    // 2.根据 iid请求详细数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 2.1 获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.2获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 2.3获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 2.4获取商品详细信息
      this.detailInfo = data.detailInfo

      // 2.5获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 2.6获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值（对给this.themeTopY赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)

      // console.log(this.themeTopYs);
    }, 100)
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    detailImageLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 400)
    },
    contentScoll(position) {
      // 1.获取y值
      const positionY = -position.y

      // 2.positionY和主题中的值进行对比
      let length = this.themeTopYs.length
      for (let i = 0; i < length-1; i++) {
        if ((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }

        /*if (this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])
          || (i === length -1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }*/
      }
    }
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
