// user-manage/list
import service from '@/utils/request'
export const manageList = (data) => {
  return service({
    url: '/user-manage/list',
    params: data
  })
}
export const roleList = () => {
  return service({
    url: '/role/list'
  })
}
export const rolePerson = (id) => {
  return service({
    url: '/user-manage/role/' + id
  })
}
export const updateRole = (id, data) => {
  return service({
    method: 'post',
    url: 'user-manage/update-role/' + id,
    data
  })
}
export const deleteRow = (id) => {
  return service({
    url: '/user-manage/detele/' + id
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
