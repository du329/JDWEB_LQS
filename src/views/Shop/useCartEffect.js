import { useRoute } from "vue-router";
import { useStore } from "vuex";

// shopCart相关逻辑
export const useCartEffect = () => {
    const store = useStore();
    const route = useRoute();
    const shopId = route.params.id;
    const { cartList } = store.state;

    // 加减商品数量
    const ASItemToCart = (shopId, productId, productInfo, pro_count) => {
        store.commit("ASItemToCart", { shopId, productId, productInfo, pro_count });
    };

    return {
        cartList,
        shopId,
        ASItemToCart,
    };
};