
/**
 * app更新验证
 */
const app = require('@utils/polyfill')('electron')
const isElectronDev = require('electron-is-dev')
const axios = require('axios').default;
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const { ipcRenderer: ipc, remote } = app

let localYmlUrl = ``
const remoteYmlURL = 'http://yourFileServer/app-update.yml' // 这里配置你的远程文件服务器

if (!isElectronDev && process.platform === 'win32') { // win平台
  localYmlUrl = `./resources/app-update.yml`
}
if (!isElectronDev && process.platform === 'darwin') { // mac平台
  localYmlUrl = `/Applications/${remote.app.getName()}.app/Contents/Resources/resources/app-update.yml`
}

// 下载远程压缩包并写入指定文件
function downloadFile(uri) {
  return new Promise((resolve, reject) => {
    axios.get(uri).then(res => {
      return resolve(res)
    }).catch(e => {
      console.error(e)
      message.info('获取远程版本失败')
      // eslint-disable-next-line prefer-promise-reject-errors
      return reject('获取远程版本失败')
    });
  });
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