# electron-react-umi-tpl

[github](https://github.com/qld-cf/electron-react-tpl)
[English Version](https://github.com/qld-cf/electron-react-tpl/blob/master/README_EN.md)

Experience:
[Download](https://www.yuque.com/docs/share/c453798a-12b3-4eb7-a725-4b960732eab1?#《Resource 1》)


##### Relatively pure template, please [click here (to be maintained)](https://github.com/qld-cf/electron-common-react-tpl), no umi is more free, hot loading is faster


##### TODO
1. The web+cdn version is convenient for web server deployment;

Changelog:

1. 2020-06-08 Added [full update](https://segmentfault.com/a/1190000016674982) function
2. 2020-06-29 Add [remote incremental update function](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/PART_UPDATE.md), no need to download the package to renew install updates;
3. 2020-07-27 Optimize the initialization client loading waiting page, optimize the page
4. 2020-08-18 Added [select copy, right-click and paste | custom function](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/Copy.md)
5. 2020-08-24 Optimize the white screen of some win7 systems (win7 turns off hardware acceleration)
6. 2020-08-28 Add `koa2 + typescript + websocket + redis + log4js` server websocket|redis function, client socket.io
7. 2020-09-20 Added error boundary recognition and processing (after encountering errors such as React syntax on the page, the error log is automatically captured and recorded, the page returns to the home page, the development mode is turned off by default, and the production environment is turned on)
8. 2020-10-16 Added [Restriction to allow only single application/single instance](https://www.electronjs.org/docs/api/app#%E4%BA%8B%E4%BB%B6- second-instance)
9. 2020-11-05 Fix the incremental update problem, optimize some codes, remove the old version of printing, and add the cli tool to start the command line
10. 2021-02-02 Fix eslint, tslint issues
11. 2021-03-29 Added the main process HRM function, modifying the main process can reload the client
12. 2022-01-19 Upgrade the electron version to 12, fix the problems caused by the upgrade (another busy year..)
13. 2022-02-21 Add local data persistence sqlite + sequelize, branch: [feature/add_sqlite_20220209](https://github.com/qld-cf/electron-react-tpl/tree/feature/add_sqlite_20220209)

---

[Chinese](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/CHANGE_LOG.md)
[English Version](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/CHANGE_LOG_EN.md)



`electron 12` + `umi 3.2` + `typescript` + `react 16.12` + `redux` + `antDesign 4.0` + `eslint tslint react-tslint` scaffolding, download and use, the infrastructure has been prepared for you

#### Client Integration:
- [x] Auto update (electron-builder)
- [x] Tray menu app start loading loading bar
- [x] electron-log local log electron-store local storage
- [x] app packaging icon added incremental update
- [x] Add redux-devtools plugin
- [x] right click copy paste
- [ ] App crash information collection
- [ ] App message notification, shortcut keys, etc.


#### web side:
1. Based on [umi](https://umijs.org/zh-CN) scaffolding, the basic configuration has been integrated, and developers can focus on writing business code
2. Local storage redux (redux-saga)
3. antDesign >= 4.0
4. iconfont icon

- Menu configuration `src/layouts/menu/config.tsx`


#### Fix:
- [x] Upgrade to electron9.1.0, sync official
- [x] Some win7 white screen solutions
- [ ] To be fixed sqlite packaging problem
- [ ] Node Api function encapsulation is decoupled from rendering process business


#### Next Feature
- [x] version based on create-react-app


### Tool command line startup

````
> npm i -g maple-react-cli // Install the cli tool globally
> maple-react-cli // initialization

? Please select your next action Select template type
? Choose a project template to initialize your project~
✔ electron-react-tpl
✔ Initializing..
✔ Ready to pull code...
? Please enter your local initialized project name~ Enter a custom project name, such as project
✔ Pull code successfully
✔ Installed dependencies successfully~
? Run the project? yes
Congratulations~The project started successfully~Please wait...
````

[cli tool](https://github.com/qld-cf/maple-react-cli)


### local start

````
npm i // If the installation is unsuccessful, please use yarn
npm start
npm run pack // The default is to pack according to the current system
npm run pack-mac // Pack the mac platform
npm run pack-windows // package windows platform
npm run pack-all // pack all platforms

// If you need to open websocket

cd ./server
npm run dev
````


### directory tree
````
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
    |-- eslint-rules Customize eslint configuration
    | |-- base.js
    | |-- react.js
    | |-- ts.js
    |-- src
        |-- main main process
        |-- app-update.yml Automatic update configuration for production environment
        | |-- bundle.js is automatically generated
        | |-- bundle.js.map
        | |-- dev-app-update.yml The development environment automatically updates the configuration
        | |-- index.js entry
        | |-- loading.html
        | |-- preload.js
        | |-- README.md
        | |-- config compile configuration
        | | |-- config.js
        | | |-- webpack.config.js
        | |-- controls control set
        | | |-- AppAutoUpdater.js
        | | |-- AppMainWindow.js
        | | |-- AppTray.js
        | | |-- electron-helper.js
        | |-- public attachments
        | | |-- icon.ico
        | | |-- icon.png
        | | |-- tray.png
        | |-- script compile script
        | |-- build.js
        |-- render rendering process
            |-- .env
            |-- .umirc.ts
            |-- app.ts
            |-- global.less
            |-- README.md
            |-- .umi umi automatically generates configuration and plugins, etc.
            | |-- umi.ts
            | |-- core
            | |-- plugin-dva
            |-- plugin-initial-state
            |-- plugin-model
            | |-- plugin-request
            |-- api interface collection
            | |-- api.list.ts
            |-- assets attachment
            | |-- image
            | | |-- yay.jpg
            | |-- style
            | |-- bootstrap-part.less
            | |-- common.less
            |-- common
            | |-- enum.ts
            | |-- global.ts
            |-- components component
            | |-- readme.md
            | |-- AutoUpdate
            | | |-- index.tsx
            | | |-- style.less
            | |-- FormCps
            | | |-- index.tsx
            | | |-- readme.md
            | |-- TableCps
            | |-- index.tsx
            | |-- readme.md
            |-- config configuration
            | |-- iconfont.ts
            | |-- menus.tsx
            |-- dist local packaging generated files
            |-- layouts layout
            | |-- index.less
            | |-- index.tsx
            | |-- header
            | | |-- index.less
            | | |-- index.tsx
            | |-- loading
            | | |-- index.less
            | | |-- index.tsx
            | |-- menu
            | |-- index.less
            | |-- index.tsx
            |-- mock
            | |-- foo.ts
            |-- models redux
            | |-- xxStore.ts
            |-- pages
            | |-- home.normal.less
            | |-- index.tsx
            | |-- Foo example
            | | |-- index.tsx
            | | |-- components
            | | | |-- TableList.tsx
            | | |-- models
            | | | |-- foo.ts
            | | |-- services
            | | |-- foo.ts
            | |-- Home Business
            | |-- Edge
            | | |-- index.tsx
            | |-- WebSocket
            | |-- index.tsx
            |-- utils toolset

````

### log

- Local debug log

````js
const log = require('electron-log');
// log.transports.file.file = 'xx/record.log' local specifiable file
// default log storage
// on Linux: ~/.config/{appName}/log.log
// on macOS: ~/Library/Logs/{appName}/log.log
// on Windows: user\AppData\Roaming\{appName}\log.log
log.info('Hello, log');
log.warn('Some problem appears');
````

### Precautions

1. Download dependencies and package running errors, please use cnpm or configure the electron ERROR path of npm config
2. The name of the component folder in any place cannot be capitalized. It will be recognized by umi as a route and affect hot loading, etc.
3. Stuck in node install.js : npm config edit add: electron_mirror="https://npm.taobao.org/mirrors/electron/"
4. The download of electron has been failing, please delete the package, and then install the global version 12 of electron.
5. As the business volume of the umi version increases and the number of tsx surges, the hot loading efficiency will become lower. You can try to configure routing instead of dynamic routing.
````
// .umirc.ts
const routes = [] // custom routes, from src/render/.umi/core/routes.ts
routes: closeFlexRoute ? routes : undefined,
````

### refer to

(Official electron documentation)[https://www.electronjs.org/docs]
(Official umi documentation) [https://umijs.org/]
(electron9 version upgraded to 12)[https://www.cnblogs.com/mapleChain/p/15823267.html]

###### Can be used or easy to use, please give a humble star~ Thank you, please file an issue for supplements or suggestions



[github](https://github.com/qld-cf/electron-react-tpl)


### Appendix

![update](https://cdn.nlark.com/yuque/0/2020/png/2166813/1600571961820-5b9ccc9e-f3dc-46f9-8f4f-5c8dde92fe12.png)
![update1](https://cdn.nlark.com/yuque/0/2020/jpeg/2166813/1600573119535-9fbb6b11-8ad8-4d65-a66d-17cc32ad7732.jpeg)