/**
 * 自动更新
 * https://www.electron.build/auto-update
 */


const { autoUpdater } = require('electron-updater')
const { ipcMain, app } = require('electron')
const log = require('electron-log');
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"
const isElectronDev = require('electron-is-dev')
const path = require('path')
const axios = require('axios').default;
const AdmZip = require('adm-zip')
const fs = require('fs')

/**
 * 通过main进程发送事件给renderer进程，提示更新信息
 * @param {string} text
 * @param {object} mainWindow
 */
function sendUpdateMessage(text, mainWindow) {
  log.info('enter sendUpdateMessage', text);
  mainWindow.webContents.send('message', text)
}

/**
 * 更新操作
 * @param {object} mainWindow
 */
function updateHandle(mainWindow) {
  log.info('enter updateHandle')
  log.info(`mainWindow： ${mainWindow}`)
  autoUpdater.on('error', function (error) {
    sendUpdateMessage(`ERROR: 检查更新出错:${error}`, mainWindow)
  });
  autoUpdater.on('checking-for-update', function () {
    log.info(`enter checking-for-update`)
    log.info(`正在检查更新…`)
    // sendUpdateMessage('正在检查更新…', mainWindow)
  });
  autoUpdater.on('update-available', function (UpdateInfo) {
    log.info('UpdateInfo', UpdateInfo)
    sendUpdateMessage('检测到新版本，正在下载…', mainWindow)
  });
  autoUpdater.on('update-not-available', function (info) {
    log.info(`现在使用的已经是最新版本`)
    sendUpdateMessage('现在使用的已经是最新版本', mainWindow)
  });

  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    mainWindow.webContents.send('downloadProgress', progressObj)
  });

  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    // 渲染层回复立即更新，则自动退出当前程序，然后进行程序更新
    ipcMain.on('updateNow', (e, arg) => {
      log.info('开始更新');
      autoUpdater.quitAndInstall();
    });

    // 询问渲染层是否立即更新
    mainWindow.webContents.send('isUpdateNow')
  });

  // 通知更新检查 app0.1.1: 仅支持版本更新(远程版本号大于本地即可拉去更新)
  ipcMain.on('checkForUpdates', (e, msg) => { // 获取灰度控制信息
    console.log('checkForUpdates', msg)
    if (msg) { // 有规则 则按照规则匹配更新
      handleGreyUpdate(msg)
    } else { // 无规则 则默认自动更新
      checkForUpdates()
    }
  })




  let localresourcePath = ``
  let resourcePath = ``
  let appZipPath = ``
  const remoteAppURL = 'https://yourFileServer/app.zip' // 你的远程文件服务器


  if (isElectronDev && process.platform === 'win32') { // windows 本地测试 admin:改为你的用户名
    // win 本地安装包路径
    localresourcePath = `C:/Users/admin/AppData/Local/Programs/YOURAPP/resources/app`
    resourcePath = `C:/Users/admin/AppData/Local/Programs/YOURAPP/resources`
    appZipPath = `C:/Users/admin/AppData/Local/Programs/YOURAPP/resources/app.zip`
  }
  if (!isElectronDev && process.platform === 'win32') { // win平台
    localresourcePath = `./resources/app`
    resourcePath = `./resources`
    appZipPath = `./resources/app.zip`
  }
  if (!isElectronDev && process.platform === 'darwin') { // mac平台
    // YOURAPP改为你的 APP名称(packageJson里的build的productname属性)
    // if (isElectronDev && process.platform === 'darwin') { // mac平台 local test
    localresourcePath = `/Applications/YOURAPP.app/Contents/Resources/app`
    resourcePath = `/Applications/YOURAPP.app/Contents/Resources`
    appZipPath = `/Applications/YOURAPP.app/Contents/Resources/app.zip`
  }

  // console.log('localresourcePath', localresourcePath)
  // console.log('resourcePath', resourcePath)
  // console.log('appZipPath', appZipPath)

  // 下载远程压缩包并写入指定文件
  function downloadFile(uri, filename) {
    const writer = fs.createWriteStream(filename)
    axios.get(uri, { responseType: 'stream' }).then(res => {
      res.data.pipe(writer);
    });
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }

  // 删除文件夹
  function deleteDirSync(dir) {
    let files = fs.readdirSync(dir)
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0;i < files.length;i++) {
      let newPath = path.join(dir, files[i]);
      let stat = fs.statSync(newPath)
      if (stat.isDirectory()) {
        // 如果是文件夹就递归下去
        deleteDirSync(newPath);
      } else {
        // 删除文件
        fs.unlinkSync(newPath);
      }
    }
    fs.rmdirSync(dir)// 如果文件夹是空的，删除自身
  }

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


  //

  // 服务器地址：yml配置
  if (isElectronDev) {
    autoUpdater.updateConfigPath = path.join(__dirname, 'dev-app-update.yml')
  } else {
    autoUpdater.updateConfigPath = path.join(__dirname, 'app-update.yml')
  }
}

/**
 * 检查更新
 */
function checkForUpdates() {
  console.log('enter checkForUpdates')
  if (isElectronDev) {
    autoUpdater.checkForUpdates()
  }
  if (!isElectronDev) {
    autoUpdater.checkForUpdatesAndNotify()
  }
  return;
}


/**
 * 自动更新 - 灰度版本控制 -  shopId请求需要数据：是否强更+强更版本号
 * {
 *  isNewestUpdate: true
 * }
 * @param {object} msg
 * @return {boolean}
 */
function handleGreyUpdate(msg) {
  const appVersion = app.getVersion()
  const updateUrl = msg.updateUrl; // 对应包的服务器地址
  // 强更指定版本：
  autoUpdater.setFeedURL(updateUrl);
  checkForUpdates()
}



module.exports = {
  updateHandle,
}