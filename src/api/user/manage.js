// user-manage/list
import service from '@/utils/request'
export const manageList = (data) => {
  return service({
    url: '/users/list',
    params: data
  })
}
export const menuList = () => {
  return service({
    url: '/menu/list'
    // url: '/menu/list'
  })
}
export const menuOperate = (data) => {
  return service({
    method: 'post',
    url: '/menu/operate',
    data
  })
}
export const deptAllList = () => {
  return service({
    url: '/dept/list'
  })
}
export const updateRole = (data) => {
  return service({
    method: 'post',
    url: '/users/operate',
    data
  })
}
export const deleteRole = (data) => {
  return service({
    method: 'post',
    url: '/users/delete',
    data
  })
}

/**
 * 批量导入
 */
export const userBatchImport = (data) => {
  return service({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
