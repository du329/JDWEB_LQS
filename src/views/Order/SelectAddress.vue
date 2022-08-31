<template>
  <div class="mangeAddressLayout">
    <div class="addressHeader">
      <span class="addressHeader__title">请选择收货地址</span>
    </div>
    <div class="addressBody">
      <div class="addressBody__title">我的收货地址</div>
      <div class="addressList">
        <div
          class="addressList__item"
          v-for="address in addressList"
          :key="address._id"
          @click="handleSelectAddress(address._id)"
        >
          <div class="userMsg">
            {{ address.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{ address.phone }}
          </div>
          <div class="userAddress">
            {{ address.city }}&nbsp; {{ address.department }}&nbsp;
            {{ address.houseNumber }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useBackEffect } from "../../effects/useBackEffect";
import { get } from "../../utils/request";
import { useRoute, useRouter } from "vue-router";

// 请求地址列表
const useAddressListEffect = () => {
  // let addressList = reactive([]); // 类似对象地址被替换
  let addressList = ref([]);
  const getAddressList = async () => {
    const result = await get("/api/user/address");
    if (result?.errno === 0 && result?.data?.length) {
      addressList.value = result.data;
    }
  };
  getAddressList();
  const route = useRoute();
  const router = useRouter();
  const handleSelectAddress = (_id) => {
    // back 无法携带数据，目前只能里利用push
    router.replace(`${route.query.path}?_id=${_id}`);
  };
  return { addressList, handleSelectAddress };
};

export default {
  name: "MangeAddress",
  setup() {
    // 回退
    const { handleBack } = useBackEffect();
    // 获取地址列表
    const { addressList, handleSelectAddress } = useAddressListEffect();
    return { handleBack, addressList, handleSelectAddress };
  },
};
</script>

<style lang="scss" scoped>
.mangeAddressLayout {
  .addressHeader {
    padding: 0 0.18rem;
    width: 100%;
    height: 0.44rem;
    line-height: 0.44rem;
    background: #fff;
    text-align: center;
    .iconfont {
      float: left;
      font-size: 0.18rem;
      color: #b6b6b6;
    }
    .addressHeader__title {
      font-size: 0.16rem;
      color: #333333;
    }
    .createAddress {
      float: right;
      font-size: 14px;
      color: #333333;
    }
  }
  .addressBody {
    padding: 0.16rem 0.18rem 0;
    position: absolute;
    top: 0.44rem;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    background: #f8f5f5;
    &__title {
      margin-bottom: 0.12rem;
      font-size: 0.14rem;
      color: #333333;
    }
    .addressList {
      &__item {
        position: relative;
        padding: 0.18rem 0.16rem;
        margin-bottom: 0.16rem;
        width: 100%;
        border-radius: 0.04rem;
        background: #fff;
        .userMsg {
          margin-bottom: 0.08rem;
          font-size: 0.14rem;
          color: #333333;
        }
        .userAddress {
          width: 85%;
          font-size: 0.14rem;
          color: #666666;
        }
        .iconfont {
          position: absolute;
          top: 50%;
          right: 2%;
          transform: translateY(-50%) rotate(-180deg);
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
  }
}
</style>