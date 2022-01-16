import service from '@/utils/request'
export const roleList = (data) => {
  return service({
    url: '/roles/list',
    params: data
  })
}
// 返回的少
export const roleAllList = () => {
  return service({
    url: '/roles/allList'
  })
}
export const roleOperate = (data) => {
  return service({
    method: 'post',
    url: '/roles/operate',
    data
  })
}
export const setRolePermission = (data) => {
  return service({
    method: 'post',
    url: '/roles/permission',
    data
  })
}
