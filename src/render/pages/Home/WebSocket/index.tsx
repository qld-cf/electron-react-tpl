import React, { useEffect, useState } from 'react'
import { Card } from 'antd'

import socketIOClient from "socket.io-client";


const ENDPOINT = "http://127.0.0.1:3002";

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
