<template>
  <ShopCartDetail :allCheck="allCheck" v-if="cartShow" />
  <div class="mask" v-if="cartShow" @click="handleCartShow"></div>
  <div class="shopCart">
    <div class="shopCart__img" @click="handleCartShow">
      <span class="iconfont">&#xe6ad;</span>
      <span class="proNum">
        {{ (cartData.allCount > 99 ? "99+" : cartData.allCount) || 0 }}
      </span>
    </div>

    <div class="shopCart__total">
      <div v-if="cartData.allCount === 0">购物车空空如也~</div>
      <div v-else>
        总计：
        <span>
          &yen;{{ cartData.total ? Math.abs(cartData.total).toFixed(2) : 0 }}
        </span>
      </div>
    </div>

    <div class="toCheckOut">去结算</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import ShopCartDetail from "./ShopCartDetail.vue";

const useCartDataEffect = () => {
  const route = useRoute();
  const store = useStore();
  const shopId = route.params.id;
  const { cartList } = store.state;
 
  let cartData = computed(() => {
    const productList  = cartList[shopId]?.productList || {};
    let productData = { allCount: 0, total: 0 };
    if (Object.keys(productList).length) {
      for (let i in productList) {
        const product = productList[i];
        productData.allCount += product.count;
        if (product.check) {
          // 计算总数量和总价
          productData.total += product.count * product.price;
        }
      }
    }
    return productData;
  });

  // computed的每一个计算属性都会被缓存起来，
  // 只要计算属性所依赖的属性发生变化，计算属性就会重新执行，视图也会更新。

  let allCheck = computed(() => {
    let flag = false;
    const productList = cartList[shopId]?.productList;
    if (Object.keys(productList).length) {
      console.log(Object.keys(productList));
      flag = true;
      for (let i in productList) {
        const product = productList[i];
        if (product.count > 0 && !product.check) {
          flag = false;
        }
      }
    }
    return flag;
  });
  return { cartData, allCheck };
};

const useCartShowEffect = () => {
  let cartShow = ref(false);
  const handleCartShow = () => {
    cartShow.value = !cartShow.value;
  };
  return { cartShow, handleCartShow };
};

export default {
  name: "ShopCart",
  components: {
    ShopCartDetail,
  },
  setup() {
    // proAllCount、proTotal、全选
    const { cartData, allCheck } = useCartDataEffect();
    // 购物车显示与隐藏
    const { cartShow, handleCartShow } = useCartShowEffect();

    return { cartData, allCheck, cartShow, handleCartShow };
  },
};
</script>

<style lang="scss" scoped>
.shopCart {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 0.49rem;
  background: #fff;
  box-shadow: 0 -1px 1px 0 #f1f1f1;
  &__img {
    width: 0.76rem;
    text-align: center;
    .iconfont {
      font-size: 0.3rem;
      color: #0091ff;
    }
    .proNum {
      position: absolute;
      top: -0.04rem;
      left: 0.4rem;
      box-sizing: border-box;
      width: 0.28rem;
      height: 0.26rem;
      line-height: 0.26rem;
      color: #fff;
      transform: scale(0.5);
      background: #e93b3b;
      border-radius: 50%;
    }
  }
  &__total {
    flex: 1;
    height: 100%;
    line-height: 0.49rem;
    padding-left: 0.08rem;
    span {
      vertical-align: middle;
      font-size: 0.18rem;
      color: #e93b3b;
    }
  }
  .toCheckOut {
    text-align: center;
    width: 0.98rem;
    height: 100%;
    line-height: 0.49rem;
    font-size: 0.14rem;
    color: white;
    background: #4fb0f9;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>