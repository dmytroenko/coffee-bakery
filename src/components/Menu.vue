<template>
  <ul class="menu">
    <li class="menu__item">
      <router-link :to="{ name: 'Home' }">
        <HomeIcon></HomeIcon>
      </router-link>
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'CoffeeList' }">
        <CoffeeIcon></CoffeeIcon>
      </router-link>
    </li>
    <li class="menu__item">
      <router-link :to="{ name: 'Sweets' }">
        <SweetsIcon></SweetsIcon>
      </router-link>
    </li>
  </ul>
</template>

<script>
import SweetsIcon from "../icons/SweetsIcon";
import CoffeeIcon from "../icons/CoffeeIcon";
import HomeIcon from "../icons/HomeIcon";

export default {
  name: "Menu",
  components: {
    SweetsIcon,
    CoffeeIcon,
    HomeIcon
  }
};
</script>

<style lang="scss">
.menu {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 40px 16px 0;
  list-style: none;

  &__item {
    margin-bottom: 16px;
    cursor: pointer;
  }
}
</style>