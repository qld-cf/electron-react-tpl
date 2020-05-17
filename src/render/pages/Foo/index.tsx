/**
 * redux实例
 */
import React from 'react'
import { Card } from 'antd'
import { connect } from 'umi'
import { ConnectProps } from 'umi/types'
import TableList from './components/TableList'
import { FooState } from './models/foo'

interface IProps extends ConnectProps {
  foo: FooState
  loading: boolean
}

const Foo = (props: IProps) => {
  const { dispatch = () => {}, foo } = props
  React.useEffect(() => {
    dispatch({
      type: 'foo/fetch',
      payload: {}
    })
  }, [])

  const data = React.useMemo(() => {
    return foo.list
  }, [foo.list])

  return (
    <Card>
      <TableList dataSource={data} loading={props.loading} />
    </Card>
  )
}

export default connect(({ foo, loading }: any) => ({
  foo,
  loading: loading.effects['foo/fetch']
}))(Foo)
