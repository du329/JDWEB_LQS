<template>
  <div class="shopHeader">
    <div class="top">
      <div class="back iconfont" @click="handleBack">&#xe640;</div>
      <div class="searchBox">
        <Search :placeholder="placeholder" />
      </div>
    </div>
    <div class="shopInfo">
      <ShopInfo :item="item" :showBorder="false" v-if="item.imgUrl" />
    </div>
  </div>
  <ShopMain :shopName="item.name" />
  <ShopCart />
</template>

<script>
import { useRoute } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import { get } from "../../utils/request";
import Search from "../../components/Search.vue";
import ShopInfo from "../../components/ShopInfo.vue";
import ShopMain from "./ShopMain.vue";
import ShopCart from "./ShopCart.vue";
import { useBackEffect } from "../../effects/useBackEffect";

// 获取当前商铺详情并设置商铺名
const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  // const data2 = { item: {} };  响应式--数据驱动
  // let item = ref({});
  // let item = reactive({}); 直接替换对象（地址），导致响应式失效

  // 请求数据 （异步不阻塞后续代码，阻塞内部代码）
  const getShopDetial = async () => {
    const result = await get(`/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data; // √√√
      // item.value = result.data;  √√√
      // item = result.data;     xxx
    }
  };

  getShopDetial();
  const { item } = toRefs(data);
  return { item };
};

export default {
  name: "Shop",
  components: {
    Search,
    ShopInfo,
    ShopMain,
    ShopCart,
  },
  setup() {
    const placeholder = "请输入商品名称搜索";
    const { handleBack } = useBackEffect();
    const { item } = useShopInfoEffect();
    return { placeholder, item, handleBack };
  },
};
</script>

<style lang="scss" scoped>
// 回退、搜索
.top {
  display: flex;
  align-items: center;
  padding: 0.16rem 0.14rem;
  .back {
    font-size: 0.28rem;
    color: #b6b6b6;
    padding-right: 0.1rem;
  }
  .searchBox {
    width: 100%;
  }
}

//shopInfo
.shopInfo {
  padding: 0 0.18rem;
}
</style>