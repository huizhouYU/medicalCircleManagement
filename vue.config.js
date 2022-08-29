  pages: {
    index: {
      entry: "src/main.js", //入口
    },
    devServer: {
      proxy: { //配置跨域
        '/api': {
          target: 'http://192.168.0.110:8080/#/',//这里填你项目真实的后端地址）
          pathRewrite: {
            '^/api': ''
          },
          ws: true, //如果要代理 websockets，配置这个参数
          //     secure: false, // 如果是https接口，需要配置这个参数
          changeOrigin: true //允许跨域
        }
      }
    }
  },
}
