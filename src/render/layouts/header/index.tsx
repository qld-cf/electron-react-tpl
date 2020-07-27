import React from 'react'
import { Layout } from 'antd'
import './index.less'


const { Header } = Layout

const headerProps = {
  style: {
    // backgroundImage: `url(${require('@/assets/image/nav-bg.jpg')})`
    background: '#A14EFF'
  }
}

const HeaderComponent = (props: any) => {

  return (
    <Header {...headerProps} className='layout-top-eader'>
      <div className='d-flex align-items-center justify-content-between'>
        <div style={{ marginLeft: 20 }} >Hello Electron</div>
      </div>
    </Header>
  )
}

export default HeaderComponent
