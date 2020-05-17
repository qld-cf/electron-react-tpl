/**
 * 打印参考
 */
'use strict'

const { BrowserWindow } = require('electron')
const path = require('path')
const electronHelper = require('../controls/electron-helper')
module.exports = class PrintWindow extends BrowserWindow {
  constructor(mainWindow) {
    const config = {
      title: '打印',
      show: false,
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }

    super(config)
    this.print = this
    this.mainWindow = mainWindow

    this.initPrintWindow()
  }

  initPrintWindow() {
    const url = `file://${path.join(__dirname, '../electron/print/print.html')}`
    this.print.loadURL(url)
    // electronHelper.initPrintEvent(this.print, this.mainWindow, url)
  }

  destoryPrintWindow() {
    this.print = null
  }
}
