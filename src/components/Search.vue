<template>
  <div class="search">
    <div class="iconfont">&#xe752;</div>
    <input type="text" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "Search",
  props: ['placeholder']
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
// 搜索框
.search {
  padding: 0 0.16rem;
  height: 0.32rem;
  width: 100%;
  display: flex;
  align-items: center;
  background: $searchColor;
  border-radius: 0.16rem;
  .iconfont {
    margin-right: 0.1rem;
    font-size: 0.16rem;
  }
  input {
    width: 100%;
    border: 0;
    background: $searchColor;
    outline: none;
    &::placeholder {
      padding-left: 0.01rem;
      font-size: 0.14rem;
    }
  }
}
</style>