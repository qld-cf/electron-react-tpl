# electron-react-umi-tpl

`electron 8.2` + `umi 3.1` + `typescript react 16.12` + `redux` + `antDesign 4.0` + `eslint tslint react-tslint`脚手架, 下载即用，已经为你做好了基座设施

客户端集成:
1. 自动更新(electron-builder)
2. 托盘菜单
3. app启动loading加载条
4. electron打印(electron 5.0以上支持)
5. 灰度发布方案
6. 本地日志
7. app打包图标
TODOLIST:  1. app崩溃信息采集
           2. app消息通知，快捷键等

web端:
1. 基于[umi](https://umijs.org/zh-CN)脚手架，基础配置已集成，开发者关注业务代码编写即可
2. 本地存储redux(redux-saga)
3. antDesign >= 4.0
4. iconfont图标

- 菜单配置 `src/layouts/menu/config.tsx`


TODOLIST:  1. node Api功能封装与渲染进程业务解耦


### 开启

```
npm i
npm start
npm run pack
```


### 目录树
```tree

```

### eslint
默认开启alloy配置
`eslint-config-alloy`



### log

- 本地调试日志

```js
const log = require('electron-log');
// log.transports.file.file = 'xx/record.log' 本地可指定文件
// 默认日志存放
// on Linux: ~/.config/{appName}/log.log
// on macOS: ~/Library/Logs/{appName}/log.log
// on Windows: user\AppData\Roaming\{appName}\log.log
log.info('Hello, log');
log.warn('Some problem appears');
```

### 注意事项

1. 下载依赖和打包运行错误，请用cnpm或者配置npm config的electron ERROR路径
2. 任何地方的component文件夹名不可首字母大写 会被umi识别为路由而影响热加载等
3. 卡在node install.js : npm config edit 添加：electron_mirror="https://npm.taobao.org/mirrors/electron/"

