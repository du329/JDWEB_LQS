<template>
  <div class="shopCart">
    <div class="shopCart__img">
      <span class="icon"> &#xe6ad;</span>
      <span class="proNum">
        {{ (CartData.allCount > 99 ? "99+" : CartData.allCount) || 0 }}
      </span>
    </div>
    <div class="shopCart__total">
      总计：
      <span>
        &yen;{{ CartData.total ? Math.abs(CartData.total).toFixed(2) : 0 }}
      </span>
    </div>
    <div class="toCheckOut">去结算</div>
  </div>
  <ShopCartDetail :allCheck="allCheck" />
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import ShopCartDetail from "./ShopCartDetail.vue";

// 计算proAllCount、proTotal、以及判断全选
const useCartDataEffect = () => {
  const route = useRoute();
  const store = useStore();
  const shopId = route.params.id;
  const { cartList } = store.state;

  let CartData = computed(() => {
    const proList = cartList[shopId];
    let productData = { allCount: 0, total: 0 };

    if (proList) {
      for (let i in proList) {
        const product = proList[i];
        if (product.check) {
          // 计算总数量和总价
          productData.allCount += product.count;
          productData.total += product.count * product.price;
        }
      }
    }
    return productData;
  });

  const ALLCheck = computed(() => {
    let allCheck = ref(false);
    const proList = cartList[shopId];
    allCheck.value = true;
    for (let i in proList) {
      const product = proList[i];
      if (product.check === false) {
        allCheck.value = false;
      }
    }
    return allCheck;
  });

  return { CartData, ALLCheck };
};

export default {
  name: "ShopCart",
  components: {
    ShopCartDetail,
  },
  setup() {
    const { CartData, allCheck } = useCartDataEffect();

    return { CartData, allCheck };
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
    .icon {
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
</style>