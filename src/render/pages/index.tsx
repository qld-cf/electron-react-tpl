import React from 'react'
import cls from 'classnames'
import './home.normal.less'
import AutoUpdate from '@components/AutoUpdate'
import { Button, message } from 'antd'
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
        <Button onClick={getLocalStoreData}>
          Get init store data
        </Button>
      </div>
    </div>
  )
}
