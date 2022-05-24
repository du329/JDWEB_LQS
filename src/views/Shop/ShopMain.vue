<template>
  <div class="shopMain">
    <div class="category">
      <div
        :class="{
          category__item: true,
          'category__item--active': currentTab === item.tab,
        }"
        v-for="item in categoryList"
        :key="item.name"
        @click="
          () => {
            handleCategoryClick(item.tab);
          }
        "
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div class="product__item__img">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="product__item__detail">
          <h4 class="product__item__detail__title">
            {{ item.name }}
          </h4>
          <p class="product__item__detail__sales">月售{{ item.sales }}件</p>
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
              !getCartListProductCount(item._id)
                ? showToast('不能再减少了歪!')
                : ASItemToCart(shopId, shopName, item, -1)
            "
          >
            -
          </div>
          <div class="product__item__number__val">
            {{ getCartListProductCount(item._id) || 0.0 }}
          </div>
          <div
            class="product__item__number__add"
            @click="
              getCartListProductCount(item._id) > 99
                ? showToast('不能再增加了歪!')
                : ASItemToCart(shopId, shopName, item, 1)
            "
          >
            +
          </div>
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
import { ref, reactive, toRefs } from "@vue/reactivity";
import { get } from "../../utils/request";
import { watchEffect } from "@vue/runtime-core";
import Toast, { useToastEffect } from "../../components/Toast.vue";
import { useCartProASEffect } from "./useCartProASEffect";

// category静态数据
const categoryList = [
  { name: "全部商品", tab: "all" },
  { name: "秒杀", tab: "seckill" },
  { name: "新鲜蔬菜", tab: "fruit" },
];

// category相关逻辑
const useCategoryEffect = () => {
  const currentTab = ref(categoryList[0].tab);

  const handleCategoryClick = (tab) => {
    currentTab.value = tab;
  };
  return { currentTab, handleCategoryClick };
};

// productList相关逻辑
const useProductEffect = (currentTab, shopId) => {
  // 请求数据
  const data = reactive({ productList: [] });
  const getProductList = async () => {
    const result = await get(`/shop/${shopId}/products`, {
      tab: currentTab.value, // 依赖currentTab
    });
    data.productList = result.data;
  };
  // 自动感知代码依赖：点击category，currentTab变化，watchEffect感知getProductList变化
  watchEffect(() => {
    getProductList();
  });
  const { productList } = toRefs(data);
  // toRefs:将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的ref
  // https://v3.cn.vuejs.org/api/refs-api.html#torefs
  return { productList };
};

export default {
  name: "ShopMain",
  props: ["shopName"],
  components: {
    Toast,
  },
  setup() {
    // 加减商品数量
    const { cartList, shopId, ASItemToCart } = useCartProASEffect();
    // 根据当前currentTab请求对应数据
    const { currentTab, handleCategoryClick } = useCategoryEffect();
    const { productList } = useProductEffect(currentTab, shopId);
    // 吐司
    const { show, content, showToast } = useToastEffect();

    // 获取产品数量：
    const getCartListProductCount = (proID) => {
      return cartList?.[shopId]?.productList?.[proID]?.count;
    };

    return {
      categoryList,
      cartList,
      shopId,
      ASItemToCart,
      currentTab,
      productList,
      handleCategoryClick,
      getCartListProductCount,
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
.shopMain {
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0.49rem;
  .category {
    overflow-y: auto;
    width: 0.76rem;
    background: #f1f1f1;
    &__item {
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.14rem;
      color: $shop-color;
      &--active {
        background: #fff;
      }
    }
  }
  .product {
    flex: 1;
    padding: 0.08rem 0.16rem;
    overflow: auto;
    &__item {
      position: relative;
      display: flex;
      margin-bottom: 0.12rem;
      padding-bottom: 0.12rem;
      border-bottom: 0.01rem solid #f1f1f1;
      &__img {
        margin-right: 0.16rem;
        width: 0.68rem;
        height: 0.68rem;
        img {
          width: 100%;
        }
      }
      &__detail {
        flex: 1;
        overflow: hidden;
        &__title {
          @include ellipsis;
          margin: 0.06rem 0;
          font-size: 0.14rem;
          color: $shop-color;
        }
        &__sales {
          margin-bottom: 0.06rem;
          font-size: 0.12rem;
          color: $shop-color;
          line-height: 0.16rem;
        }
        &__price {
          &__yen {
            margin-right: 00.06rem;
            font-size: 0.16rem;
            color: #e93b3b;
            line-height: 0.2rem;
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
        margin-bottom: 0.12rem;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        &__val {
          margin: 0 0.1rem;
          font-size: 0.14rem;
          color: $shop-color;
          line-height: 0.16rem;
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
}
</style>