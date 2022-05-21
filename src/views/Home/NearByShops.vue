<template>
  <div class="nearByShops">
    <h2>附近店铺</h2>
    <router-link
      :to="{ name: 'Shop', params: { id: shop._id } }"
      v-for="shop in nearByShopList"
      :key="shop._id"
    >
      <ShopInfo :item="shop" :showBorder="true" />
    </router-link>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo.vue";

// 处理附近店铺
const useNearByShopEffect = () => {
  const nearByShopList = ref([]);
  // 请求
  const getNearByShopList = async () => {
    const result = await get("/api/shop/hot-list");
    if (result?.errno === 0 && result?.data?.length) {
      nearByShopList.value = result.data;
    }
  };
  getNearByShopList();
  return { nearByShopList };
};

export default {
  name: "NearByShops",
  components: {
    ShopInfo,
  },
  setup() {
    const { nearByShopList } = useNearByShopEffect();
    return { nearByShopList };
  },
};
</script>

<style lang="scss" scoped>
.nearByShops {
  padding: 0.18rem 0.18rem 0.49rem;
  h2 {
    margin-bottom: 0.14rem;
    font-size: 0.18rem;
  }
}
</style>