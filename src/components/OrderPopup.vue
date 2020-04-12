<template>
  <div v-if="isOpenOrderPopup" class="order-popup" @click="overlayClosePopup">
    <div v-if="!isOpenPreloader && !isNeedNewOrder" class="order-popup__field">
      <div class="order-popup__about">{{ guest }}, there is a detail of your order here!</div>
      <div v-if="orderList.beverages.length" class="flex-container order-popup__list">
        <h3 class="order-popup__list-title">Beverages:</h3>
        <span
          v-for="(beverage, index) in beveragesFromOrder"
          :key="index"
          class="flex-container align-center order-popup__element"
        >
          <span
            class="order-popup__element-name"
          >{{ beverage.name }} {{ beverage.choosedSize.toUpperCase() }}</span>
          <PlusIcon
            isDeleteView
            class="order-popup__element-delete"
            @click.native="deleteElementFromOrder(index, 'beverages', beverage.choosedPrice)"
          ></PlusIcon>
        </span>
      </div>
      <div v-if="orderList.sweets.length" class="flex-container order-popup__list">
        <h3 class="order-popup__list-title">Sweets:</h3>
        <span
          v-for="(sweet, index) in sweetsFromOrder"
          :key="index+beveragesFromOrder.length"
          class="flex-container align-center order-popup__element"
        >
          <span class="order-popup__element-name">{{ sweet.name }}</span>
          <PlusIcon
            isDeleteView
            class="order-popup__element-delete"
            @click.native="deleteElementFromOrder(index, 'sweets', sweet.price)"
          ></PlusIcon>
        </span>
      </div>
      <div v-if="orderList.beverages.length" class="flex-container align-center">
        <h3 class="order-popup__list-title">Sugar sticks:</h3>
        <MinusIcon
          :color="minusIconColor"
          :class="{'cursor-pointer': isWithoutSugar}"
          @click.native="cancelSugar"
        ></MinusIcon>
        <span class="order-popup__sugar-counter">{{ sugarCounter }}</span>
        <PlusIcon class="cursor-pointer" @click.native="addSugar"></PlusIcon>
      </div>
      <div class="flex-container">
        <h4 v-if="isAllowOrder" class="order-popup__price-title">Price: {{ correctPrice }} USD</h4>
        <h4 v-else class="order-popup__price-title">Your order is empty yet</h4>
      </div>
      <div v-if="isAllowOrder" class="order-popup__action-btn" @click="makeOrder">make an order</div>
    </div>
    <Preloader v-else-if="isOpenPreloader"></Preloader>
    <div
      v-if="isNeedNewOrder && !isOpenPreloader"
      class="order-popup__field order-popup__buy-message"
    >
      <h3 class="order-popup__buy-message-text">We hope that we will see you again! Have a nice day</h3>
      <router-link :to="{name: 'Home'}" class="order-popup__link">
        <div
          class="order-popup__action-btn order-popup__buy-message-btn"
          @click="makeNewOrder"
        >make a new order</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";
import Preloader from "./Preloader";
import { mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "OrderPopup",
  components: {
    PlusIcon,
    MinusIcon,
    Preloader
  },
  data: () => ({
    sugarCounter: 0,
    isOpenPreloader: false,
    isNeedNewOrder: false
  }),
  computed: {
    ...mapState(["isOpenOrderPopup", "guestName", "orderList", "price"]),
    ...mapGetters(["beveragesFromOrder", "sweetsFromOrder"]),
    guest() {
      return this.guestName || "Darling";
    },
    minusIconColor() {
      return this.sugarCounter ? "#333" : "#ccc";
    },
    isWithoutSugar() {
      return Boolean(this.sugarCounter);
    },
    correctPrice() {
      return this.price >= 0 ? this.price.toFixed(2) : 0;
    },
    isAllowOrder() {
      return Boolean(this.price);
    }
  },
  methods: {
    ...mapMutations(["updateState"]),
    closePopup() {
      this.updateState({
        isOpenOrderPopup: false
      });
    },
    overlayClosePopup(e) {
      if (e.target.classList.contains("order-popup")) {
        this.closePopup();
      }
    },
    deleteElementFromOrder(
      indexElementForDelete,
      listOfElements,
      costOfDeletedElement
    ) {
      const newArr = this.orderList[listOfElements];
      const newPrice = this.price - costOfDeletedElement;
      const ELEMENTS_FOR_DELETE = 1;

      newArr.splice(indexElementForDelete, ELEMENTS_FOR_DELETE);

      this.updateState({
        price: newPrice
      });
    },
    addSugar() {
      this.sugarCounter++;
    },
    cancelSugar() {
      if (this.sugarCounter > 0) {
        this.sugarCounter--;
      }
    },
    makeOrder() {
      this.isOpenPreloader = true;
      setTimeout(() => {
        this.isOpenPreloader = false;
      }, 2000);
      this.cleanOrder();
      this.isNeedNewOrder = true;
    },
    cleanOrder() {
      this.updateState({
        orderList: {
          ...this.orderList,
          beverages: [],
          sweets: []
        },
        price: 0
      });
    },
    makeNewOrder() {
      this.isNeedNewOrder = false;
      this.closePopup();
    }
  }
};
</script>

<style lang="scss">
.order-popup {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.92);
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }

  &__field {
    position: absolute;
    top: calc(50% - 150px);
    right: calc(50% - 300px);
    width: 600px;
    height: 300px;
    padding: 16px;
    min-width: 600px;
    min-height: 300px;
    border-radius: 8px;
    background-color: #f0f0f0;
  }

  &__price-title {
    color: #682a13;
    font-weight: 500;
    margin-bottom: 8px;
  }

  &__about {
    color: #682a13;
    margin-bottom: 32px;
  }

  &__list {
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  &__list-title {
    margin: 0 8px 0 0;
    font-weight: 600;
    font-size: 20px;
    color: #682a13;
  }

  &__element {
    margin-right: 12px;

    &-name {
      margin-right: 4px;
    }

    &-delete {
      cursor: pointer;
    }
  }

  &__sugar-counter {
    padding: 0 8px;
  }

  &__action-btn {
    width: fit-content;
    padding: 3px 8px;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    transition: 0.4s;
    background-color: #682a13;
    color: #fff;

    &:hover {
      background-color: #f0f0f0;
      color: #682a13;
      border: 1px solid #682a13;
    }
  }

  &__buy-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-text {
      font-size: 32px;
      text-align: center;
      font-weight: 400;
      color: #333;
    }

    &-btn {
      padding: 8px 20px;
    }
  }

  &__link:visited {
    color: inherit;
  }
}
</style>
