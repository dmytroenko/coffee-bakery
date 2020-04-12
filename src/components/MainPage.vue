<template>
  <div class="main-page">
    <HelloPopup v-if="isOpenHelloPopup"></HelloPopup>
    <OrderPopup v-if="isOpenOrderPopup"></OrderPopup>
    <Menu></Menu>
    <div class="container">
      <div class="main-page__card" @click="addFavouriteBeverage">
        <p>{{ helloMessage }}</p>
      </div>
      <div class="main-page__card">
        <router-link :to="{ name: 'CoffeeList' }" class="main-page__link">
          <p>{{ guestNick }}, you always can choose another beverage</p>
        </router-link>
      </div>
    </div>
    <div class="container main-page__order-desk">
      <img src="../assets/barista.jpg" alt />
    </div>
    <div class="container">
      <div class="main-page__card">
        <router-link :to="{ name: 'Sweets' }" class="main-page__link">
          <p>We have fantastic sweets! Do you wanna taste it?</p>
        </router-link>
      </div>
      <div class="main-page__card main-page__card--non-clickable">
        <p>You always can choose amount of sugar in details of your order!</p>
      </div>
    </div>
  </div>
</template>

<script>
// components
import HelloPopup from "./HelloPopup";
import OrderPopup from "./OrderPopup.vue";
import Menu from "./Menu.vue";

// vuex
import { mapMutations, mapState } from "vuex";

// data from local json file
import coffeeData from "../data/coffee";

export default {
  name: "App",
  data: () => ({
    body: document.querySelector("body")
  }),
  components: {
    HelloPopup,
    OrderPopup,
    Menu
  },
  computed: {
    ...mapState([
      "coffeeData",
      "isOpenHelloPopup",
      "isOpenOrderPopup",
      "guestName",
      "favouriteCoffee",
      "orderList",
      "price"
    ]),
    guestNick() {
      return this.guestName || "Darling";
    },
    helloMessage() {
      const phrase = this.favouriteCoffee
        ? `Do you want to get ${this.favouriteCoffee} like usual ?`
        : `What do you want to drink?`;

      return `Hello, ${this.guestNick}! ${phrase}`;
    }
  },
  methods: {
    ...mapMutations(["updateState"]),
    test() {
      console.log(this);
    },
    openOrderPopup() {
      this.updateState({
        isOpenOrderPopup: true
      });
    },
    addFavouriteBeverage() {
      const updatedBeverages = this.orderList.beverages;
      let [currentCoffee] = coffeeData.filter(
        item => item.name === this.favouriteCoffee
      );
      let updatedPrice = this.price;

      updatedBeverages.push({
        ...currentCoffee,
        choosedSize: "m",
        choosedPrice: currentCoffee.prices.m
      });
      updatedPrice += currentCoffee.prices.m;

      this.updateState({
        orderList: {
          ...this.orderList,
          beverages: updatedBeverages
        },
        price: updatedPrice
      });
    },
    toPage() {
      this.$route.path = "/coffee-list";
    }
  },
  created() {
    this.updateState({
      coffeeData
    });
    this.body.classList.add("overflow-hidden");
  },
  watch: {
    isOpenHelloPopup(isOpenHelloPopup) {
      if (!isOpenHelloPopup) {
        this.body.classList.remove("overflow-hidden");
      }
    }
  }
};
</script>

<style lang="scss">
.main-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #333;

  &__card {
    width: 200px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: 0.4s;

    &:first-child {
      margin-bottom: 32px;
    }

    &:hover {
      background-color: #f7f7f7;
      padding: 24px;
    }

    &--non-clickable {
      cursor: auto;

      &:hover {
        padding: 16px;
        background: inherit;
      }
    }
  }

  &__link:visited {
    color: inherit;
  }

  &__order-desk {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>