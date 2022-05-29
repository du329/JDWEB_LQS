<template>
  <div class="cartLayout">
    <div class="cartTitle">我的全部购物车 ({{ cartNumber }})</div>
    <div class="cartList">
      <template v-for="cart in checkedCartList" :key="cart.shopName">
        <div class="cartitem">
          <div class="product__title">{{ cart.shopName }}</div>
          <div class="product">
            <template v-for="item in cart.productList" :key="item._id">
              <div class="product__item">
                <div class="product__item__img">
                  <img :src="item.imgUrl" alt="" />
                </div>
                <div class="product__item__detail">
                  <h4 class="product__item__detail__title">
                    {{ item.name }}
                  </h4>
                  <p class="product__item__detail__price">
                    <span class="product__item__detail__price__yen"
                      >&yen;{{ item.price }} x {{ item.count }}</span
                    >
                  </p>
                </div>
                <div class="product__item__number">
                  <div class="product__item__number__val">
                    &yen;{{ (item.price * item.count).toFixed(2) }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
  <Navigation :currentIndex="1" />
</template>

<script>
import Navigation from "../../components/Navigation.vue";
import { useCartDataEffect } from "../../effects/useCartDataEffect";
export default {
  name: "Cart",
  components: {
    Navigation,
  },
  setup() {
    const shopId = 1;
    const { checkedCartList } = useCartDataEffect(shopId);
    console.log(checkedCartList);
    const cartNumber = Object.keys(checkedCartList.value).length;
    return { cartNumber, checkedCartList };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.cartLayout {
  background: #f8f5f5;
  .cartTitle {
    padding: 0.11rem 0;
    text-align: center;
    font-size: 0.16rem;
    color: #333333;
    background: #fff;
  }
  .cartList {
    position: absolute;
    padding: 0.16rem 0.18rem 0.49rem;
    top: 0.44rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    background: #f8f5f5;
    border-radius: 0.04rem;
    .cartitem {
      padding: 0.16rem 0.16rem 0;
      margin-bottom: 0.16rem;
      background: #fff;
      .product__title {
        margin-bottom: 0.16rem;
        background: #fff;
        font-weight: 700;
        font-size: 0.16rem;
        color: #333333;
      }
      .product {
        overflow: auto;
        &__item {
          position: relative;
          display: flex;
          margin-bottom: 0.16rem;
          &__img {
            margin-right: 0.16rem;
            width: 0.46rem;
            height: 0.46rem;
            img {
              width: 100%;
            }
          }
          &__detail {
            flex: 1;
            overflow: hidden;
            &__title {
              @include ellipsis;
              margin: 0.04rem 0 0.06rem 0;
              font-size: 0.14rem;
              color: $shop-color;
            }
            &__price {
              &__yen {
                margin-right: 00.06rem;
                font-size: 0.16rem;
                color: #e93b3b;
                line-height: 0.2rem;
              }
            }
          }
          &__number {
            position: absolute;
            bottom: 0;
            right: 0;
            display: flex;
            align-items: center;
            &__val {
              font-size: 0.14rem;
              color: #000;
              line-height: 0.16rem;
            }
          }
        }
      }
    }
  }
}
</style>