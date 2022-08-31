<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  mounted() {
    // window.addEventListener("beforeunload", () => {
    //   localStorage.removeItem("isLogin");
    // });
    window.onbeforeunload = function () {
      localStorage.removeItem("isLogin");
    };
  },
  // 执行关闭定时器、取消订阅消息、解绑自定义事件等收尾操作
  // beforeUnmount() {
  //   window.onbeforeunload = function () {
  //     localStorage.removeItem("isLogin");
  //   };
  // },
};
</script>