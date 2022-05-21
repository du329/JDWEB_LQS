<template>
  <div class="shopCart">
    <div class="shopCart__img">
      <span class="icon"> &#xe6ad;</span>
      <span class="proNum">{{ 0 }}</span>
    </div>
    <div class="shopCart__content">总计：<span>&yen;128</span></div>
    <div class="toCheckOut">去结算</div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "ShopCart",
  setup() {
    const route = useRoute();
    const store = useStore();

    let pro_Num = computed(() => {
      let count = 0;
      for (const item in store.state.cartList[route.params.id]) {
        count += item.count;
      }
      console.log(count);
      return count;
    });

    // let total = computed(() => {

    // });
    return { pro_Num };
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
  &__content {
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