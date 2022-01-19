/**
 * electron窗口初始化
 */
'use strict'

const { BrowserView, BrowserWindow } = require('electron')
const isDevEnv = require('electron-is-dev')
const path = require('path')
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} = require('electron-devtools-installer')
const AppAutoUpdater = require('../controls/AppAutoUpdater')
const { DEV_ADDRESS } = require('../config/config')
const log = require('electron-log')

module.exports = class AppMainWindow extends BrowserWindow {
  constructor() {
    const config = {
      width: 1010,
      height: 716,
      minWidth: 800,
      minHeight: 600,
      autoHideMenuBar: false,
      fullscreen: false,
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false, // required flag
        enableRemoteModule: true
      }
    }

    super(config)
    this.mainWindow = this
    this.browserView = null
    this.initMainWindow()
    this.initEvents()
  }

  initMainWindow() {
    // 必须在主进程塞入文件前配置 loading
    this.windowLoading()
    this.loadURL(
      isDevEnv ? DEV_ADDRESS : `file://${path.join(__dirname, '../render/dist/index.html')}`
    )
    if (isDevEnv) {
      // 打开开发者工具
      this.mainWindow.openDevTools()
    }
    // 异步安装插件
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension REDUX_DEVTOOLS:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
    installExtension(REDUX_DEVTOOLS)
      .then(name => console.log(`Added Extension REDUX_DEVTOOLS:  ${name}`))
      .catch(err => console.log('An error occurred: ', err))
  }

  // 主进程加载时的loading过渡，避免白屏
  windowLoading() {
    console.log(`file://${path.join(__dirname, 'loading.html')}`)
    this.browserView = new BrowserView()
    this.mainWindow.setBrowserView(this.browserView)
    this.browserView.setBounds({ x: 0, y: 0, width: 1010, height: 716 })
    this.browserView.webContents.loadURL(`file://${path.join(__dirname, 'loading.html')}`)
    this.browserView.webContents.on('dom-ready', () => {
      this.mainWindow.show()
    })
  }

  initEvents() {
    // 窗口关闭的监听
    this.mainWindow.on('closed', () => {
      console.log('closed')
      this.mainWindow = null
    })

    this.mainWindow.on('close', e => {
      console.log('close windows')
      // 兼容不同平台关闭
      if (process.platform === 'win32' && this.mainWindow['hide']) {
        this.mainWindow.hide()
        e.preventDefault()
      }
    })
    this.mainWindow.once('ready-to-show', () => {
      // 加入loading.html后, 此处updateHandle无效
      // 检查自动更新
      // log.info('enter ready-to-show')
    })

    this.mainWindow.once('show', () => {
      log.info('enter show')
      // 检查自动更新
      AppAutoUpdater.updateHandle(this.mainWindow)
    })

    // 隐藏默认菜单
    this.mainWindow.webContents.once('did-finish-load', () => {
      this.mainWindow.setMenuBarVisibility(false)
    })
  }

  destoryMainWindow() {
    this.mainWindow = null
  }

  removeView() {
    this.mainWindow.removeBrowserView(this.browserView)
  }
}
