# electron-react-umi-tpl

[github](https://github.com/qld-cf/electron-react-tpl)
[English Version](https://github.com/qld-cf/electron-react-tpl/blob/master/README_EN.md)


##### If you are not used to using the umi version, but prefer to use the template based on the open version of create-react-app, please [poke here](https://github.com/qld-cf/electron-common- react-tpl), more freedom without umi, faster hot loading


Update log:

1. 2020-06-08 add [full update](https://segmentfault.com/a/1190000016674982) function
2. 2020-06-29 Add [Remote incremental update function](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/PART_UPDATE.md), no need to download the package to restart Install updates;
3. 2020-07-27 Optimize the initial client loading waiting page, optimize the page
4. 2020-08-18 Add [select copy right-click and paste function](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/Copy.md)
5. 2020-08-24 Optimize the white screen of some win7 systems (win7 turns off hardware acceleration)
6. 2020-08-28 Add `koa2 + typescript + websocket + redis + log4js` server-side websocket|redis function, client-side socket.io
7. 2020-09-20 Added error boundary recognition and processing (after reporting errors such as React syntax on the page, the error log is automatically captured and recorded, the page returns to the home page, the development mode is closed by default, and the production environment is turned on)
8. 2020-10-16 Newly added [Limit only allows application billing/single instance](https://www.electronjs.org/docs/api/app#%E4%BA%8B%E4%BB%B6- second-instance)
9. 2020-11-05 Fix incremental update problem, optimize some code, remove old version printing, add cli tool command line start
10. 2021-02-02 fix eslint, tslint issues

---

[Chinese](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/CHANGE_LOG.md)
[English Version](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/CHANGE_LOG_EN.md)



`electron 9.1` + `umi 3.2` + `typescript` + `react 16.12` + `redux` + `antDesign 4.0` + `eslint tslint react-tslint` scaffolding, download and use, the base facilities have been prepared for you

#### Client Integration:
-[x] Automatic update (electron-builder)
-[x] Tray menu app starts loading loading bar
-[x] electron-log local log electron-store local storage
-[x] App package icon added incremental update
-[x] Add redux-devtools plugin
-[x] Right click to copy and paste
-[] App crash information collection
-[] App notifications, shortcut keys, etc.



#### web:
1. Based on [umi](https://umijs.org/zh-CN) scaffolding, the basic configuration has been integrated, and the developer can only pay attention to business code writing
2. Local storage redux (redux-saga)
3. antDesign >= 4.0
4. iconfont icon

-Menu configuration `src/layouts/menu/config.tsx`


#### Fix:
-[x] Upgrade to electron9.1.0, sync official
-[x] Some win7 white screen solutions
-[] Node Api function encapsulation and rendering process business decoupling


#### Next Feature
-[x] Version based on create-react-app


### Tool command line startup

```
> npm i -g maple-react-cli // install cli tool globally
> maple-react-cli // Initialization

? Please choose your next operation Choose template type
? Choose a project template to initialize your project~
✔ electron-react-tpl
✔ Initializing...
✔ Ready to pull code...
? Please enter your local initialized project name~ Enter a custom project name, such as project
✔ Pull the code successfully
✔ Successful installation of dependencies~
? Is the project running? yes
Congratulations~The project started successfully~Please wait...
```

[cli tool](https://github.com/qld-cf/maple-react-cli)



### Open locally

```
npm i // Please use yarn if the installation is unsuccessful
npm start
npm run pack // Pack according to the current system by default
npm run pack-mac // pack mac platform
npm run pack-windows // pack windows platform
npm run pack-all // pack all platforms

// If you need to open websocket

cd ./server
npm run dev
```



### Directory tree
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
    |-- eslint-rules custom eslint configuration
    | |-- base.js
    | |-- react.js
    | |-- ts.js
    |-- src
        |-- main main process
        | |-- app-update.yml production environment automatic update configuration
        | |--- bundle.js is automatically generated
        | |-- bundle.js.map
        | |-- dev-app-update.yml Development environment automatic update configuration
        | |-- index.js entrance
        | |-- loading.html
        | |-- preload.js
        | |-- README.md
        | |-- config compilation configuration
        | | |-- config.js
        | | |-- webpack.config.js
        | |-- controls control set
        | | |-- AppAutoUpdater.js
        | | |-- AppMainWindow.js
        | | |-- AppTray.js
        | | |-- electron-helper.js
        | |--- public attachment
        | | |-- icon.ico
        | | |-- icon.png
        | | |-- tray.png
        | |-- script Compile script
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
            | |-- plugin-initial-state
            | |-- plugin-model
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
            |-- components
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
            |--- dist local package generated file
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
            |--- utils toolset

```

### log

-Local debug log

```js
const log = require('electron-log');
// log.transports.file.file ='xx/record.log' locally specified file
// Default log storage
// on Linux: ~/.config/{appName}/log.log
// on macOS: ~/Library/Logs/{appName}/log.log
// on Windows: user\AppData\Roaming\{appName}\log.log
log.info('Hello, log');
log.warn('Some problem appears');
```

### Precautions

1. Download dependencies and package operation errors, please use cnpm or configure the electron ERROR path of npm config
2. The component folder name in any place cannot be capitalized, it will be recognized as a route by umi, which will affect hot loading, etc.
3. Stuck in node install.js: npm config edit add: electron_mirror="https://npm.taobao.org/mirrors/electron/"
4. Download electron 9.1 has been failed, please delete the package, and then install the global version of electron 9.1
5. You can also try the latest version of electron, and use 9.1.0 for stability.
6. With the increase in business volume, the hot loading efficiency of the umi version will become lower after the number of tsx increases. You can try to configure routing instead of dynamic routing
```
// .umirc.ts
const routes = [] // Custom routes, from src/render/.umi/core/routes.ts
routes: closeFlexRoute? routes: undefined,
```

### Reference

(Official electron document)[https://www.electronjs.org/docs]
(Official umi document)[https://umijs.org/]

###### Can be used or easy to use, please give a humble star~ Thank you for supplements or suggestions, please submit an issue



[github](https://github.com/qld-cf/electron-react-tpl)


### Appendix

![update](https://cdn.nlark.com/yuque/0/2020/png/2166813/1600571961820-5b9ccc9e-f3dc-46f9-8f4f-5c8dde92fe12.png)
![update1](https://cdn.nlark.com/yuque/0/2020/jpeg/2166813/1600573119535-9fbb6b11-8ad8-4d65-a66d-17cc32ad7732.jpeg)