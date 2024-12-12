
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': { // 使用路径前缀作为代理匹配规则，比如前端请求路径是 /api/doctors/department 这样的就会被匹配
        target: 'http://113.44.151.153:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' 
        }
      }
    }
  }
})

