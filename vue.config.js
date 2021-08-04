module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3030',
        changeOrigin: true
      },
    },
    historyApiFallback: true
  },
  // configureWebpack: {
  //   devServer: {
  //     historyApiFallback: true
  //   }
  // }
}