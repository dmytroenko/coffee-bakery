<template>
  <div class="order-btn" @click="openOrderPopup" v-if="price">order details {{ currentPrice }}</div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "OrderBtn",
  computed: {
    ...mapState(["isOpenOrderPopup", "price"]),
    currentPrice() {
      return this.price ? `(${this.price.toFixed(2)} USD)` : "";
    }
  },
  methods: {
    ...mapMutations(["updateState"]),
    openOrderPopup() {
      this.updateState({
        isOpenOrderPopup: true
      });
    }
  }
};
</script>

<style lang="scss">
.order-btn {
  position: fixed;
  top: calc(50% - 20px);
  right: -120px;
  transform: rotate(-90deg);
  padding: 8px 16px;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 700;
  border-radius: 6px;
  border: 1px solid #fff;
  color: #fff;
  background-color: #682a13;
  cursor: pointer;
}
</style>