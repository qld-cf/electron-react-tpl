import React from 'react'
import cls from 'classnames'
import './home.normal.less'
import AutoUpdate from '@components/AutoUpdate'
export default function() {
  return (
    <div className='homewrap'>
      <div className='bigFt'>Welcome to MapleChain Electron App</div>
      <AutoUpdate />
    </div>
  )
}
