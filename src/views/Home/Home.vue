<template>
  <StaticArea />
  <NearByShops />
  <Navigation />
</template>

<script>
import StaticArea from "./StaticArea";
import NearByShops from "./NearByShops";
import Navigation from "./Navigation";

export default {
  name: "Home",
  components: {
    StaticArea,
    NearByShops,
    Navigation,
  },
};
</script>
