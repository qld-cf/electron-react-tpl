/**
 * electron 主进程入口
 */
'use strict'

const { app, ipcMain } = require('electron')
const AppMainWindow = require('./controls/AppMainWindow')
const AppPrintWindow = require('./print/print')
const AppTray = require('./controls/AppTray')
const Store = require('electron-store')
const store = new Store()

// for test
store.set('LOCAL_ELECTRON_STORE', 'STORE-MSG: WELCOME TO MY TPL')

// const devTron = require('devtron')
// const Store = require('electron-store')

app.allowRendererProcessReuse = true

class MainApp {
  constructor() {
    this.mainWindow = null
    this.printWindow = null
    this.tray = null
  }
  init() {
    this.initAppLife()
    this.initIPC()
  }
  // app 的生命周期
  initAppLife() {
    app.whenReady().then(() => {
      this.createMainWindow()
    })

    app.on('window-all-closed', () => {
      console.log('window-all-closed')
      // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
      // 否则绝大部分应用及其菜单栏会保持激活。
      console.log('process.platform', process.platform)
      if (process.platform !== 'darwin') {
        console.log('quit')
        app.quit()
      }
    })

    app.on('before-quit', () => {
      console.log('before-quit')
      this.mainWindow.destoryMainWindow()
      this.printWindow.destoryPrintWindow()
    })
  }
  // 所有的IPC通讯都放这边
  initIPC() {
    ipcMain.on('stop-loading-main', () => {
      this.mainWindow.removeView()
    })
  }
  // 创建主进程的窗口
  createMainWindow() {
    this.mainWindow = new AppMainWindow()

    this.createPrintWindow()
    this.createTray()
  }
  // 创建打印的窗口
  createPrintWindow() {
    this.printWindow = new AppPrintWindow(this.mainWindow)
  }
  // 创建小图标
  createTray() {
    this.tray = new AppTray(this.mainWindow)
  }
}

new MainApp().init()
