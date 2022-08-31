<template>
  <div class="Navigation">
    <div
      v-for="item in navigationList"
      :key="item.icon"
      :class="{
        Navigation__item: true,
        'Navigation__item--active': item.index === currentIndex ? true : false,
      }"
    >
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="text">{{ item.text }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props:['currentIndex'],
  setup() {
    let navigationList = [
      { index: 0, icon: "&#xe612;", text: "首页", to: { name: "Home" } },
      { index: 1, icon: "&#xe628;", text: "购物车", to: { name: "Cart" } },
      { index: 2, icon: "&#xe606;", text: "订单", to: { name: "Order" } },
      { index: 3, icon: "&#xe613;", text: "我的", to: { name: "Mine" } },
    ];
    return { navigationList };
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.Navigation {
  z-index: 5;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.1rem 0.1rem 0.06rem 0.1rem;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01rem solid $content-bgColor;
  box-shadow: 0 -0.01rem 0.01rem 0 $content-bgColor;
  background: #fff;
  &__item {
    text-align: center;
    &--active {
      a {
        color: #1fa4fc;
      }
    }
    .iconfont {
      margin: 0.07rem 0 0.02rem 0;
      font-size: 0.2rem;
    }
    .text {
      font-size: 0.2rem;
      transform: scale(0.5, 0.5);
      transform-origin: center top;
    }
  }
}
</style>