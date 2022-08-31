<template>
  <div class="createAddressLayout">
    <div class="addressHeader">
      <span class="iconfont" @click="handleBack">&#xe640;</span>
      <span class="addressHeader__title">新建收货地址</span>
      <span class="keepAddress" @click="createAddress(address)">保存</span>
    </div>
    <div class="addressDetial">
      <ul>
        <li class="cite">
          所在城市：<input placeholder="如宁德市" v-model="address.city" />
        </li>
        <li></li>
        <li class="area">
          小区/大厦/学校：<input
            placeholder="如KKK小区"
            v-model="address.department"
          />
        </li>
        <li></li>
        <li class="houseNumber">
          楼号-门牌号：<input
            placeholder="如05-2906"
            v-model="address.houseNumber"
          />
        </li>
        <li></li>
        <li class="consignee">
          收货人：<input
            placeholder="请填写收货人的姓名"
            v-model="address.name"
          />
        </li>
        <li></li>
        <li class="contactNumber">
          联系电话：<input
            placeholder="请填写收货手机号"
            v-model="address.phone"
          />
        </li>
      </ul>
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
import { reactive } from "@vue/reactivity";
import { useBackEffect } from "../../effects/useBackEffect";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast"; // 自定义弹窗
import { useRouter } from "vue-router";

const useAddressEffect = (showToast) => {
  const router = useRouter();
  const address = reactive({
    city: "",
    department: "",
    houseNumber: "",
    name: "",
    phone: "",
  });

  const createAddress = async (address) => {
    const result = await post(`/api/user/address`, address);
    if (result?.errno === 0) {
      showToast("创建成功");
      setTimeout(() => {
        router.back();
      }, 800);
    }
  };
  return { address, createAddress };
};
export default {
  name: "CreateAddress",
  components: {
    Toast,
  },
  setup() {
    // 回退
    const { handleBack } = useBackEffect();
    const { show, content, showToast } = useToastEffect();

    // 地址
    const { address, createAddress } = useAddressEffect(showToast);
    return { show, content, showToast, handleBack, address, createAddress };
  },
};
</script>

<style lang="scss" scoped>
.createAddressLayout {
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
          color: #333333;
          outline: none;
          border: 0;
          &::placeholder {
            color: #999999;
          }
        }
      }
    }
  }
}
</style>