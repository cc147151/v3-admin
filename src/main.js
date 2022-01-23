import { createApp } from 'vue'
import directives from './directives'

import App from './App.vue'
import router from './router'
import store from './store'

import icon from './icons/index'
import i18n from './i18n/index'
import './permission.js'
// elementPlus按需引入，message提示样式错乱，需要导入完整css
// import 'element-plus/dist/index.css'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
const app = createApp(App)
app.use(directives)
app.use(icon)
// app.use(ElementPlus)
app.use(store).use(router).use(i18n).mount('#app')
