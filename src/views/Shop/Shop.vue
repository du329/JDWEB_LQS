<template>
  <ShopHeader />
  <ShopMain />
  <ShopCart />

</template>

<script>
import ShopHeader from "./ShopHeader.vue";
import ShopMain from "./ShopMain.vue";
import ShopCart from "./ShopCart.vue";

export default {
  name: "Shop",
  components: {
    ShopHeader,
    ShopMain,
    ShopCart,
  },
};
</script>