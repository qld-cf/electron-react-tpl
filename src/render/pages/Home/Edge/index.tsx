import React from 'react'
import { Card, Button } from 'antd'

interface IProps {
  loading: boolean
}

const Edge = (props: IProps | any) => {

  return (
    <div>
      <Card >
        Edge
    </Card>
      <Button onClick={() => {
        props.history.push('/')
      }} style={{ marginTop: 10 }}>
        Back To Home
    </Button>
    </div>
  )
}

export default Edge
