<template>
  <div class="editAddressLayout">
    <div class="addressHeader">
      <span class="iconfont" @click="handleBack">&#xe640;</span>
      <span class="addressHeader__title">编辑收货地址</span>
      <span class="keepAddress" @click="patchAddress(address)">保存</span>
    </div>
    <div class="addressDetial">
      <ul>
        <li class="cite">
          所在城市：<input type="text" v-model="address.city" />
        </li>
        <li></li>
        <li class="area">
          小区/大厦/学校：<input type="text" v-model="address.department" />
        </li>
        <li></li>
        <li class="houseNumber">
          楼号-门牌号：<input type="text" v-model="address.houseNumber" />
        </li>
        <li></li>
        <li class="consignee">
          收货人：<input type="text" v-model="address.name" />
        </li>
        <li></li>
        <li class="contactNumber">
          联系电话：<input type="text" v-model="address.phone" />
        </li>
      </ul>
      <div class="delAddress" @click="removeAddress(_id)">删除地址</div>
    </div>

    <transition
      :duration="{ enter: 0, leave: 0 }"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <Toast v-if="show" :content="content" />
    </transition>
  </div>
</template>

<script>
import { useBackEffect } from "../../effects/useBackEffect";
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";
import { get, patch, del } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast"; // 自定义弹窗

const useAddressEffect = (showToast, _id,handleBack) => {
  const address = ref({});
  // 请求地址
  const getAddress = async () => {
    const result = await get(`/api/user/address/${_id}`);
    if (result?.errno === 0) {
      address.value = result.data;
    }
  };
  getAddress();
  // 更新地址
  const patchAddress = async (address) => {
    const result = await patch(`/api/user/address/${_id}`, address);
    if (result?.errno === 0) {
      showToast("保存成功");
      setTimeout(() => {
        handleBack()
      }, 800);
    }
  };
  // 删除地址
  const removeAddress = async () => {
    const result = await del(`/api/user/address/${_id}`);
    if (result?.errno === 0) {
      showToast("删除成功");
      setTimeout(() => {
        handleBack()
      }, 800);
    }
  };
  return { address, patchAddress, removeAddress };
};

export default {
  name: "EditAddress",
  components: {
    Toast,
  },
  setup() {
    const { show, content, showToast } = useToastEffect();
    const { handleBack } = useBackEffect();
    const route = useRoute();
    const _id = route.params._id;
    console.log(_id);
    const { address, patchAddress, removeAddress } = useAddressEffect(
      showToast,
      _id,
      handleBack
    );
    return {
      show,
      content,
      showToast,
      handleBack,
      address,
      _id,
      patchAddress,
      removeAddress,
    };
  },
};
</script>

<style lang="scss" scoped>
.editAddressLayout {
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
    .keepAddress {
      float: right;
      font-size: 14px;
      color: #333333;
    }
  }
  .addressDetial {
    padding-top: 0.16rem;
    position: absolute;
    top: 0.44rem;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f8f5f5;
    ul {
      li {
        padding-left: 0.18rem;
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 0.14rem;
        color: #666666;
        list-style: none;

        background: #fff;
        &:nth-child(even) {
          height: 0;
          border: 0.01rem solid #f1f1f1;
        }
        input {
          height: 100%;
          border: 0;
          outline: none;
          color: #333333 !important;
        }
      }
    }

    .delAddress {
      position: absolute;
      bottom: 0.49rem;
      text-align: center;
      width: 100%;
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.16rem;
      background: #fff;
      color: red;
    }
  }
}
</style>