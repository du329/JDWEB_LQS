<template>
  <div class="shopHeader">
    <div class="top">
      <div class="back icon" @click="handleBack">&#xe640;</div>
      <div class="searchBox">
        <Search :placeholder="placeholder" />
      </div>
    </div>
    <div class="shopInfo">
      <ShopInfo :item="item" :showBorder="false" v-if="item.imgUrl" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import Search from "../../components/Search.vue";
import ShopInfo from "../../components/ShopInfo.vue";
import { get } from "../../utils/request";

// 回退
const useBackEffect = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return handleBack;
};

// 获取当前商铺详情
const useShopInfoEffect = () => {
  const route = useRoute();
  const data = reactive({ item: {} });
  // const data2 = { item: {} };  响应式--数据驱动
  // let item = ref({});
  // let item = reactive({}); 直接替换对象（地址），导致响应式失效
  // 请求数据
  const getShopDetial = async () => {
    const result = await get(`/shop/${route.params.id}`);
    if (result?.errno === 0 && result?.data) {
      data.item = result.data; // √√√
      // item.value = result.data;  √√√
      // item = result.data;     xxx
    }
  };
  // 异步：item -- 响应式
  getShopDetial();
  const { item } = toRefs(data);

  return { item };
};

export default {
  name: "ShopHeader",
  components: {
    Search,
    ShopInfo,
  },
  setup() {
    const placeholder = "请输入商品名称搜索";
    const handleBack = useBackEffect();
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