import service from '@/utils/request'
export const roleList = (data) => {
  return service({
    url: '/role/list'
  })
}
export const permissionList = () => {
  return service({
    url: '/permission/list'
  })
}
export const rolePermission = (id) => {
  return service({
    url: `/role/permission/${id}`
  })
}
export const setPermission = (data) => {
  return service({
    method: 'post',
    url: '/role/distribute-permission',
    data
  })
}
