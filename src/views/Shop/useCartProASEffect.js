import { useRoute } from "vue-router";
import { useStore } from "vuex";

// shopCart 加减商品相关逻辑
export const useCartProASEffect = () => {
    const store = useStore();
    const route = useRoute();
    const shopId = route.params.id;
    const { cartList } = store.state;

    // 加减商品数量
    const ASItemToCart = (shopId, shopName = '', productInfo, pro_count) => {
        store.commit("ASItemToCart", { shopId, shopName, productInfo, pro_count });
    };

    return {
        cartList,
        shopId,
        ASItemToCart,
    };
};