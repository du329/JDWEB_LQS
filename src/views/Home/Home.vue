<template>
  <StaticArea />
  <NearByShops />
  <Navigation :currentIndex="0"/>
</template>

<script>
import StaticArea from "./StaticArea";
import NearByShops from "./NearByShops";
import Navigation from "../../components/Navigation";

export default {
  name: "Home",
  components: {
    StaticArea,
    NearByShops,
    Navigation,
  },
};
</script>
