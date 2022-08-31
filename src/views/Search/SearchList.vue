<template>
  <div class="searchListLayout">
    <div class="top">
      <div class="back iconfont" @click="handleBack">&#xe640;</div>
      <div class="searchBox">
        <Search :placeholder="keyword" />
      </div>
    </div>
    <div class="shopInfo">
      <ShopInfo
        v-for="item in searchList"
        :key="item.imgUrl"
        :item="item"
        :showBorder="true"
      />
    </div>
  </div>
</template>

<script>
import Search from "../../components/Search";
import { useBackEffect } from "../../effects/useBackEffect";
import { useRoute } from "vue-router";
import ShopInfo from "../../components/ShopInfo.vue";
import { post } from "../../utils/request";
import { ref } from "@vue/reactivity";

const useSearchListEffect = () => {
  const route = useRoute();
  const keyword = route.params.keyword;
  const searchList = ref([]);

  const getSearchList = async () => {
    const result = await post(`/api/shop/search/search-list`, { keyword });
    if (result.errno === 0 && result.data.length) {
      searchList.value = result.data;
    }
  };
  getSearchList();
  return { searchList, keyword };
};

export default {
  name: "SearchList",
  components: {
    Search,
    ShopInfo,
  },
  setup() {
    const { handleBack } = useBackEffect();

    const { searchList, keyword } = useSearchListEffect();
    return { handleBack, searchList, keyword };
  },
};
</script>

<style lang="scss" scoped>
.searchListLayout {
  padding: 0.16rem 0.14rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 0.24rem;
    .back {
      font-size: 0.28rem;
      color: #b6b6b6;
      padding-right: 0.1rem;
    }
    .searchBox {
      width: 100%;
    }
  }
}
</style>