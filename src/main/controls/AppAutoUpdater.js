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
const AdmZip = require('adm-zip')
const fs = require('fs')
const electronMainUtils = require('../util/utils')


let localresourcePath = '' // 本地resource/app路径
let resourcePath = '' // 本地resource 路径
let appZipPath = '' // app压缩包位置
let yourFileServer = '' // 文件服务器
const remoteAppURL = `https://${yourFileServer}/app.zip` // yourFileServer: 你的远程文件服务器
// windows 本地测试 admin:改为你的用户名
if (isElectronDev && process.platform === 'win32') {
  // win 本地安装包路径
  // YOURAPP: app名称，一般取自package.json
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
  localresourcePath = `/Applications/YOURAPP.app/Contents/Resources/app`
  resourcePath = `/Applications/YOURAPP.app/Contents/Resources`
  appZipPath = `/Applications/YOURAPP.app/Contents/Resources/app.zip`
}

/**
 * autoUpdater - 更新操作
 * @param {object} mainWindow 实例
 */
function updateHandle(mainWindow) {
  log.info('enter updateHandle')
  log.info(`mainWindow： ${mainWindow}`)
  autoUpdater.on('error', function (error) {
    electronMainUtils.sendUpdateMessage(`ERROR: 检查更新出错:${error}`, mainWindow)
  });
  autoUpdater.on('checking-for-update', function () {
    log.info(`enter checking-for-update`)
    log.info(`正在检查更新…`)
  });
  autoUpdater.on('update-available', function (UpdateInfo) {
    log.info('UpdateInfo', UpdateInfo)
    electronMainUtils.sendUpdateMessage('检测到新版本，正在下载…', mainWindow)
  });
  autoUpdater.on('update-not-available', function (info) {
    log.info(`现在使用的已经是最新版本`)
    electronMainUtils.sendUpdateMessage('现在使用的已经是最新版本', mainWindow)
  });

  /**
   * 更新下载进度事件
   */
  autoUpdater.on('download-progress', function (progressObj) {
    mainWindow.webContents.send('downloadProgress', progressObj)
  });

  /**
   * 下载更新包完成
   */
  autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
    // 渲染层回复立即更新，则自动退出当前程序，然后进行程序更新
    ipcMain.on('updateNow', (e, arg) => {
      log.info('开始更新');
      autoUpdater.quitAndInstall();
    });
    // 询问渲染层是否立即更新
    mainWindow.webContents.send('isUpdateNow')
  });

  /**
   * 增量更新
   */
  ipcMain.on('checkForPartUpdates', async (e, msg) => {
    try {
      if (fs.existsSync(`${localresourcePath}.back`)) { // 删除旧备份
        electronMainUtils.deleteDirSync(`${localresourcePath}.back`)
      }
      if (fs.existsSync(localresourcePath)) {
        fs.renameSync(localresourcePath, `${localresourcePath}.back`); // 备份目录
      }
      await electronMainUtils.downloadFile(remoteAppURL, appZipPath)
      if (!fs.existsSync(`${localresourcePath}`)) { // 删除旧备份
        fs.mkdirSync(localresourcePath) // 创建app来解压用
      }
      try {
        // 同步解压缩
        const unzip = new AdmZip(appZipPath)
        unzip.extractAllTo(resourcePath, true)
        console.log('app.asar.unpacked.zip 解压缩完成')
        console.log('更新完成，正在重启...')
        mainWindow.webContents.send('partUpdateReady') // 此处可以: 通知渲染进程，进行指定操作
        setTimeout(() => {
          app.relaunch(); // 重启
          app.exit(0);
        }, 1800);
      } catch (error) {
        console.error(`extractAllToERROR: ${error}`);
      }
      console.log('webContents reload完成')
    } catch (error) {
      console.error(`checkForPartUpdatesERROR`, error)
    } finally {
      if (fs.existsSync(`${localresourcePath}.back`)) {
        fs.renameSync(`${localresourcePath}.back`, localresourcePath);
      }
    }
  })

}

if (process.platform === 'win32') {
  autoUpdater.updateConfigPath = path.join(__dirname, 'app-win-update.yml') // 远程包配置-win
} else {
  autoUpdater.updateConfigPath = path.join(__dirname, 'app-mac-update.yml') // 远程包配置-mac
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

// 通知更新检查(远程版本号大于本地即可拉去更新)
ipcMain.on('checkForUpdates', (e, msg) => {
  console.log('checkForUpdatesMsg', msg)
  checkForUpdates()
})

module.exports = {
  updateHandle,
}