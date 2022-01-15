import service from '@/utils/request'
export const login = (data) => {
  return service({
    url: '/users/login',
    method: 'POST',
    data
  })
}
export const userInfo = (data = {}) => {
  return service({
    url: '/users/profile',
    method: 'GET',
    params: data
  })
}
