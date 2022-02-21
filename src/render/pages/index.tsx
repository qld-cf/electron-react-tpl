import React, { useEffect, useState } from 'react'
import './home.normal.less'
import AutoUpdate from '@components/AutoUpdate'
import { Button, Input, Form, message } from 'antd'
const Store = require('electron-store')
const store = new Store()
const electron = require('electron')

let ipcRenderer: Electron.IpcRenderer
ipcRenderer = electron.ipcRenderer

export default function() {
  const [form] = Form.useForm()
  const [dataValuesArr, setDataValuesArr] = useState([])
  const getLocalStoreData = () => {
    message.info(store.get('LOCAL_ELECTRON_STORE'))
  }

  const syncSqliteDataUserInfo = async () => {
    ipcRenderer.send('sync-user-info')
  }
  const setSqliteDataUserInfo = async (name: string) => {
    ipcRenderer.send('set-user-name', name)
  }

  ipcRenderer.on('send-user-info', (event, arg) => {
    if (arg?.length) {
      setDataValuesArr(arg.map((args: { dataValues: any }) => args.dataValues))
      const { firstName } = arg[arg.length - 1].dataValues
      form.setFieldsValue({
        username: firstName
      })
    }
  })

  const onFinish = (values: { username: string }) => {
    if (values.username) {
      setSqliteDataUserInfo(values.username)
      message.success('set successfully')
      syncSqliteDataUserInfo()
    }
  }

  useEffect(() => {
    syncSqliteDataUserInfo()
  }, [])

  return (
    <div className='homewrap'>
      <div className='bigFt'>Welcome to MapleChain Electron App</div>
      <AutoUpdate />
      <div>
        <div className='bigFt'>electron-store</div>
        <div className='bigFt'>
          <Button
            onClick={() => {
              store.set('LOCAL_ELECTRON_STORE', `best`)
              message.success('Set successfully!')
            }}
            style={{ marginRight: '10px' }}
          >
            Set store msg: best
          </Button>
          <Button onClick={getLocalStoreData}>Get init store data</Button>
        </div>
      </div>
      <div>
        <div className='bigFt'>RightClickMenuFuc</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ margin: '10px 0' }}>Right click and copy any text</span>
          <Input placeholder='右键黏贴~' />
        </div>
      </div>
      <div>
        <div className='bigFt'>SqliteData</div>
        <div>
          <Form name='basic' onFinish={onFinish} autoComplete='off' form={form}>
            <Form.Item
              label='Username'
              name='username'
              rules={[{ required: true, message: 'Please input your username' }]}
            >
              <Input placeholder='input username' width={300} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit Sqlite Data
              </Button>
            </Form.Item>
          </Form>
          DBUserNameData: {dataValuesArr.map(value => value.firstName).join(' | ')}
        </div>
      </div>
    </div>
  )
}
