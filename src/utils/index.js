/*
  文件是否为excel
  @params:
    name:文件名字
*/
export const isExcel = (name) => {
  return /\.(xlsx|xls|csv)$/.test(name)
}
/*
  把时间戳转为年月日时分秒
  @params
    time:时间戳
    type: type==='ymd'仅返回年月日； 否则返回年月日时分秒
*/
export const formatTime = (time, type) => {
  console.log(time)
  if (!time || time === 'undefined') return ''
  if (time?.includes('T')) {
    time = new Date(time) - 0 + ''
  }
  console.log(time)
  if (time?.includes('/') || time?.includes('-')) return time
  let date = time
  date = new Date(time - 0)
  const pad = (n) => (n < 10 ? `0${n}` : n)
  const ymd = `${date?.getFullYear()}-${pad(date?.getMonth() + 1)}-${pad(
    date?.getDate()
  )}`
  const hms = ` ${pad(date?.getHours())}:${pad(date?.getMinutes())}:${pad(
    date?.getSeconds()
  )}`
  return type === 'ymd' ? ymd : ymd + hms
}
