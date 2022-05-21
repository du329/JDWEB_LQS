import Vuex from 'vuex'
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
    },
  },
  mutations: {
    // 加减 商品数量
    ASItemToCart(state, payLoad) {
      const { shopId, productId, productInfo, pro_count } = payLoad;
      let shop = state.cartList[shopId];// 某个商店
      if (!shop) { shop = {} }
      let product = shop[productId]; // 某个产品
      if (!product) { product = productInfo; product.count = 0; product.check = true; }

      product.count += pro_count; //单个商品数
      shop[productId] = product;
      state.cartList[shopId] = shop;
    },

    // 商品check = !check
    changeProductState(state, payLoad) {
      const { shopId, productId } = payLoad;
      state.cartList[shopId][productId].check = !state.cartList[shopId][productId].check;
    },

    // 全选
    allCheck(state, payLoad){
      const {shopId,allCheck} = payLoad;
      console.log(allCheck);
      const proList = state.cartList[shopId]
      for (let i in proList) {
        const product = proList[i];
        product.check = !allCheck;
      }
    },

    // 清空购物车
    clearCart(state,payLoad){
      const {shopId} = payLoad;
      state.cartList[shopId] = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
