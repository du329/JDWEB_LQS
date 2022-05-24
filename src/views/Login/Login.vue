<template>
  <div class="loginLayout">
    <div class="userLogo">
      <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" />
    </div>

    <div class="loginMessage">
      <input
        type="text"
        class="username"
        placeholder="请输入用户名"
        v-model="username"
        autocomplete="new-password"
      />
      <input
        type="password"
        class="pwd"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
      <button class="submit" @click="handleLogin">登录</button>
      <div class="loginLink">
        <router-link :to="{ name: 'Register' }">
          <span class="loginLink__item">立即注册</span>
        </router-link>
        <span class="gapLine">|</span>
        <span class="loginLink__item">忘记密码</span>
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
import { useRouter } from "vue-router"; // 路由插件
import { reactive, toRefs } from "@vue/reactivity";
import { post } from "../../utils/request"; // axios请求函数
import Toast, { useToastEffect } from "../../components/Toast"; // 自定义弹窗

// 处理登录
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const loginMessage = reactive({ username: "", password: "" });
  const { username, password } = toRefs(loginMessage);

  const handleLogin = async () => {
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
    try {
      const result = await post("/user/login", loginMessage);
      if (result?.errno === 0) {
        showToast("登录成功!");
        localStorage.isLogin = true;
        setTimeout(() => {
          router.push({ name: "Home" });
        }, 800);
      } else {
        showToast("登录失败!");
      }
    } catch (error) {
      console.log(error);
      showToast("请求失败!");
    }
  };
  return { username, password, handleLogin };
};

export default {
  name: "Login",
  components: {
    Toast,
  },
  // setup的职责：了解代码执行的一个流程
  setup() {
    const { show, content, showToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToast);
    return { username, password, show, content, handleLogin };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.loginLayout {
  padding: 1.2rem 0.4rem 0;
  .userLogo {
    margin: 0 auto 0.4rem;
    width: 0.66rem;
    height: 0.66rem;
    img {
      width: 100%;
    }
  }
  .loginMessage {
    .username,
    .pwd {
      margin-bottom: 0.16rem;
      padding-left: 0.16rem;
      width: 100%;
      height: 0.48rem;
      background: #f9f9f9;
      border: 0.01rem solid rgba(0, 0, 0, 0.1);
      outline-color: $outLine-color;
      border-radius: 0.06rem;
      &::placeholder {
        font-weight: 500;
        font-size: 0.16rem;
        color: $color;
        letter-spacing: 0;
        line-height: 0.24rem;
      }
    }
    .pwd {
      margin-bottom: 0.32rem;
    }
    .submit {
      margin-bottom: 0.16rem;
      width: 2.95rem;
      height: 0.48rem;
      line-height: 0.24rem;
      text-align: center;
      font-size: 0.16rem;
      background: $outLine-color;
      color: #ffffff;
      border: 0;
      border-radius: 0.06rem;
    }
    .loginLink {
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