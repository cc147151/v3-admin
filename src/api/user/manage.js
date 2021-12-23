// user-manage/list
import service from '@/utils/request'
export const manageList = (data) => {
  return service({
    url: '/user-manage/list',
    params: data
  })
}
