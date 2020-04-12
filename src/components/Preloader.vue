<template>
  <div class="cup">
    <div class="coffee"></div>
  </div>
</template>
<script>
export default {
  name: "Preloader"
};
</script>

<style lang="scss">
$body-color: rgba(0, 0, 0, 0.25);
$base-color: #333;
$base-size: 10vw;
$coffee: #c86428;

.cup {
  border-radius: 0.5vw;
  background: $base-color;
  width: $base-size;
  height: $base-size * 1.2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 500;

  &:before,
  &:after {
    content: "";
    position: absolute;
    border-radius: 50% 15% 15% 50%;
    background: inherit;
    z-index: -1;
  }

  &:before {
    $size: $base-size / 2;
    width: $size;
    height: $size;
    top: $base-size / 5;
    left: -$base-size / 2.8;
  }

  &:after {
    background: $body-color;
    $size: $base-size / 3;
    width: $size / 1.3;
    height: $size;
    top: $base-size / 3.5;
    left: -$base-size / 3.6;
  }
}

.coffee {
  background: $coffee;
  position: absolute;
  top: 5%;
  bottom: 0.8vw;
  left: 0.8vw;
  right: 0.8vw;
  animation: coffeeGoesDown infinite forwards 5s linear;
}

@keyframes coffeeGoesDown {
  0% {
    top: 5%;
  }
  80%,
  100% {
    top: 100%;
  }
}
</style>  