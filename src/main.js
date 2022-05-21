import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css' // 统一不同游览器之间的样式差异
import './style/index.scss' 

createApp(App).use(router).use(store).mount('#app')

