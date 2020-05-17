const dict = process.env.TARGET === 'web'
  ? {
    electron: require('./electron'),
    'electron-store': require('./electron-store'),
  }
  : {
    electron: require('electron'),
    'electron-store': require('electron-store'),
  }

module.exports = function (name) {
  return dict[name]
}