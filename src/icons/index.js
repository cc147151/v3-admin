// 引入element-plus的icon注册全局，可以直接使用，组件里定义以el-开头的为element的icon
import * as ElIcon from '@element-plus/icons-vue'
// 下载好的svg文件把 fill="#色值" （自带的色值）删掉,代码定义颜色才生效
import SvgIcon from '@/components/SvgIcon'
const requireSvg = require.context(
  // 其组件目录的相对路径
  './svg',
  // 是否查询其子目录
  false,
  // 匹配目标正则表达式
  /\.svg$/
)
// requireSvg(svgIcon) 相当于 require('./svg/...')
requireSvg.keys().forEach((svgIcon) => requireSvg(svgIcon))
export default (app) => {
  app.component('svg-icon', SvgIcon)
  for (const item in ElIcon) {
    app.component(item, ElIcon[item])
  }
}
