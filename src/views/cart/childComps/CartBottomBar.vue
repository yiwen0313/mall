<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-all"/>
      <span>全选</span>
    </div>

    <div class="price">合计: {{totalPrice}}</div>
    <div class="buy">去结算: {{checkLength}}</div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkBotton/CheckButton";

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    width: 100%;
    height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;

    display: flex;
    line-height: 40px;
  }

  .check-content {
    display: flex;
    height: 40px;
    font-size: 14px;
    align-items: center;

    margin-left: 10px;
    line-height: 0;
    width: 60px;
  }

  .check-all {
    width: 20px;
    height: 20px;

    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
    font-size: 14px;
  }

  .buy {
    width: 85px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
</style>
