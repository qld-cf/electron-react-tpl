/**
 * electron web端编译配置
 */
const path = require('path');

const pathResolve = (dir = '') => path.join(__dirname, '..', dir) // 指向 src/main

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  target: 'electron-main',
  entry: pathResolve('index.js'),
  output: {
    path: pathResolve(),
    filename: 'bundle.js',
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/
      },
    ]
  }
};