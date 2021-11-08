<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar {
    display: flex;
    height: 49px;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, .2);
    background-color: #f6f6f6;

    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
  }

</style>
