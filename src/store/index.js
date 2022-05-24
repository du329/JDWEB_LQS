import Vuex from 'vuex'

// localStorage持久化存储
const setCartListToLS = (state) => {
  const { cartList } = state;
  localStorage.cartList = JSON.stringify(cartList);
}

const getCartListFromLS = () => {
  try {
    return JSON.parse(localStorage.cartList);
  } catch {
    return {};
  }
  //{shopId:{shopName:'',productList:{productId:{}},}}
}

export default Vuex.createStore({
  state: {
    cartList: getCartListFromLS(),
  },
  mutations: {
    // 加减 商品数量
    ASItemToCart(state, payLoad) {
      const { shopId, shopName, productInfo, pro_count } = payLoad;
      let shop = state.cartList[shopId] || { shopName: shopName, productList: {} }; // 某个商店中productList
      let product = shop.productList[productInfo._id]; // 某个产品
      if (!product) { product = productInfo; product.count = 0; product.check = true; }

      product.count += pro_count; //单个商品数

      // 商品数量为0，删除该商品对象
      if (product.count === 0) { delete shop.productList[productInfo._id]; }
      else {
        shop.productList[productInfo._id] = product;
        state.cartList[shopId] = shop;
      }
      setCartListToLS(state);
    },

    // 单选
    changeProductState(state, payLoad) {
      const { shopId, productId } = payLoad;
      state.cartList[shopId].productList[productId].check = !state.cartList[shopId].productList[productId].check;
      setCartListToLS(state)
    },

    // 全选
    allCheck(state, payLoad) {
      const { shopId, allCheck } = payLoad;
      const productList = state.cartList[shopId].productList
      for (let i in productList) {
        const product = productList[i];
        product.check = !allCheck;
      }
      setCartListToLS(state)
    },

    // 清空购物车
    clearCart(state, payLoad) {
      const { shopId } = payLoad;
      state.cartList[shopId].productList = {};
      setCartListToLS(state)
    },

    // 清除提交订单的数据
    clearCommittedData(state, payLoad) {
      const { products, shopId } = payLoad;
      for (const iterator of products) {
        delete state.cartList[shopId].productList[iterator.id];
        console.log(iterator.id);
      }
      setCartListToLS(state);
    }
  },
  actions: {
  },
  modules: {
  }
})
