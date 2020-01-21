const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    chainWebpack: (config) => {
        /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
                config.plugins.delete('prefetch')
            }
        }
        config.resolve.alias
        .set('@', resolve('src'))
        .set('@img',resolve('src/assets/img'))
        .set('@assets',resolve('src/assets'))
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production';
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据进行压缩
                    deleteOriginalAssets: false //是否删除原文件
                })]
            }
        }
    },
    publicPath: './',
    css: {
        loaderOptions: {
          // 给 sass-loader 传递选项
          sass: {
            // @/ 是 src/ 的别名
            // 所以这里假设你有 `src/variables.sass` 这个文件
            // 注意：在 sass-loader v7 中，这个选项名是 "data"
            prependData: `@import "~@/assets/style/style.scss"`
          },
          // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
          // 因为 `scss` 语法在内部也是由 sass-loader 处理的
          // 但是在配置 `data` 选项的时候
          // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
          // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
          scss: {
            prependData: `@import "~@/assets/style/style.scss";`
          },
          // 给 less-loader 传递 Less.js 相关选项
          less:{
            // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
            // `primary` is global variables fields name
            globalVars: {
              primary: '#fff'
            }
          }
        }
      }
}
