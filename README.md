# electron-react-umi-tpl

[github](https://github.com/qld-cf/electron-react-tpl)
[English Version](https://github.com/qld-cf/electron-react-tpl/blob/master/README_EN.md)


##### 如果你不习惯用umi版本，而喜欢用基于create-react-app的开放版本的模板，请[戳这里](https://github.com/qld-cf/electron-common-react-tpl)


更新日志：

1. 2020-06-08 添加[全量更新](https://segmentfault.com/a/1190000016674982)功能
2. 2020-06-29 添加[远程增量更新功能](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/PART_UPDATE.md)，无需下载包来重新安装更新；
3. 2020-07-27 优化初始化客户端loading等待页面，优化页面
4. 2020-08-18 添加[选中复制右键黏贴功能](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/Copy.md)
5. 2020-08-24 优化win7部分系统白屏(win7关闭硬件加速)
6. 2020-08-28 添加`koa2 + typescript + websocket + redis + log4js`服务端websocket|redis功能,客户端socket.io
7. 2020-09-20 新增错误边界识别和处理(页面中遇到React语法等报错后，自动捕捉记录错误日志，页面返回首页,开发模式默认关闭，生产环境开启)
8. 2020-10-16 新增 [限制只允许应用单开/单实例](https://www.electronjs.org/docs/api/app#%E4%BA%8B%E4%BB%B6-second-instance)

---

[中文](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/CHANGE_LOG.md)
[English Version](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/CHANGE_LOG_EN.md)



`electron 9.1` + `umi 3.2` + `typescript` + `react 16.12` + `redux` + `antDesign 4.0` + `eslint tslint react-tslint`脚手架, 下载即用，已经为你做好了基座设施

#### 客户端集成:
- [x] 自动更新(electron-builder)
- [x] 托盘菜单 app启动loading加载条
- [x] electron打印(electron 5.0以上支持)
- [x] electron-log 本地日志  electron-store 本地存储
- [x] app打包图标 添加增量更新
- [x] 添加redux-devtools插件
- [x] 右键复制黏贴
- [ ] app崩溃信息采集
- [ ] app消息通知，快捷键等



#### web端:
1. 基于[umi](https://umijs.org/zh-CN)脚手架，基础配置已集成，开发者关注业务代码编写即可
2. 本地存储redux(redux-saga)
3. antDesign >= 4.0
4. iconfont图标

- 菜单配置 `src/layouts/menu/config.tsx`


#### Fix:
- [x] 升级到electron9.1.0，同步官方
- [x] 部分win7白屏解决方案
- [ ] node Api功能封装与渲染进程业务解耦
- [ ] 代码优化


#### Next Feature
- [x] 基于create-react-app的版本



### 开启

```
npm i // 安装不成功请用yarn
npm start
npm run pack // 默认根据当前系统打包
npm run pack-mac // 打包mac平台
npm run pack-windows // 打包windows平台
npm run pack-all // 打包所有平台

// 开启websocket

cd ./server
npm run dev
```


### 目录树
```
|-- project
    |-- .editorconfig
    |-- .eslintrc.js
    |-- .gitignore
    |-- .gitlab-ci.yml
    |-- .prettierignore
    |-- .prettierrc.js
    |-- directoryList.md
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- typings.d.ts
    |-- eslint-rules 自定义eslint配置
    |   |-- base.js
    |   |-- react.js
    |   |-- ts.js
    |-- src
        |-- main 主进程
        |   |-- app-update.yml 生产环境自动更新配置
        |   |-- bundle.js 自动生成
        |   |-- bundle.js.map
        |   |-- dev-app-update.yml 开发环境自动更新配置
        |   |-- index.js 入口
        |   |-- loading.html
        |   |-- preload.js
        |   |-- README.md
        |   |-- config 编译配置
        |   |   |-- config.js
        |   |   |-- webpack.config.js
        |   |-- controls 控制集
        |   |   |-- AppAutoUpdater.js
        |   |   |-- AppMainWindow.js
        |   |   |-- AppTray.js
        |   |   |-- electron-helper.js
        |   |-- print 打印
        |   |   |-- print.html
        |   |   |-- print.js
        |   |-- public 附件
        |   |   |-- icon.ico
        |   |   |-- icon.png
        |   |   |-- tray.png
        |   |-- script 编译脚本
        |       |-- build.js
        |-- render 渲染进程
            |-- .env
            |-- .umirc.ts
            |-- app.ts
            |-- global.less
            |-- README.md
            |-- .umi umi自动生成配置和插件等
            |   |-- umi.ts
            |   |-- core
            |   |-- plugin-dva
            |   |-- plugin-initial-state
            |   |-- plugin-model
            |   |-- plugin-request
            |-- api 接口集合
            |   |-- api.list.ts
            |-- assets 附件
            |   |-- image
            |   |   |-- yay.jpg
            |   |-- style
            |       |-- bootstrap-part.less
            |       |-- common.less
            |-- common 通用
            |   |-- enum.ts
            |   |-- global.ts
            |-- components 组件
            |   |-- readme.md
            |   |-- AutoUpdate
            |   |   |-- index.tsx
            |   |   |-- style.less
            |   |-- FormCps
            |   |   |-- index.tsx
            |   |   |-- readme.md
            |   |-- TableCps
            |       |-- index.tsx
            |       |-- readme.md
            |-- config 配置
            |   |-- iconfont.ts
            |   |-- menus.tsx
            |-- dist 本地打包生成文件
            |-- layouts 布局
            |   |-- index.less
            |   |-- index.tsx
            |   |-- header
            |   |   |-- index.less
            |   |   |-- index.tsx
            |   |-- loading
            |   |   |-- index.less
            |   |   |-- index.tsx
            |   |-- menu
            |       |-- index.less
            |       |-- index.tsx
            |-- mock
            |   |-- foo.ts
            |-- models redux
            |   |-- xxStore.ts
            |-- pages
            |   |-- home.normal.less
            |   |-- index.tsx
            |   |-- Foo 示例
            |   |   |-- index.tsx
            |   |   |-- components
            |   |   |   |-- TableList.tsx
            |   |   |-- models
            |   |   |   |-- foo.ts
            |   |   |-- services
            |   |       |-- foo.ts
            |   |-- Home 业务
            |       |-- Edge
            |       |   |-- index.tsx
            |       |-- WebSocket
            |           |-- index.tsx
            |-- utils 工具集

```

### eslint
默认开启[alloy](https://github.com/AlloyTeam/eslint-config-alloy)配置
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
4. 下载electron 9.1一直失败，请删除包，然后安装全局的9.1版本的electron即可
5. 最新版本electron也可以尝试，求稳本地用9.1.0
6. umi版本随着业务量增大，tsx数量暴涨后，热加载效率会变低，可以尝试配置路由而不选用动态路由
```
// .umirc.ts
const routes = [] // 自定义路由，来自src/render/.umi/core/routes.ts
routes: closeFlexRoute ? routes : undefined,
```

### 参考

(官方electron文档)[https://www.electronjs.org/docs]
(官方umi文档)[https://umijs.org/]

###### 能用或者好用麻烦给一颗卑微的星星~谢谢  补充或者建议请提issue



[github](https://github.com/qld-cf/electron-react-tpl)


### 附录

![update](https://cdn.nlark.com/yuque/0/2020/png/2166813/1600571961820-5b9ccc9e-f3dc-46f9-8f4f-5c8dde92fe12.png)
![update1](https://cdn.nlark.com/yuque/0/2020/jpeg/2166813/1600573119535-9fbb6b11-8ad8-4d65-a66d-17cc32ad7732.jpeg)
