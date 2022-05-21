<template>
  <div class="shopCart__detail">
    <div class="shopCart__detail__top">
      <span
        :class="{ icon: true, icon88: allCheck, all: true }"
        @click="handleAllCheck(shopId,allCheck)"
        >{{ "&#xeb88;" }}
      </span>
      <span>全选</span>
      <span class="clearCart" @click="handleClearCart(shopId)">清空购物车</span>
    </div>
    <div class="product">
      <template v-for="item in cartList[shopId]" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__check"
            @click="handleProductCheck(item._id)"
          >
            <span :class="{ icon: true, icon88: item.check }">{{
              "&#xeb88;"
            }}</span>
          </div>
          <div class="product__item__img">
            <img :src="item.imgUrl" alt="" />
          </div>
          <div class="product__item__detail">
            <h4 class="product__item__detail__title">
              {{ item.name }}
            </h4>
            <p class="product__item__detail__price">
              <span class="product__item__detail__price__yen"
                >&yen;{{ item.price }}</span
              >
              <span class="product__item__detail__price__origin"
                >&yen;{{ item.oldPrice }}</span
              >
            </p>
          </div>
          <div class="product__item__number">
            <div
              class="product__item__number__sub"
              @click="
                !item.count
                  ? showToast('不能再减少了歪!')
                  : ASItemToCart(shopId, item._id, item, -1)
              "
            >
              -
            </div>
            <div class="product__item__number__val">
              {{ item.count || 0 }}
            </div>
            <div
              class="product__item__number__add"
              @click="
                item.count > 99
                  ? showToast('不能再增加了歪!')
                  : ASItemToCart(shopId, item._id, item, 1)
              "
            >
              +
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <transition
    :duration="{ enter: 0, leave: 0 }"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <Toast v-if="show" :content="content" />
  </transition>
</template>

<script>
import { useCartEffect } from "./useCartEffect";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { useStore } from "vuex";
// import { useCartDataEffect } from "./ShopCart.vue";

export default {
  name: "ShopCartDetail",
  props:['allCheck'],
  components: {
    Toast,
  },
  setup() {
    const store = useStore();
    const { cartList, shopId, ASItemToCart } = useCartEffect();
    const { show, content, showToast } = useToastEffect();

    // 选中
    const handleProductCheck = (productId) => {
      store.commit("changeProductState", { shopId, productId });
    };

    // 全选
    const handleAllCheck = (shopId,allCheck) => {
      store.commit("allCheck", { shopId,allCheck });
    };

    // 清空购物车
    const handleClearCart = (shopId) => {
      store.commit("clearCart", { shopId });
    };

    return {
      cartList,
      shopId,
      ASItemToCart,
      handleProductCheck,
      handleAllCheck,
      handleClearCart,
      //   allCheck,
      show,
      content,
      showToast,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.shopCart__detail {
  z-index: 1;
  position: absolute;
  background: white;
  //   background: rgba($color: #000, $alpha: 0.0);
  bottom: 0.49rem;
  left: 0;
  right: 0;
  &__top {
    padding: 0 0.18rem;
    height: 0.52rem;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
    color: black;
    font-size: 0.14rem;
    .all {
      float: left;
      margin-right: 0.09rem;
      font-size: 0.2rem;
    }
    .clearCart {
      float: right;
    }
  }
  .product {
    flex: 1;
    // padding: 0.16rem 0.18rem;
    overflow: auto;
    &__item {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.12rem 0.18rem;
      &__check {
        margin-right: 0.164rem;
        font-size: 0.2rem;
      }
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
            line-height: 20px;
          }
          &__origin {
            font-size: 0.12rem;
            color: #999999;
            text-decoration: line-through;
          }
        }
      }
      &__number {
        position: absolute;
        margin: 0 0.18rem 0.12rem 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        &__val {
          margin: 0 0.1rem;
          font-size: 0.14rem;
          color: $shop-color;
          line-height: 16px;
        }
        &__add,
        &__sub {
          text-align: center;
          width: 0.2rem;
          height: 0.2rem;
          line-height: 0.18rem;
          border-radius: 50%;
          font-size: 0.2rem;
        }
        &__add {
          color: #f1f1f1;
          background: #0091ff;
        }
        &__sub {
          color: #666666;
          border: 0.01rem solid #666666;
        }
      }
    }
  }
  .icon88 {
    color: #0091ff;
  }
}
</style>