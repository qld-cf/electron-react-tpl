# koa2 + typescript + websocket + redis + log4js

## 一、说明

> - cors 跨域处理
> - redis
> - websocket
> - log4js: 日志中间件

## 二、使用

```
npm install

// 本地热加载开发
npm run dev
// 构建成js
npm run build
// 线上启动 pm2或run dev
npm run pm2-start:watch


```

#### 前端使用

```
import React, { useEffect, useState } from 'react'
import { Card } from 'antd'

import socketIOClient from "socket.io-client";


const ENDPOINT = "http://127.0.0.1:8002";

interface IProps {
  loading: boolean
}

const WebSocket = (props: IProps) => {
  const [response, setResponse] = useState("");
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, { transport: ['websocket'] });
    console.log('socket', socket)
    if (socket) {
      socket.on("FromAPI", data => {
        setResponse(data);
      });
    }
  }, []);
  return (
    <Card>
      Settings
      <p>
        WebSocket检测: 当前服务器返回时间: <time dateTime={response}>{response}</time>
      </p>
    </Card>
  )
}

export default WebSocket


```
