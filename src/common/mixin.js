import {debounce} from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 1.图片加载完成啊的事件监听
    // 对refresh非常频繁的问题，进行防抖操作
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    // 监听item中图片的加载完成
    this.itemImgListener = () => {
      this.newRefresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}