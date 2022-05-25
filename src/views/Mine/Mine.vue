<template>
  <div class="mineLayout">
    <div class="topArea"></div>
    <div class="mineContent">
      <div class="userInfoMofify"></div>
      <div class="userMessage">
        <div class="userHead"><img src="" alt="" /></div>
        <div class="userName">热心市民林先生</div>
        <div class="userId">ID: 19145314</div>
        <div class="userWallet">
          <div class="userWallet__item">
            <div class="userWallet__item__title"></div>
            <div class="userWallet__item__value"></div>
          </div>
        </div>
      </div>
      <div class="mineFunction">
        <div
          class="mineFunction__item"
          v-for="item in mineFunctionList"
          :key="item.imgURl"
        >
          <div class="mineFunction__item__img">
            <img :src="item.imgURl" alt="" />
          </div>
          <div class="mineFunction__item__name">{{ item.name }}</div>
          <div class="mineFunction__item__icon iconfont">&#xe640;</div>
        </div>
      </div>
    </div>
  </div>
  <Navigation :currentIndex="3" />
</template>

<script>
import { reactive } from "@vue/reactivity";
import Navigation from "../../components/Navigation.vue";
export default {
  name: "Mine",
  components: {
    Navigation,
  },
  setup() {
    const mineFunctionList = reactive([
      { imgURl: './Mine-img/money.png', name: "我的钱包" },
      { imgURl: "./Mine-img/address.png", name: "我的地址" },
      { imgURl: "./Mine-img/help.png", name: "客服与帮助" },
    ]);
    return { mineFunctionList };
  },
};
</script>

<style lang="scss" scoped>
.mineLayout {
  position: absolute;
  top: 0;
  bottom: 0.49rem;
  left: 0;
  right: 0;
  .topArea {
    width: 100%;
    height: 2.5rem;
    background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
    border-bottom-left-radius: 90% 40%;
    border-bottom-right-radius: 90% 40%;
  }
  .mineContent {
    position: absolute;
    top: 0.9rem;
    padding: 0 0.18rem;
    width: 100%;
    height: 300px;
    .userInfoMofify {
      position: absolute;
      top: -0.57rem;
      right: 0.18rem;
      width: 0.25rem;
      height: 0.25rem;
      background: #000;
    }
    .userMessage {
      margin-bottom: 0.16rem;
      width: 100%;
      height: 2.03rem;
      background: #fff;
      box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
      border-radius: 0.08rem;
    }
    .mineFunction {
      width: 100%;
      background: #fff;
      box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
      border-radius: 0.08rem;
      overflow: hidden;
      &__item {
        display: flex;
        padding: 0.12rem 0.16rem;
        align-items: center;
        height: 0.5rem;
        background: #fff;
        &__img {
          margin-right: 0.12rem;
          padding: 0.05rem;
          width: 0.22rem;
          height: 0.22rem;
          background: #ed4a47;
          border-radius: 0.08rem;
          img {
            width: 100%;
          }
        }
        &__name {
          font-size: 0.14rem;
          color: #262626;
        }
        &__icon {
          flex: 1;
          color: #c2c4ca;
          transform: rotate(-180deg);
        }
      }
    }
  }
}
</style>