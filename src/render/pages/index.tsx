import React from 'react'
import cls from 'classnames'
import './home.normal.less'
import AutoUpdate from '@components/AutoUpdate'
import { Button, message, Input } from 'antd'
const Store = require('electron-store')
const store = new Store()

export default function () {
  const getLocalStoreData = () => {
    message.info(store.get('LOCAL_ELECTRON_STORE'))
  }
  return (
    <div className='homewrap'>
      <div className='bigFt'>Welcome to MapleChain Electron App</div>
      <AutoUpdate />
      <div className='bigFt'>electron-store</div>
      <div className='bigFt'>
        <Button onClick={() => {
          store.set('LOCAL_ELECTRON_STORE', `STORE-MSG: i'm the best`)
          setTimeout(() => {
            message.success('Set successfully!')
          }, 300);
        }} style={{ marginRight: '10px' }}>
          Set store msg | 设置本地storeMsg为: i'm the best
        </Button>
        <Button onClick={getLocalStoreData}>
          Get init store data | 获取本地storeMsg
        </Button>
      </div>
      <div className='bigFt'>RightClickMenuFuc</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ margin: '10px 0' }}>Here is the copy msg | 选中任意文字后右键复制</span>
        <Input placeholder='右键黏贴~' />
      </div>
    </div>
  )
}
