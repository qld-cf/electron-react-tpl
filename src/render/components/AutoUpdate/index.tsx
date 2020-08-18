/**
 * 组件控制app更新
 */

import React, { useEffect } from 'react'
import { Modal, message, Button } from 'antd'
import app, { ipcRenderer as ipc, remote } from 'electron'
import styles from './style.less'
import { checkForPartUpdates } from '@/utils/autoUpdate/partUpdate'
const { confirm } = Modal
interface IProps {
  loading?: boolean
}

const appPkgVersion = remote.app.getVersion()

const Update = (props: IProps) => {
  console.log('mainApp', app)
  console.log('ipc', ipc)
  // 模拟 自动更新
  useEffect(() => {
    // 检测app自动更新
    // if (window.isOpenAutoUpdate) {
    const container = document.getElementById('container') // TODO: 自动更新进度条
    // console.log('ipc', ipc)
    if (ipc) {

      ipc.on('message', (event, text) => {
        console.log('text', text)
        if (text.indexOf('ERROR') !== -1) {
          if (text.indexOf('ERR_CONNECTION_REFUSED') !== -1) {
            message.info('获取服务器地址异常')
          } else {
            message.info(text)
          }
          return
        }

        message.info(text)
        const msg = document.createElement('div')
        msg.innerText = text
        console.log('message', msg)
        if (msg && container) {
          container.appendChild(msg)
        }
      })

      // 因为如果安装文件过小的话，很快就下载完成，导致没能达到触发条件。
      ipc.on('downloadProgress', (event, { percent }) => {
        console.log(percent)
      })

      // 接收到主进程有新的版本已经下载完成，询问是否更新。
      ipc.on('isUpdateNow', () => {
        confirm({
          title: '确定要现在升级吗？',
          content: '更新内容：...',
          onOk() {
            ipc.send('updateNow')
          },
          onCancel() {
            console.log('update canceled')
          }
        })
      })
    }
    // }
  }, [window.isOpenAutoUpdate])

  const updateNewestVersion = () => {
    ipc && ipc.send('checkForUpdates')
  }

  const updateSpecifiedVersion = (v: string) => {
    const updateInfo = { // TODO: 接口返回
      isUpdate: true,
      // updateUrl: 'http://127.0.0.1:4002/download/'
      updateUrl: 'your server exe/dmg url' + v
    }
    ipc && updateInfo.isUpdate && ipc.send('checkForUpdates', updateInfo) // 如果强更才发起通知
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>Version: {appPkgVersion}</div>
      {window.isOpenAutoUpdate && <div id="container"></div>}
      {!window.isOpenAutoUpdate &&
        <div>
          <Button type='primary' onClick={() => { ipc && ipc.send('checkForUpdates') }}>
            全量更新
        </Button>
          <Button type='primary' onClick={() => checkForPartUpdates()} style={{ marginLeft: 10 }}>
            增量更新
        </Button>
        </div>}
    </div>
  )
}

export default Update