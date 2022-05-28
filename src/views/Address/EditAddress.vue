<template>
  <div class="editAddressLayout">
    <div class="addressHeader">
      <span class="iconfont" @click="handleBack">&#xe640;</span>
      <span class="addressHeader__title">编辑收货地址</span>
      <span class="keepAddress">保存</span>
    </div>
    <div class="addressDetial">
      <ul>
        <li class="cite">所在城市：<span>北京市</span></li>
        <li></li>
        <li class="area">小区/大厦/学校：<span>北理工大学国防科技园</span></li>
        <li></li>
        <li class="houseNumber">楼号-门牌号：<span>2号楼10层</span></li>
        <li></li>
        <li class="consignee">收货人：<span>小慕</span></li>
        <li></li>
        <li class="contactNumber">联系电话：<span>18911023277</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useBackEffect } from "../../effects/useBackEffect";
import { useRoute } from "vue-router";
export default {
  name: "EditAddress",
  setup() {
    const { handleBack } = useBackEffect();
    const route = useRoute();
    console.log(route.query);
    return { handleBack };
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
        span {
          color: #333333;
        }
      }
    }
  }
}
</style>