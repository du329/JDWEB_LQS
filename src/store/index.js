import Vuex from 'vuex'
// import { toRefs } from "@vue/reactivity";
export default Vuex.createStore({
  state: {
    // 第一层是商铺Id
    // 第二层是商品Id
    // 第二层内容是商品内容以及购物车数量
    cartList: {
      // shopId: {
      //   productId: {
      //     _id: '1',
      //     name: '番茄 250g / 份',
      //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //     sales: 10,
      //     price: 33.6,
      //     oldPrice: 39.6,
      //     count: 2
      //   },
      // }
    }

  },
  mutations: {
    ASItemToCart(state, payLoad) {
      const { shopId, productId, productInfo, pro_count } = payLoad;

      let shop = state.cartList[shopId];// 某个商店
      if (!shop) { shop = {} }
      let product  = shop[productId]; // 某个产品
      if (!product) { product = productInfo; product.count = 0 }
      product.count += pro_count; // add sub
      shop[productId] = product;
      state.cartList[shopId] = shop;
    },
  },
  actions: {
  },
  modules: {
  }
})
