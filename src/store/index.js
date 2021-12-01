import Vue from "vue";
import Vuex from "vuex"

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      // 1.查找之前的数组是否有该商品
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      // 2.判断oldProduct
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }

    }
  }
})

// 3.导出store(为了挂载到Vue实例上)
export default store
