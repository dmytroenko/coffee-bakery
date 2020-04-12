<template>
  <div class="select-coffee">
    <label class="select-coffee__label">Choose your favourite beverage</label>
    <select v-model="selectedCoffee" @change="setFavouriteCoffee" class="select-coffee__select">
      <option v-for="coffee in coffeeData" :key="coffee.name">{{ coffee.name }}</option>
    </select>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "SelectCoffee",
  data: () => ({
    selectedCoffee: "Americano"
  }),
  computed: {
    ...mapState(["coffeeData", "favouriteCoffee"])
  },
  methods: {
    ...mapMutations(["updateState"]),
    setFavouriteCoffee() {
      this.updateState({
        favouriteCoffee: this.selectedCoffee
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.select-coffee {
  &__label {
    display: block;
  }

  &__select {
    width: 50%;
    margin-bottom: 24px;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }
}
</style>