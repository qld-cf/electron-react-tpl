## 增量更新说明文档

[English Version](https://github.com/qld-cf/electron-react-tpl/blob/master/docs/PART_UPDATE_EN.md)



#### 提前准备


1. 准备本地或者远程服务器或者远程静态文件url
```
npm i -g http-server
cd yourFileFolder // 进入任意文件夹
http-server -p 4000 // 快速开启本地服务，用于存储更新文件
```
2. 配置和打包，拿到更新文件内容并压缩
```
// package.json
// 关闭asar模式
  "asar": false,
// 打包
  npm run pack-windows
// 进入打好的windows包
  cd release\0.x.x_setup\win-unpacked\resources
// 压缩app文件夹 => app.zip, 拷贝app-update.yml和app.zip

```

3. app.zip app-update.yml 传到服务器

3. 本地流程，启动客户端，点击增量更新

```
// 入口
// src\render\components\AutoUpdate\index.tsx
 <Button type='primary' onClick={() => checkForPartUpdates()} style={{ marginLeft: 10 }}>
            增量更新
        </Button>

```

```
// 本地检查与服务器的version版本比较
// 如果找到新版本，则向主进程通信，通知checkForPartUpdates开始更新

// src\render\utils\autoUpdate\partUpdate.js
/** 检查更新 */
export async function checkForPartUpdates() {
  try {
    // check version 检查版本
    const res = await checkVersion()
    if (res && res === 'OPEN_PART_UPDATE') {
      // 增量更新
      console.log('OPEN_PART_UPDATE')
      confirm({
        title: '检测到更新',
        icon: <ExclamationCircleOutlined />,
        content: (
          <div>
            <p>是否更新?</p>
          </div>
        ),
        okText: '确认',
        cancelText: '取消',
        onOk() {
          ipc && ipc.send('checkForPartUpdates')
          message.info('请耐心等待几秒..')
        },
        onCancel() {
          console.log('Cancel');
        },
      });
      // partUpdates()
    }
    if (res && res === 'OPEN_ALL_UPDATE') {
      console.log('OPEN_ALL_UPDATE')
      // 全量更新
    }
  } catch (error) {
    console.error('checkVersionERROR', error)
  }
}

function checkVersion(params) {
  return new Promise((resolve, reject) => {
    const currentVersion = remote.app.getVersion()
    // 获取最新版本号
    downloadFile(remoteYmlURL, localYmlUrl).then(res => {
      const remoteVersion = JSON.stringify(res.data).split('\\n')[0].split(' ')[1]
      const remoteVersionArr = remoteVersion.split('.')
      const currentVersionArr = currentVersion.split('.')
      // 0.1.1 Y和Z比较来开启增量更新  1.1.1 X比较来开启全量更新
      if (Number(remoteVersionArr[0]) > Number(currentVersionArr[0])) {
        // 开启全量更新
        return resolve('OPEN_ALL_UPDATE')
      } else if (Number(remoteVersionArr[2]) > Number(currentVersionArr[2]) || Number(remoteVersionArr[1]) > Number(currentVersionArr[1])) {
        // 开启增量更新
        return resolve('OPEN_PART_UPDATE')
      } else {
        console.log('无版本变动，不更新')
      }
    }).catch(e => {
      console.error(e)
    })
  })
}

```


```
// src\main\controls\AppAutoUpdater.js
// 下载服务器文件包
// 本地解压和备份，替换，重启客户端即可完成更新

  // 增量更新
  ipcMain.on('checkForPartUpdates', async (e, msg) => {
    console.log('checkForPartUpdates', msg)
    // if (isElectronDev) {
    //   console.log('开发模式不支持')
    //   return
    // }
    try {
      if (fs.existsSync(`${localresourcePath}.back`)) { // 删除旧备份
        deleteDirSync(`${localresourcePath}.back`)
      }
      if (fs.existsSync(localresourcePath)) {
        fs.renameSync(localresourcePath, `${localresourcePath}.back`); // 备份目录
      }
      await downloadFile(remoteAppURL, appZipPath)
      console.log('app.asar.unpacked.zip 下载完成')
      fs.mkdirSync(localresourcePath) // 创建app来解压用
      try {
        // 同步解压缩
        const unzip = new AdmZip(appZipPath)
        unzip.extractAllTo(resourcePath, true)
        console.log('app.asar.unpacked.zip 解压缩完成')
        console.log('更新完成，正在重启...')
        mainWindow.webContents.send('partUpdateReady')
        setTimeout(() => {
          app.relaunch(); // 重启
          app.exit(0);
        }, 1800);
      } catch (error) {
        console.error(`extractAllToERROR: ${error}`);
      }
      // 更新窗口
      // BrowserWindow.getAllWindows().forEach((win: any) => {
      //   win.webContents.reload()
      //   // remote.app.relaunch(); // 重启
      //   // remote.app.exit(0);
      // })
      console.log('webContents reload完成')
    } catch (error) {
      console.error(`checkForPartUpdatesERROR`, error)
      if (fs.existsSync(`${localresourcePath}.back`)) {
        fs.renameSync(`${localresourcePath}.back`, localresourcePath);
      }
    }
  })

```

