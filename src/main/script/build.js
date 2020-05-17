/**
 * webpack 构建
 */
const webpack = require('webpack');
const chalk = require('chalk');
const config = require('../config/webpack.config');

const compiler = webpack(config);
const TAG = '[src/main/script/build.js]';

compiler.hooks.beforeCompile.tap(TAG, arg0 => {
  console.log(TAG, chalk.yellow('Electron webpack 开始构建'));
});

compiler.run((err, stats) => {
  if (err) {
    // err 对象将只包含与webpack相关的问题，例如错误配置等
    console.log(TAG, chalk.red('💥 Electron webpack 相关报错'));
  } else if (stats.hasErrors()) {
    // webpack 编译报错
    const json = stats.toJson('errors-only');
    console.log(TAG, filterLogs(json.errors)().join('\n'));
    console.log(TAG, chalk.red('💥 Electron 构建报错'));
  } else {
    console.log(TAG, chalk.green('Electron webpack 构建完成'));
  }
});

/**
 * webpack 日志过滤
 */
function filterLogs(errors) {
  let tmp = [];
  return function (filter = true) {
    if (filter) {
      errors.forEach(err => {
        if (err.includes('Error: Child compilation failed:')) {
          // 忽略 webpack 内部调用错误栈
          return;
        }
        if (!tmp.find(_ => _.split('\n')[1] === err.split('\n')[1])) {
          // 一个错误，可能会被爆出多次，做下报错去重
          // 比如一个 loader 报错，那么 n 个文件经过 loader 就会报出 n 个错误
          tmp.push(err);
        }
      });
    } else {
      tmp = errors;
    }
    return tmp;
  }
}
