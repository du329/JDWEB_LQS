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
    <div class="toCheckOut" @click="handleToCheckOut">去结算</div>
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
import { useRoute, useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import ShopCartDetail from "./ShopCartDetail.vue";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { useCartDataEffect } from "../../effects/useCartDataEffect";

const useCartShowEffect = () => {
  let cartShow = ref(false);
  const handleCartShow = () => {
    cartShow.value = !cartShow.value;
  };
  return { cartShow, handleCartShow };
};

const useCheckOutEffect = (checkedProductList, showToast, shopId) => {
  const router = useRouter();
  const handleToCheckOut = () => {
    // Computed Ref Impl ！！！
    if (Object.keys(checkedProductList.value).length) {  
      router.push({ name: "ConfirmOrder", params: { id: shopId } });
    } else {
      showToast("请选择商品!");
    }
  };
  return { handleToCheckOut };
};

export default {
  name: "ShopCart",
  components: {
    ShopCartDetail,
    Toast,
  },
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    // 购物车显示与隐藏
    const { cartShow, handleCartShow } = useCartShowEffect();
    // proAllCount、proTotal、全选、结算判断
    const { cartData, allCheck, checkedProductList } = useCartDataEffect(
      shopId,
      handleCartShow
    );
    // 吐司
    const { show, content, showToast } = useToastEffect();
    // 判断订单跳转
    const { handleToCheckOut } = useCheckOutEffect(
      checkedProductList,
      showToast,
      shopId
    );

    return {
      shopId,
      cartShow,
      handleCartShow,
      cartData,
      allCheck,
      show,
      content,
      showToast,
      handleToCheckOut,
    };
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
  box-shadow: 0 -0.01rem 0.01rem 0 #f1f1f1;
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