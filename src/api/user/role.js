import service from '@/utils/request'
export const roleList = (data) => {
  return service({
    url: '/roles/list',
    params: data
  })
}
// θΏεηε°
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
