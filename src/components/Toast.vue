<template>
  <div class="toast">
    <span>{{ content }}</span>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import "animate.css";
export default {
  name: "Toast",
  props: ["content"],
};
// 弹窗
export const useToastEffect = () => {
  const toastData = reactive({ show: false, content: "" });
  const { show, content } = toRefs(toastData);

  const showToast = (message) => {
    toastData.show = true;
    toastData.content = message;
    setTimeout(() => {
      toastData.show = false;
      toastData.content = "";
    }, 1500);
  };

  return { show, content, showToast };
};
</script>

<style>
.toast {
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 0.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.2rem;
  color: #fff;
  background: linear-gradient(to left top, #42b984, #354b5f);
  border-radius: 0.07rem;
}
</style>