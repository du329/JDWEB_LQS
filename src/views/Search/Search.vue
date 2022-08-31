<template>
  <div class="searchLayout">
    <div class="searchTop">
      <div class="searchBox">
        <Search :placeholder="placeholder" @change="handleSearch" />
      </div>
      <div class="cancel" @click="handleBack">取消</div>
    </div>
    <div class="searchHistory">
      <div class="searchHistory__title">
        <h3>搜索历史</h3>
        <span @click="handleClearSearch">清除搜索历史</span>
      </div>
      <div class="searchHistory__keyWords">
        <ul>
          <li v-for="item in history" :key="item">{{ item }}</li>
        </ul>
      </div>
    </div>
    <div class="hotSearch">
      <div class="hotSearch__title">
        <h3>热门搜索</h3>
      </div>
      <div class="hotSearch__keyWords">
        <ul>
          <li v-for="hotword in hotWords" :key="hotword._id">
            {{ hotword.hotWord }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import Search from "../../components/Search";
import { useBackEffect } from "../../effects/useBackEffect";
import { get, post } from "../../utils/request";

const useHotWordEffect = (handlePush) => {
  // 保存热搜词
  const history = ref(JSON.parse(localStorage.history || "[]"));
  const handleSearch = async (e) => {
    const newValue = e.target.value;
    if (!newValue) return;
    const hasValue = history.value.find((item) => item === newValue);
    if (!hasValue) {
      history.value.push(newValue);
      localStorage.history = JSON.stringify(history.value);
      // 保存热搜词
      await post("/api/shop/search/hot-words", {
        hotWord: e.target.value,
      });
    }
    e.target.value = "";
    // 跳转至searchlist
    handlePush("SearchList",{ keyword: newValue })
  };

  // 清空热搜词
  const handleClearSearch = () => {
    history.value = [];
    localStorage.history = JSON.stringify(history.value);
  };

  // 请求热搜词列表
  const hotWords = ref([]);
  const getHotWords = async () => {
    const result = await get("/api/shop/search/hot-words");
    if (result.errno === 0 && result.data.length) {
      hotWords.value = result.data;
    }
  };
  getHotWords();
  return { hotWords, history, handleSearch, handleClearSearch };
};
export default {
  name: "SearchPage",
  components: {
    Search,
  },
  setup() {
    const placeholder = "水果";
    const { handleBack,handlePush } = useBackEffect();
    const { hotWords, history, handleSearch, handleClearSearch } =
      useHotWordEffect(handlePush);

    return {
      placeholder,
      handleBack,
      hotWords,
      history,
      handleSearch,
      handleClearSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.searchLayout {
  padding: 0.16rem 0.18rem 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .searchTop {
    display: flex;
    align-items: center;
    margin-bottom: 0.24rem;
    .searchBox {
      width: 86%;
    }
    .cancel {
      flex-grow: 1;
      margin-left: 0.12rem;
      font-size: 0.16rem;
      color: #333;
    }
  }
  .searchHistory {
    position: relative;
    margin-bottom: 0.24rem;
    &__title {
      display: flex;
      align-items: center;
      margin-bottom: 0.12rem;
      h3 {
        font-size: 0.16rem;
      }
      span {
        position: absolute;
        font-size: 0.14rem;
        color: #333;
        right: 0;
      }
    }
  }
  .hotSearch {
    &__title {
      margin-bottom: 0.12rem;
      h3 {
        font-size: 0.16rem;
      }
    }
  }
  li {
    list-style: none;
    padding: 0.08rem 0.1rem;
    margin-right: 0.1rem;
    margin-bottom: 0.12rem;
    display: inline-block;
    font-size: 0.14rem;
    color: #666;
    line-height: 0.16rem;
    background: #f5f5f5;
    border-radius: 0.02rem;
  }
}
</style>