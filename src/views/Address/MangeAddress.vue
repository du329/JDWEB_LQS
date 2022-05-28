<template>
  <div class="mangeAddressLayout">
    <div class="addressHeader">
      <span class="iconfont" @click="handleBack">&#xe640;</span>
      <span class="addressHeader__title">管理收货地址</span>
      <router-link :to="{ name: 'CreateAddress' }">
        <span class="createAddress">新建</span>
      </router-link>
    </div>
    <div class="addressBody">
      <div class="addressBody__title">我的收货地址</div>
      <div class="addressList">
        <div class="addressList__item">
          <div class="userMsg">
            <span class="userName">小慕</span>
            <span class="userPhoto">18911023277</span>
          </div>
          <div class="userAddress">
            北京市海淀区西三环北路 2号院 北京理工大学 国防科技园2号楼 10层
          </div>
          <router-link :to="{ name: 'EditAddress', qurey: {} }">
            <span class="iconfont">&#xe640;</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBackEffect } from "../../effects/useBackEffect";
export default {
  name: "MangeAddress",
  setup() {
    const { handleBack } = useBackEffect();
    return { handleBack };
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
          color: #999999;
          .userName {
            margin-right: 0.66rem;
          }
        }
        .userAddress {
          width: 85%;
          font-size: 0.14rem;
          color: #333333;
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