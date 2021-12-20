import service from '../../utils/request'
export const roleList = (data) => {
  return service({
    url: '/role/list'
  })
}
export const setPermission = (id) => {
  return service({
    url: `/role/permission/${id}`
  })
}
