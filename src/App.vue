<template>
  <div id="app">
    <router-view></router-view>
    <OrderBtn></OrderBtn>
  </div>
</template>

<script>
import OrderBtn from "./components/OrderBtn";
export default {
  name: "App",
  components: {
    OrderBtn
  }
};
</script>

<style lang="scss">
@import "./scss/global";
</style>