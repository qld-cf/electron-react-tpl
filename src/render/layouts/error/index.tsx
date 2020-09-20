import React, { ErrorInfo } from 'react'
import { Spin } from 'antd'
const log = require('electron-log');

export default class ErrorBoundary extends React.PureComponent {
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  state = { hasError: false }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorData = `${error.stack}\n${errorInfo.componentStack}`
    log.error(`ErrorBoundary-${new Date()}: `, errorData)
    if (process.env.NODE_ENV !== 'development') { // 生产环境才开启
      location.href = location.href.includes('index.html') ? `${location.origin}/index.html` : location.origin as string
    }
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <Spin spinning={true}>
          <div style={{ width: '100vw', height: '100vh' }}></div>
        </Spin>
      )
    } else {
      return children
    }
  }
}
