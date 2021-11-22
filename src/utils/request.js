import axios from 'axios'
import { ElMessage } from 'element-plus'
// 特殊code值得操作,以reject返回
const otherCode = [401]
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 8000
})
service.interceptors.response.use(
  (response) => {
    console.dir(ElMessage)
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
    ElMessage.error(err.message)
    return Promise.reject(err)
  }
)
export default service
