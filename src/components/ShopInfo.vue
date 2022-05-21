<template>
  <div class="shop">
    <div class="shop__Logo">
      <img :src="item.imgUrl" />
    </div>
    <div class="shop__content">
      <div class="title">{{ item.name }}</div>
      <div class="tags">
        <span>月售{{ item.sales }}+</span>
        <span>起送￥{{ item.expressLimit }}</span>
        <span>基础运费￥{{ item.expressPrice }}</span>
      </div>
      <div class="slogan">{{ item.slogan }}</div>
      <div class="gapLine" v-if="showBorder"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["item","showBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.shop {
  display: flex;
  margin-bottom: 0.12em;
  height: 0.86rem;
  &__Logo {
    margin-right: 0.16rem;
    width: 0.56rem;
    height: 0.56rem;
    img {
      width: 100%;
    }
  }
  &__content {
    flex: 1;
    font-size: 0.13rem;
    .title {
      margin-bottom: 0.08rem;
      font-size: 0.16rem;
    }
    .tags {
      margin-bottom: 0.08rem;
      span {
        margin-right: 0.16rem;
      }
    }
    .slogan {
      margin-bottom: 0.12rem;
      color: #e93b3b;
    }
    .gapLine {
      border-bottom: 0.01rem solid $content-bgColor;
    }
  }
}
</style>