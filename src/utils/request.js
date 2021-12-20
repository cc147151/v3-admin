import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '../store/index'
// 特殊code值得操作,以reject返回
const otherCode = [2001]
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 8000
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data: res } = response
    if (response.status === 200) {
      if (otherCode.includes(res.code)) {
        return Promise.reject(res)
      }
      if (res.success && res.code === 200) {
        return Promise.resolve(res)
      }
      ElMessage.error(res.message)
      return Promise.reject(res)
    }
  },
  (err) => {
    console.log(err.response)
    if (err.response) {
      const { data } = err.response
      if (data.code === 401) {
        store.dispatch('user/loginOut')
      }
      ElMessage.error(data.message)
      return Promise.reject(err)
    }

    // 没有response 例如超时，无网络
    if (err.message) {
      if (err.message.includes('timeout')) {
        ElMessage.error('网络超时噢!')
        return Promise.reject(err)
      }
      if (err.message === 'Network Error') {
        ElMessage.error('网络连接失败')
        return Promise.reject(err)
      }
      ElMessage.error(err.message)
      return Promise.reject(err)
    } else {
      ElMessage.error('网络错误')
      return Promise.reject(err)
    }
  }
)
export default service
