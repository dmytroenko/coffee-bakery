<template>
  <div class="coffee-list">
    <Menu></Menu>
    <OrderPopup v-if="isOpenOrderPopup"></OrderPopup>
    <div class="coffee-card" v-for="(coffee, index) in coffeeData" :key="index">
      <div class="coffee-card__info">
        <h3 class="coffee-card__title">{{ coffee.name }}</h3>
        <p class="coffee-card__description">{{coffee.description}}</p>
        <div class="coffee-card__current-price">{{ currentPrices[index].toFixed(2) }} USD</div>
        <div
          class="coffee-card__add-btn"
          @click="addBeverageToOrder(coffee, currentPrices[index])"
        >+ add to order</div>
      </div>
      <div class="coffee-card__product">
        <div class="coffee-card__img">
          <img :src="coffee.img" :alt="coffee.name" />
        </div>
        <div class="coffee-card__sizes">
          <span
            v-for="(cost, i) in coffee.prices"
            :key="i"
            class="coffee-card__size"
            @click="setCurrentPrices(cost, index)"
          >{{ i.toUpperCase() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderPopup from "./OrderPopup";
import Menu from "./Menu.vue";
import Vue from "vue";
// import StarIcon from "./StarIcon";
import { mapState, mapMutations } from "vuex";
import coffee from "../data/coffee";

export default {
  name: "CoffeeList",
  components: {
    OrderPopup,
    Menu
  },
  data: () => ({
    currentPrices: []
  }),
  computed: {
    ...mapState(["coffeeData", "isOpenOrderPopup", "orderList", "price"])
  },
  created() {
    if (this.coffeeData.length === 0) {
      this.updateState({
        coffeeData: coffee
      });
    }
    this.currentPrices = this.coffeeData.map(item => item.prices.s);
  },
  methods: {
    ...mapMutations(["updateState"]),
    setCurrentPrices(coffee, index) {
      Vue.set(this.currentPrices, index, coffee);
    },
    addBeverageToOrder(newBeverage, currentPrice) {
      const currentBeverages = this.orderList.beverages;
      let priceFromOrder = this.price;
      // eslint-disable-next-line no-unused-vars
      let choosedSize;

      for (let key in newBeverage.prices) {
        if (newBeverage.prices[key] === currentPrice) {
          choosedSize = key;
        }
      }

      currentBeverages.push({
        ...newBeverage,
        choosedSize,
        choosedPrice: currentPrice
      });

      priceFromOrder += currentPrice;

      this.updateState({
        orderList: {
          ...this.orderList,
          beverages: currentBeverages
        },
        price: priceFromOrder
      });
    }
  }
};
</script>

<style lang="scss">
.coffee-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.coffee-card {
  display: flex;
  border-radius: 8px;
  max-width: 324px;
  width: 324px;
  margin: 12px;
  transition: 1s;

  &:hover img {
    width: 100px;
  }

  &__info {
    padding: 8px;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    background-color: #682a13;
    color: #fff;
  }

  &__product {
    padding: 8px;
    border: 1px solid #682a13;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &__img {
    height: 70px;
    margin-top: 16px;
    margin-bottom: 32px;
    img {
      width: 90px;
      transition: 0.4s;
    }
  }

  &__current-price {
    font-weight: 700;
    margin-bottom: 8px;
  }

  &__sizes {
    display: flex;
    justify-content: space-around;
    cursor: pointer;
  }

  &__size {
    font-weight: 600;
    color: #ccc;
  }

  &__add-btn {
    width: fit-content;
    padding: 3px 8px;
    border: 1px solid #fff;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 12px;
    transition: 0.4s;

    &:hover {
      background-color: #fff;
      color: #682a13;
    }
  }
}
</style>