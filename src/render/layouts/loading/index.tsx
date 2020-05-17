import React from 'react'
import { Spin } from 'antd'
import styles from './index.less'

export default () => {
  return (
    <div className={styles.main}>
      <Spin spinning={true} />
    </div>
  )
}
