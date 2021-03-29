/* eslint-disable @typescript-eslint/camelcase */
/**
 * 主进程 webpack 构建
 * electron 启动交给 electron-connect
 */
const path = require('path');
const child_process = require('child_process');
const electron = require('electron');
const webpack = require('webpack');
const chalk = require('chalk');
const ora = require('ora');
const wait_on = require('wait-on');
const argv = require('minimist')(process.argv.slice(2));
const config_factory = require('./webpack.main');
require('dotenv').config({ path: path.join(__dirname, '../src/render/.env') });

const root = path.join(__dirname, '..');
const main = process.env['npm_package_main'];
const { env, port = process.env.PORT, watch } = argv;
const spinner = ora('Electron webpack build...');
const TAG = 'scripts/main-build.js';
let watching = null;
let child = null;

const compiler = webpack(config_factory(env));
compiler.hooks.afterCompile.tap(TAG, () => {
  spinner.stop();
  if (watch) { // 开发模式
    if (child) { process.kill(child.pid, 'SIGINT'); }
    child = child_process.spawn(
      electron,
      [path.join(root, main)],
      { stdio: 'inherit', }
    );
  }
});
compiler.hooks.beforeCompile.tap(TAG, () => {
  spinner.start();
});

function compileHandle(err, stats) {
  if (err) {
    // err 对象将只包含与webpack相关的问题，例如错误配置等
    console.log(TAG, chalk.red('💥 Electron webpack 相关报错'));
    console.log(err);

    // 关闭 wepback 监听
    watching && watching.close(() => console.log(TAG, 'Watching Ended.'));
    process.exit(1);
  } else if (stats.hasErrors()) {
    // webpack 编译报错
    const json = stats.toJson('errors-only');
    console.log(TAG, json.errors);
    console.log(TAG, chalk.red('💥 Electron 构建报错'));
  } else {
    console.log(TAG, chalk.green('Electron webpack 构建完成'));
  }
}

if (watch) { // 开发模式
  const opts = {
    resources: [`http://localhost:${port}`], // PORT === port
    interval: 900, // poll interval in ms, default 250ms
    log: false,
  };

  // 等待 webpack-dev-server 启动后启动 electron
  wait_on(opts, function (err) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // once here, all resources are available
    watching = compiler.watch({
      ignored: /bundle\.js(\.map)?/,
    }, compileHandle);
  });
} else { // 构建模式
  compiler.run(compileHandle);
}