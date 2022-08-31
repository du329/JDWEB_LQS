<template>
  <router-link :to="{ name: 'Shop', params: { id: item._id } }">
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
        <div class="products" v-if="item.products">
          <div
            class="product"
            v-for="product in item.products"
            :key="product.imgUrl"
          >
            <img :src="product.imgUrl" />
            <span class="">{{ product.name }}</span>
            <span>￥{{ product.price }}</span>
          </div>
        </div>
        <div class="gapLine" v-if="showBorder"></div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ShopInfo",
  props: ["item", "showBorder"],
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";
.shop {
  display: flex;
  margin-bottom: 0.12rem;
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
      margin-bottom: 0.08rem;
      color: #e93b3b;
    }
    .products {
      margin-bottom: 0.12rem;
      display: flex;
      .product {
        display: flex;
        margin-right: 0.16rem;
        flex-direction: column;
        img {
          width: 0.76rem;
          height: 0.76rem;
        }
        span {
          @include ellipsis;
        }
        span:nth-child(2) {
          margin: 0.04rem 0.02rem;
          font-size: 0.12rem;
          color: #333333;
        }
        span:nth-child(3) {
          font-size: 0.14rem;
          color: red;
          line-height: 0.14rem;
        }
      }
      .product:nth-child(3) {
        margin-right: 0;
      }
    }
    .gapLine {
      border-bottom: 0.01rem solid $content-bgColor;
    }
  }
}
</style>