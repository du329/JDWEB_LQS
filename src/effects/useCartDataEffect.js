import { useStore } from "vuex";
import { computed } from "vue";

export const useCartDataEffect = (shopId, handleCartShow) => {
    const store = useStore();
    const { cartList } = store.state;

    const productList = computed(() => {
        return cartList?.[shopId]?.productList || {};
    })

    const checkedProductList = computed(() => {
        const cPL = {};
        const productList = cartList?.[shopId]?.productList || {}
        if (Object.keys(productList).length) {
            for (let i in productList) {
                const product = productList[i];
                if (product.check) {
                    cPL[i] = product;
                }
            }
        }
        return cPL;
    })

    const shopName = computed(() => {
        return cartList?.[shopId]?.shopName || '';
    })

    // 总数与总价
    let cartData = computed(() => {
        const productList = cartList?.[shopId]?.productList || {};
        let productData = { allCount: 0, total: 0 };
        if (Object.keys(productList).length) {
            for (let i in productList) {
                const product = productList[i];
                productData.allCount += product.count;
                if (product.check) {
                    // 计算总数量和总价
                    productData.total += product.count * product.price;
                }
            }
        }
        return productData;
    });

    // computed的每一个计算属性都会被缓存起来，
    // 只要计算属性所依赖的属性发生变化，计算属性就会重新执行，视图也会更新。

    let allCheck = computed(() => {
        let flag = false;
        const productList = cartList[shopId]?.productList || {};
        if (Object.keys(productList).length) {
            flag = true;
            for (let i in productList) {
                const product = productList[i];
                if (product.count > 0 && !product.check) {
                    flag = false;
                }
            }
        } else {
            handleCartShow();
        }
        return flag;
    });

    return { productList, checkedProductList, shopName, cartData, allCheck }
}
