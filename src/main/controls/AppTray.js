/**
 * APP托盘
 */
'use strict'

const { app, Menu, Tray } = require('electron')
const path = require('path')
const trayIcon = `${path.join(__dirname, '/public/tray.png')}`

module.exports = class AppTray {
  constructor(mainWindow) {
    this.mainWindow = mainWindow || null
    this.initTray()
  }

  initTray() {
    this.tray = new Tray(trayIcon)
    this.tray.setToolTip('我的托盘图标')

    const trayMenuTemplate = [
      {
        label: '显示主页面',
        click: () => {
          this.mainWindow.show()
        }
      },
      {
        label: '退出',
        click: () => {
          app.quit()
        }
      }
    ]
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)
    // 设置此图标的上下文菜单
    this.tray.setContextMenu(contextMenu)
    // 单击右下角小图标显示应用
    this.tray.on('click', () => {
      // mainWindow.show();
      this.mainWindow.isVisible() ? this.mainWindow.hide() : this.mainWindow.show()
      this.mainWindow.isVisible()
        ? this.mainWindow.setSkipTaskbar(false)
        : this.mainWindow.setSkipTaskbar(true)
    })
  }
}
