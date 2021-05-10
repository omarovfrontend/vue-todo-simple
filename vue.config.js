module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      '^/api/*': {
        target: 'http://localhost:3005',
        changeOrigin: true,
        logLevel: 'debug'
      }
    },
    overlay: {
      warnings: false,
      errors: true
    }
  },
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: true,
  parallel: undefined
}
