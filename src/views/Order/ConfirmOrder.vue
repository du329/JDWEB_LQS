<template>
  <div class="confirmOrder">
    <div class="topArea">
      <div class="iconfont" @click="handleBack">&#xe640;</div>
      <div class="title">确认订单</div>
      <div class="address" v-if="!address.city">
        <p class="address__title">收货地址：</p>
        <p class="address__message">请选择收货地址：</p>
        <p class="address__username">
          <br />
        </p>
        <div class="iconfont" @click="handleSelectAddress">&#xe640;</div>
      </div>
      <div class="address" v-if="address.city">
        <p class="address__title">收货地址：</p>
        <p class="address__message">
          {{ address.city }} &nbsp;{{ address.department }} &nbsp;{{
            address.houseNumber
          }}
        </p>
        <p class="address__username">
          {{ address.name }} (先生/女士) {{ address.phone }}
        </p>
        <div class="iconfont" @click="handleSelectAddress">&#xe640;</div>
      </div>
    </div>
    <div class="orderContentLayout">
      <div class="orderContent">
        <div class="product__title">{{ shopName }}</div>
        <div class="product">
          <template v-for="item in checkedProductList" :key="item._id">
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
    </div>
    <!-- 提交订单 -->
    <div class="Cashier">
      <div class="price">
        实付金额<b>&yen;{{ cartData.total.toFixed(2) }}</b>
      </div>
      <div class="placeOrder" @click="handleShowMask">提交订单</div>
    </div>
  </div>
  <div class="mask" v-if="showMask" @click.prevent="handleShowMask">
    <div class="mask__content" @click.stop>
      <h4>确认要离开收银台？</h4>
      <p>请尽快完成支付，否则将被取消</p>
      <div class="handleOrder">
        <div class="cancelOrder" @click="handleComfirmPay(address._id, false)">
          取消订单
        </div>
        <div class="comfirmPay" @click="handleComfirmPay(address._id, true)">
          确认支付
        </div>
      </div>
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartDataEffect } from "../../effects/useCartDataEffect";
import { useBackEffect } from "../../effects/useBackEffect";
import { get, post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast"; // 自定义弹窗
import { useStore } from "vuex";

const useShowMaskEffect = (address, showToast) => {
  const showMask = ref(false);
  const handleShowMask = () => {
    if (address.value.city) {
      showMask.value = !showMask.value;
    } else {
      showToast("请选择收货地址");
    }
  };

  return { handleShowMask, showMask };
};

const useHandleOrderEffect = (
  shopId,
  shopName,
  checkedProductList,
  showToast,
  handlePush
) => {
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  // 选择地址
  const handleSelectAddress = () => {
    const path = route.path;
    router.replace(`/SelectAddress?path=${path}`);
  };
  // 取得地址id后，请求相应地址
  const address = ref({});
  const getAddress = async () => {
    const result = await get(`/api/user/address/${route.query._id}`);
    if (result?.errno === 0) {
      address.value = result.data;
    }
  };
  getAddress();
  // 确认订单
  const handleComfirmPay = async (addressId, isCanceled) => {
    try {
      const products = [];
      for (const i in checkedProductList.value) {
        const product = {
          id: checkedProductList.value[i]._id,
          num: checkedProductList.value[i].count,
        };
        products.push(product);
      }
      // 创建订单
      const result = await post("/api/order", {
        addressId,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products,
      });
      if (result?.errno === 0 && isCanceled) {
        showToast("支付成功!");
        store.commit("clearCommittedData", { products, shopId });
        setTimeout(() => {
          handlePush("Order");
        }, 800);
      } else {
        showToast("支付失败!");
      }
      if (result?.errno === 0 && !isCanceled) {
        showToast("取消支付!");
        store.commit("clearCommittedData", { products, shopId });
        setTimeout(() => {
          handlePush("Order");
        }, 800);
      }
    } catch (error) {
      showToast("请求失败!");
    }
  };

  return { address, handleComfirmPay, handleSelectAddress };
};

export default {
  name: "ConfirmOrder",
  components: { Toast },
  setup() {
    const route = useRoute();
    const shopId = route.params.id;
    // 确认的商品、商铺名、总价
    const { checkedProductList, shopName, cartData } =
      useCartDataEffect(shopId);
    // 回退
    const { handleBack,handlePush } = useBackEffect();
    // 吐司
    const { show, content, showToast } = useToastEffect();
    // 取消订单与确认订单
    const { address, handleComfirmPay, handleSelectAddress } =
      useHandleOrderEffect(
        shopId,
        shopName,
        checkedProductList,
        showToast,
        handlePush
      );
    // 提交订单显示与隐藏
    const { handleShowMask, showMask } = useShowMaskEffect(address, showToast);

    return {
      shopId,
      checkedProductList,
      shopName,
      cartData,
      address,
      handleBack,
      handleShowMask,
      showMask,
      handleComfirmPay,
      handleSelectAddress,
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
.confirmOrder {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #f5f5f5;
}
.topArea {
  position: relative;
  padding: 0.245rem 0.16rem 0;
  width: 100%;
  height: 1.46rem;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 45%);
  .iconfont {
    position: absolute;
    font-size: 0.2rem;
    color: #ffffff;
  }
  .title {
    margin-bottom: 0.22rem;
    text-align: center;
    font-size: 0.16rem;
    color: #ffffff;
  }

  .address {
    position: relative;
    z-index: 1;
    bottom: 0;
    padding: 0.16rem;
    width: 100%;
    background: #ffffff;
    border-radius: 0.04rem;
    &__title {
      margin-bottom: 0.14rem;
      font-size: 0.16rem;
    }
    &__message {
      margin-bottom: 0.06rem;
      font-size: 0.14rem;
      color: #333;
    }
    &__username {
      font-size: 0.12rem;
      color: #666;
    }
    .iconfont {
      position: absolute;
      right: 0.16rem;
      top: 50%;
      transform: translateY(-0.1rem) rotate(-180deg);
      font-size: 0.2rem;
      color: #666;
    }
  }
}
.orderContentLayout {
  padding: 0 0.16rem;
  .orderContent {
    position: relative;
    margin-top: 0.4rem;
    padding: 0.16rem 0.16rem 0;
    width: 100%;
    background: #fff;
    border-radius: 0.04rem;
    .product__title {
      margin-bottom: 0.16rem;
      background: #fff;
      font-weight: 700;
      font-size: 0.16rem;
      color: #333333;
    }
    .product {
      flex: 1;
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

.Cashier {
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  background: #fff;
  .price {
    flex: 1;
    padding-left: 0.24rem;
    font-size: 0.14rem;
    b {
      margin-left: 0.06rem;
      font-size: 0.16rem;
    }
  }
  .placeOrder {
    width: 0.98rem;
    height: 0.49rem;
    line-height: 0.49rem;
    font-size: 0.14rem;
    text-align: center;
    color: #ffffff;
    background: #4fb0f9;
  }
}

.mask {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  &__content {
    margin: 2.43rem auto 0;
    padding-top: 0.24rem;
    width: 3.01rem;
    height: 1.57rem;
    text-align: center;
    background: #ffffff;
    border-radius: 0.04rem;
    h4 {
      margin-bottom: 0.08rem;
      font-size: 0.18rem;
      color: #333333;
    }
    p {
      margin-bottom: 0.24rem;
      font-size: 0.14rem;
      color: #666666;
    }
    .handleOrder {
      display: flex;
      justify-content: center;
      .cancelOrder,
      .comfirmPay {
        width: 0.8rem;
        height: 0.32rem;
        line-height: 0.32rem;
        border: 0.01rem solid #4fb0f9;
        border-radius: 0.16rem;
      }
      .cancelOrder {
        margin-right: 0.24rem;
        color: #0091ff;
        background: #fff;
      }
      .comfirmPay {
        color: #fff;
        background: #0091ff;
      }
    }
  }
}
</style>