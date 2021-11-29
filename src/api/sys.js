import service from '../utils/request'
export const login = (data) => {
  return service({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
export const userInfo = (data = {}) => {
  return service({
    url: '/sys/profile',
    method: 'GET',
    params: data
  })
}
