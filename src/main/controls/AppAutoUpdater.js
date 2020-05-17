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
    sendUpdateMessage('检测到新版本，正在下载…',mainWindow)
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



module.exports  = {
  updateHandle,
}