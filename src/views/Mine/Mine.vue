<template>
  <div class="mineLayout">
    <div class="topArea"></div>
    <div class="mineContent">
      <div class="userInfoMofify">
        <img src="./Mine-img/editor.png" alt="" />
      </div>
      <div class="userMessage">
        <div class="userHead"><img src="./Mine-img/avatar.jpg" alt="" /></div>
        <div class="userName">
          热心市民林先生
          <span class="collection">
            <div class="collection__Img">
              <img src="./Mine-img/star.png" alt="" />
            </div>
            <div class="collection__Number">16</div>
          </span>
        </div>
        <div class="userId">ID: 19145314</div>
        <div class="userWallet">
          <div
            class="userWallet__item"
            v-for="(item, index) in list"
            :key="item.title"
          >
            <div class="userWallet__item__title">
              {{ item.title }}
            </div>
            <div class="userWallet__item__value">
              {{ index === 1 ? `${item.value}张` : item.value }}
            </div>
          </div>
        </div>
      </div>
      <div class="mineFunction">
        <div class="mineFunction__item">
          <div class="mineFunction__item__img money">
            <img src="./Mine-img/money.png" alt="" />
          </div>
          <div class="mineFunction__item__name">我的钱包</div>
          <div class="mineFunction__item__icon iconfont">&#xe640;</div>
        </div>
        <router-link :to="{ name: 'MangeAddress' }">
          <div class="mineFunction__item">
            <div class="mineFunction__item__img address">
              <img src="./Mine-img/address.png" alt="" />
            </div>
            <div class="mineFunction__item__name">我的地址</div>
            <div class="mineFunction__item__icon iconfont">&#xe640;</div>
          </div>
        </router-link>
        <div class="mineFunction__item">
          <div class="mineFunction__item__img help">
            <img src="./Mine-img/help.png" alt="" />
          </div>
          <div class="mineFunction__item__name">客服与帮助</div>
          <div class="mineFunction__item__icon iconfont">&#xe640;</div>
        </div>
      </div>
      <div class="exit" @click="exit"><button>退出</button></div>
    </div>
  </div>
  <Navigation :currentIndex="3" />
</template>

<script>
// import { reactive, toRefs } from "@vue/reactivity";
import Navigation from "../../components/Navigation.vue";
import { useBackEffect } from "../../effects/useBackEffect";
// import { post } from "../../utils/request";

// const useMineDataEffect = () => {
//   const data = reactive({ list: [] });
//   const getMineData = async () => {
//     const result = await post("/mine/userWallet");
//     if (result.errno === 0) {
//       data.list = result.data;
//     }
//   };
//   getMineData();
//   const { list } = toRefs(data);
//   return { list };
// };

const useExitEffect = (handlePush) => {
  const exit = () => {
    localStorage.isExpire = true;
    localStorage.removeItem('token');
    handlePush("Login")
  };
  return { exit };
};

export default {
  name: "Mine",
  components: {
    Navigation,
  },
  setup() {
    // const { list } = useMineDataEffect();
    const { handlePush } = useBackEffect();
    const { exit } = useExitEffect(handlePush);
    return { exit };
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
    bottom: 0;
    padding: 0 0.18rem;
    width: 100%;
    .userInfoMofify {
      position: absolute;
      top: -0.57rem;
      right: 0.18rem;
      width: 0.25rem;
      height: 0.25rem;
      color: #fff;
      img {
        width: 100%;
      }
    }
    .userMessage {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.16rem;
      align-items: center;
      padding-top: 0.59rem;
      width: 100%;
      height: 1.99rem;
      background: #fff;
      box-shadow: 0 0.08rem 0.16rem 0 rgba(0, 0, 0, 0.08);
      border-radius: 0.08rem;
      .userHead {
        // transform: translateY(-50%);
        position: absolute;
        top: -0.47rem;
        margin: 0 auto;
        width: 0.94rem;
        height: 0.94rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .userName {
        position: relative;
        margin-bottom: 0.02rem;
        font-size: 0.24rem;
        color: #262628;
        letter-spacing: 0.19px;
        .collection {
          position: absolute;
          top: 50%;
          right: -30%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          padding: 0.02rem;
          width: 0.35rem;
          height: 0.15rem;
          background-image: linear-gradient(180deg, #bee700 0%, #8aca00 100%);
          border-radius: 1rem;
          &__Img {
            position: relative;
            background: #81ac00;
            width: 0.11rem;
            height: 0.11rem;
            border-radius: 50%;
            img {
              position: absolute;
              width: 100%;
            }
          }
          &__Number {
            color: #fff;
            font-size: 0.2rem;
            transform: scale(0.5);
          }
        }
      }
      .userId {
        margin-bottom: 0.12rem;
        font-size: 0.14rem;
        color: #c1c0c9;
      }
      .userWallet {
        padding-top: 0.12rem;
        display: flex;
        border-top: 0.01rem solid #f1f1f1;
        width: 100%;
        &__item {
          width: 25%;
          text-align: center;
          &__title {
            margin-bottom: 0.08rem;
            font-size: 0.12rem;
            color: #c1c0c9;
          }
          &__value {
            font-size: 0.2rem;
            color: #262628;
          }
        }
      }
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
        .money {
          background: #ed4a47;
        }
        .address {
          background: #32c5ff;
        }
        .help {
          background: rgba(144, 19, 254, 0.92);
        }
        &__img {
          margin-right: 0.12rem;
          padding: 0.05rem;
          width: 0.22rem;
          height: 0.22rem;
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
    .exit {
      button {
        padding: 0.1rem 0.2rem;
        border: 0;
        color: white;
        border-radius: 0.07rem;
        background: #3a6ff3;
        &:hover {
          // background: red
        }
      }
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.3rem;
      font-size: 0.14rem;
    }
  }
}
</style>