/**
 * 为window挂载方法
 */
const { ipcRenderer } = require('electron')

/** 挂载停止启动loading方法 */
window.stopLoading = function () {
  ipcRenderer.send('stop-loading-main')
}
