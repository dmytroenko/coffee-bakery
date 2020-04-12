<template>
  <div class="hello-popup" @click="overlayClosePopup">
    <div class="hello-popup__field">
      <div class="container">
        <img src="../assets/coffee.png" alt="cup of coffee" class="hello-popup__image" />
      </div>
      <div class="container hello-popup__form">
        <label>Enter your name</label>
        <input
          v-model="nameFromInput"
          type="text"
          placeholder="for example, John"
          @keyup.enter="sendForm"
          class="hello-popup__name"
        />
        <SelectCoffee></SelectCoffee>
        <div class="hello-popup__btn" @click="sendForm">order a coffee</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import SelectCoffee from "./SelectCoffee";

export default {
  name: "HelloPopup",
  components: {
    SelectCoffee
  },
  data: () => ({
    nameFromInput: ""
  }),
  computed: {
    ...mapState(["isOpenHelloPopup", "guestName"])
  },
  methods: {
    ...mapMutations(["updateState"]),
    closePopup() {
      this.updateState({
        isOpenHelloPopup: false
      });
    },
    overlayClosePopup(e) {
      if (e.target.classList.contains("hello-popup")) {
        this.closePopup();
      }
    },
    sendForm() {
      this.updateState({
        guestName: this.nameFromInput
      });
      this.closePopup();
    }
  }
};
</script>

<style lang="scss">
.hello-popup {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.96);
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.98);
  }

  &__field {
    position: absolute;
    top: calc(50% - 150px);
    right: calc(50% - 300px);
    display: flex;
    width: 600px;
    height: 300px;
    border-radius: 8px;
    background-color: #f0f0f0;
  }

  &__image {
    width: 264px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__name {
    width: 200px;
    margin-bottom: 8px;
    padding: 8px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  &__btn {
    width: fit-content;
    padding: 8px 24px;
    border-radius: 20px;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    background-color: #682a13;
    color: #fff;
  }
}
</style>
