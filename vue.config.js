const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.3.91.149:8088', // 后端服务器地址，根据实际情况修改
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});