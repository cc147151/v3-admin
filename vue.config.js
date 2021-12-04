const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  devServer: {
    // 配置反向代理
    proxy: {
      // 当地址中有/api的时候会触发代理机制
      '/api': {
        // 要代理的服务器地址  这里不用写 api
        target: 'https://api.imooc-admin.lgdsunday.club',
        changeOrigin: true // 是否跨域
        // 后端接口是'https:xxx/api/xxx',需要/api这个字段，所以不能用下面代码
        // pathRewrite:{
        //   '/api':''
        // }
      }
    }
  },
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
