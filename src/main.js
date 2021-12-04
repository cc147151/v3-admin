import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission.js'
// elementPlus按需引入，message提示样式错乱，需要导入完整css
// import 'element-plus/dist/index.css'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
const app = createApp(App)
// app.use(ElementPlus)
app.use(store).use(router).mount('#app')