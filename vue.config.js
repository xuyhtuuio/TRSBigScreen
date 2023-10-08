// eslint-disable-next-line
const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';
const publicPath = process.env.NODE_ENV === 'dataelite' ? '/teisweb/' : './';
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: !isProduction,
  publicPath,
  css: {
    extract: {
      Type: true,
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      // src定义成@
      .set('@', resolve('src'))
      // components定义成_c
      .set('_c', resolve('src/components'));
    config.resolve.extensions
      .add('.js')
      .add('.json')
      .add('.jsx');
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');

    // 支持vue template 可选链和空值合并
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line
        options.compiler = require('vue-template-babel-compiler');
        return options;
      });
  },
  devServer: {
    host: 'localhost',
    port: '8081',
    https: false,
    hotOnly: false,
    proxy: {
      '/teis/': {
        target: 'http://192.168.210.52:31537/', // 生产
        // target: 'http://192.168.210.57:31588/', // 测试
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/teis/': '/teis/'
        }
      },
      '/consumer_test/': {
        target: 'http://192.168.210.66:22255/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/consumer/': '/consumer_test/'
        }
      },
      '/uaa/': {
        target: 'http://39.104.62.255',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/uaa/': '/uaa/',
        }
      },
    }
  }
};
