<template>
  <div class="sweets-list">
    <Menu></Menu>
    <OrderPopup v-if="isOpenOrderPopup"></OrderPopup>
    <div class="sweets-card" v-for="(sweet, index) in sweets" :key="index">
      <div class="sweets-card__img">
        <img :src="sweet.img" :alt="sweet.name" />
      </div>
      <h3 class="sweets-card__title">{{sweet.name}}</h3>
      <div class="sweets-card__price">{{ sweet.price.toFixed(2) }} USD</div>
      <div class="sweets-card__add-btn" @click="addSweet(sweet)">+ add to order</div>
    </div>
  </div>
</template>

<script>
import OrderPopup from "./OrderPopup";
import Menu from "./Menu.vue";
import { mapState, mapMutations } from "vuex";
import sweets from "../data/sweets";

export default {
  name: "Sweets",
  components: {
    OrderPopup,
    Menu
  },
  computed: {
    ...mapState(["sweets", "isOpenOrderPopup", "orderList", "price"])
  },
  created() {
    if (this.sweets.length === 0) {
      this.updateState({
        sweets
      });
    }
  },
  methods: {
    ...mapMutations(["updateState"]),
    addSweet(sweet) {
      const sweetsList = this.orderList.sweets;
      let currentPrice = this.price;

      sweetsList.push(sweet);
      currentPrice += sweet.price;

      this.updateState({
        orderList: {
          ...this.orderList,
          sweets: sweetsList
        },
        price: currentPrice
      });
    }
  }
};
</script>

<style lang="scss">
.sweets-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.sweets-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  max-width: 300px;
  margin: 12px;
  transition: 1s;
  border: 1px solid #ccc;
  min-height: 300px;

  &__img {
    height: 190px;
    width: 100%;
    margin: 0 0 8px 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-left-radius: 8px;
    }
  }

  &__add-btn {
    width: fit-content;
    padding: 3px 8px;
    margin-left: 8px;
    border: 1px solid #fff;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    transition: 0.4s;
    background-color: #682a13;
    color: #fff;

    &:hover {
      background-color: #fff;
      color: #682a13;
      border: 1px solid #682a13;
    }
  }

  &__title {
    margin: 0 8px;
    color: #682a13;
    font-size: 24px;
  }

  &__price {
    font-weight: 600;
    font-size: 16px;
    color: #ccc;
    margin-bottom: 8px;
    margin-left: 8px;
  }
}
</style>
