<template>
  <div class="createAddressLayout">
    <div class="addressHeader">
      <span class="iconfont" @click="handleBack">&#xe640;</span>
      <span class="addressHeader__title">新建收货地址</span>
      <span class="keepAddress">保存</span>
    </div>
    <div class="addressDetial">
      <ul>
        <li class="cite">所在城市：<input placeholder="如北京市"/></li>
        <li></li>
        <li class="area">小区/大厦/学校：<input placeholder="北理工大学国防科技园"/></li>
        <li></li>
        <li class="houseNumber">楼号-门牌号：<input placeholder="A号楼B层"/></li>
        <li></li>
        <li class="consignee">收货人：<input placeholder="请填写收货人的姓名"/></li>
        <li></li>
        <li class="contactNumber">联系电话：<input placeholder="请填写收货手机号"/></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useBackEffect } from "../../effects/useBackEffect";
export default {
  name: "CreateAddress",
  setup() {
    const { handleBack } = useBackEffect();
    return { handleBack };
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
          &::placeholder{
            color: #999999;
          }
        }
      }
    }
  }
}
</style>