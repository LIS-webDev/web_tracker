const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir : process.env.NODE_ENV === 'production' ? '../vue/dist/' : '../vue/dist-dev/',
  publicPath : process.env.NODE_ENV === 'production' ? '/local/vue/dist/' : '/local/vue/dist-dev/',
  filenameHashing : false,
  runtimeCompiler : true,
})