<template>
  <div class="orderLayout">
    <div class="orderTitle">我的订单</div>
    <div class="orderList">
      <div
        class="orderList__item"
        v-for="item in orderList"
        :key="item.address"
      >
        <div class="orderList__item__shopName">
          {{ item.shopName
          }}<span>{{ item.isCanceled ? "交易关闭" : "交易成功" }}</span>
        </div>
        <div class="orderList__item__products">
          <template
            v-for="productInfo in item.products"
            :key="productInfo.product"
          >
            <img :src="productInfo.product.img" alt="" />
          </template>
        </div>
        <div class="orderList__item__all">
          <span class="orderList__item__all__price"
            >&yen;{{ item.allPrice }}</span
          >
          <span class="orderList__item__all__count"
            >共 {{ item.allCount }} 件</span
          >
        </div>
      </div>
    </div>
  </div>
  <Navigation :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import Navigation from "../../components/Navigation";
import { get } from "../../utils/request";

const useOrderListEffect = () => {
  let data = reactive({ orderList: [] });
  const getOrderList = async () => {
    const result = await get("/api/getOrder");
    data.orderList = result.data;
    data.orderList.forEach((item) => {
      let allPrice = 0;
      let allCount = 0;
      for (const proInfo of item.products) {
        allPrice += ((proInfo?.orderSales * proInfo.product.price) || 0);
        allCount += (proInfo?.product.sales || 0);
      }
      item.allPrice = allPrice;
      item.allCount = allCount;
    });
  };
  const { orderList } = toRefs(data);
  getOrderList();
  return { orderList };
};

export default {
  name: "Order",
  components: {
    Navigation,
  },
  setup() {
    const { orderList } = useOrderListEffect();
    return { orderList };
  },
};
</script>

<style lang="scss" scoped>
.orderLayout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0.49rem;
  right: 0;
  background: #f8f8f8;
  .orderTitle {
    text-align: center;
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.16rem;
    color: #333333;
    background: #fff;
  }
  .orderList {
    padding: 0.16rem 0.18rem 0;
    &__item {
      padding: 0.16rem;
      margin-bottom: 0.16rem;
      width: 100%;
      height: 1.1rem;
      background: #fff;
      &__shopName {
        margin-bottom: 0.16rem;
        font-weight: 700;
        font-size: 0.16rem;
        color: #333333;
        span {
          float: right;
          font-weight: 500;
          font-size: 0.14rem;
          color: #999999;
        }
      }
      &__products {
        display: inline-block;
        img {
          width: 0.4rem;
          height: 0.4rem;
          margin-right: 0.12rem;
        }
      }
      &__all {
        float: right;
        text-align: right;
        span {
          display: block;
        }
        &__price {
          margin-bottom: 0.04rem;
          font-size: 0.14rem;
          color: #e93b3b;
        }
        &__count {
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>