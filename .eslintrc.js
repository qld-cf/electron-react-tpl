/**
 * 自定义eslint tslint配置
 */
const base = require('./eslint-rules/base');
const react = require('./eslint-rules/react');
const ts = require('./eslint-rules/ts');

module.exports = {
  extends: [
    'alloy',
    'alloy/react',
    'alloy/typescript'
  ],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    //
    browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 你的全局变量（设置为 false 表示它不允许被重新赋值）
    //
    // myGlobal: false
  },
  rules: {
    ...base,
    ...react,
    ...ts,
    // 在 Promise 中使用 asnyc
    'no-async-promise-executor': 0,
    'default-case-last': 'off',
    'no-useless-backreference': 'off',
  },
};