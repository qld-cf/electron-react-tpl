/**
 * 主进程 webpack 配置
 */
const path = require('path');

const resolve = (dir = '') => path.join(__dirname, '../src/main', dir) // 指向 src/main

module.exports = function (env) {
  process.env.NODE_ENV = env;
  const isDev = env === 'development';

  return {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? undefined : 'cheap-module-source-map',
    target: 'electron-main',
    entry: resolve('index.js'),
    output: {
      path: resolve(),
      filename: 'bundle.js',
    },
    node: {
      __dirname: false,
      __filename: false
    },
    resolve: {
      extensions: ['.js', '.json', '.ts'],
      alias: {
        '@root': path.join(__dirname, '..'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node-modules/,
          loader: 'babel-loader',
          options: {
            plugins: ["@babel/plugin-transform-typescript"],
          },
        },
        {
          test: /\.node$/,
          loader: isDev ? 'node-loader' : 'relative-loader',
          options: isDev ? undefined : {
            relativePath: '/aclas-addons/'
          }
        },
      ]
    }
  };
};
