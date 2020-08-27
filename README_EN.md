# electron-react-umi-tpl

`electron 8.2` +` umi 3.1` + `typescript react 16.12` +` redux` + `antDesign 4.0` +` eslint tslint react-tslint` scaffold, download and use, the base facilities have been prepared for you

#### Client integration:
1. Automatic update (electron-builder)
2. Tray menu
3. App start loading bar
4. electron printing (supported above electron 5.0)
5. Grayscale release solution
6. electron-log local log
7. electron-store local storage
8. App packaging icon

TODOLIST: 1. App crash information collection
           2. App message notification, shortcut keys, etc.

#### web side:
1. Based on [umi] (https://umijs.org/zh-CN) scaffolding, basic configuration has been integrated, developers can pay attention to business code writing
2. Local storage of redux (redux-saga)
3. antDesign> = 4.0
4. iconfont icon

-Menu configuration `src / layouts / menu / config.tsx`


TODOLIST: 1. Node Api function encapsulation and decoupling business


### Open

```
npm i
npm start
npm run pack
```


### Directory tree
```
|-project
    |-.editorconfig
    |-.eslintrc.js
    |-.gitignore
    |-.gitlab-ci.yml
    |-.prettierignore
    |-.prettierrc.js
    |-directoryList.md
    |-package-lock.json
    |-package.json
    |-README.md
    |-tsconfig.json
    |-typings.d.ts
    |-eslint-rules Custom eslint configuration
    | |-base.js
    | |-react.js
    | |-ts.js
    |-src
        |-main main process
        | |-app-update.yml Automatic update configuration in production environment
        | |-bundle.js automatically generated
        | |-bundle.js.map
        | |-dev-app-update.yml development environment automatically updates the configuration
        | |-index.js entry
        | |-loading.html
        | |-preload.js
        | |-README.md
        | |-config Compile configuration
        | | |-config.js
        | | |-webpack.config.js
        | |-controls
        | | |-AppAutoUpdater.js
        | | |-AppMainWindow.js
        | | |-AppTray.js
        | | |-electron-helper.js
        | |-print
        | | |-print.html
        | | |-print.js
        | |-public attachment
        | | |-icon.ico
        | | |-icon.png
        | | |-tray.png
        | |-script compile script
        | |-build.js
        |-render Rendering process
            |-.env
            |-.umirc.ts
            |-app.ts
            |-global.less
            |-README.md
            |-.umi umi automatically generates configuration and plug-ins
            | |-umi.ts
            | |-core
            | |-plugin-dva
            | |-plugin-initial-state
            | |-plugin-model
            | |-plugin-request
            |-api interface collection
            | |-api.list.ts
            |-assets attachment
            | |-image
            | | |-yay.jpg
            | |-style
            | |-bootstrap-part.less
            | |-common.less
            |-common
            | |-enum.ts
            | |-global.ts
            |-components
            | |-readme.md
            | |-AutoUpdate
            | | |-index.tsx
            | | |-style.less
            | |-FormCps
            | | |-index.tsx
            | | |-readme.md
            | |-TableCps
            | |-index.tsx
            | |-readme.md
            |-config configuration
            | |-iconfont.ts
            | |-menus.tsx
            |-dist local package generation file
            |-layouts
            | |-index.less
            | |-index.tsx
            | |-header
            | | |-index.less
            | | |-index.tsx
            | |-loading
            | | |-index.less
            | | |-index.tsx
            | |-menu
            | |-index.less
            | |-index.tsx
            |-mock
            | |-foo.ts
            |-models redux
            | |-xxStore.ts
            |-pages
            | |-home.normal.less
            | |-index.tsx
            | |-Foo example
            | | |-index.tsx
            | | |-components
            | | | |-TableList.tsx
            | | |-models
            | | | |-foo.ts
            | | |-services
            | | |-foo.ts
            | |-Home Business
            | |-Edge
            | | |-index.tsx
            | |-WebSocket
            | |-index.tsx
            |-utils toolset

```

### eslint
[Alloy] (https://github.com/AlloyTeam/eslint-config-alloy) configuration is enabled by default
`eslint-config-alloy`



### log

-Local debug logs

```js
const log = require ('electron-log');
// log.transports.file.file = 'xx / record.log' local specified file
// Default log storage
// on Linux: ~ / .config / {appName} /log.log
// on macOS: ~ / Library / Logs / {appName} /log.log
// on Windows: user \ AppData \ Roaming \ {appName} \ log.log
log.info ('Hello, log');
log.warn ('Some problem appears');
```

### Precautions

1. Download dependencies and package run errors, please use cnpm or configure electron error path of npm config
2. The component folder name cannot be capitalized anywhere. It will be recognized as a route by umi and affect hot loading
3. Stuck in node install.js: npm config edit add: electron_mirror = "https://npm.taobao.org/mirrors/electron/"
