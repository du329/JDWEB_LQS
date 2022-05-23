<template>
  <div class="registerLayout">
    <div class="userLogo">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" />
    </div>

    <div class="registerMessage">
      <input
        type="text"
        class="username"
        placeholder="请输入用户名"
        v-model="username"
      />
      <input
        type="password"
        class="pwd"
        placeholder="请输入密码"
        v-model="password"
      />
      <input
        type="password"
        class="pwd"
        placeholder="请确认密码"
        v-model="ensurement"
      />
      <button class="submit" @click="handleRegister">注册</button>

      <div class="registerLink">
        <router-link :to="{ name: 'Login' }">
          <span class="registerLink__item">已有账号去登录</span>
        </router-link>
      </div>
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
import { useRouter } from "vue-router";
import { reactive, toRefs } from "@vue/reactivity";
import { post } from "../../utils/request"; // axios请求函数
import Toast, { useToastEffect } from "../../components/Toast"; // 自定义弹窗

// 处理注册
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const registerMessage = reactive({
    username: "",
    password: "",
    ensurement: "",
  });
  const { username, password, ensurement } = toRefs(registerMessage);

  const handleRegister = async () => {
    // 用户名、密码验证
    // let userVerify | pwdVerify = /^[a-zA-Z0-9_-]{11,16}$/;
    if (username.value === "") {
      showToast("请输入用户名!");
      return;
    }
    if (password.value === "") {
      showToast("请输入密码!");
      return;
    }
    if (ensurement.value === "") {
      showToast("请输入确认密码!");
      return;
    }
    try {
      const result = await post("/user/register", registerMessage);
      if (result?.errno === 0) {
        showToast("注册成功!");
        setTimeout(() => {
          router.push({ name: "Login" });
        }, 800);
      } else {
        showToast("注册失败!");
      }
    } catch (error) {
      console.log(error);
      showToast("请求失败!");
    }
  };
  return { username, password, ensurement, handleRegister };
};

export default {
  name: "Register",
  components: {
    Toast,
  },
  setup() {
    const { show, content, showToast } = useToastEffect();
    const { username, password, ensurement, handleRegister } =
      useRegisterEffect(showToast);

    return {
      username,
      password,
      ensurement,
      handleRegister,
      show,
      content,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.registerLayout {
  padding: 1.2rem 0.4rem 0;
  .userLogo {
    margin: 0 auto 0.4rem;
    width: 0.66rem;
    height: 0.66rem;
    img {
      width: 100%;
    }
  }
  .registerMessage {
    .username,
    .pwd {
      margin-bottom: 0.16rem;
      padding-left: 0.16rem;
      width: 100%;
      height: 0.48rem;
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
      outline-color: $outLine-color;
      border-radius: 0.06rem;
      &::placeholder {
        font-weight: 500;
        font-size: 0.16rem;
        color: $color;
        letter-spacing: 0;
        line-height: 24px;
      }
    }
    .pwd {
      margin-bottom: 0.16rem;
    }
    .submit {
      margin: 0.16rem 0;
      width: 2.95rem;
      height: 0.48rem;
      line-height: 24px;
      text-align: center;
      font-size: 0.16rem;
      background: $outLine-color;
      color: #ffffff;
      border: 0;
      border-radius: 0.06rem;
    }
    .registerLink {
      text-align: center;
      font-size: 0.14rem;
      color: $color;
      a {
        color: $color;
      }
      .gapLine {
        margin: 0 0.12rem;
      }
    }
  }
}
</style>