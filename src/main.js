import { createApp } from 'vue'
const app = createApp(App)

import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import 'normalize.css' // 统一不同游览器之间的样式差异
import './style/index.scss'

app.use(router).use(store).use(ElementPlus).mount('#app')
