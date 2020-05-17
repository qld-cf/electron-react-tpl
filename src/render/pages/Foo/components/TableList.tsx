import React from 'react'
import { TableProps, ColumnType } from 'antd/lib/table'
import { Table } from 'antd'
import { DataItem } from '../models/foo'

const columns: Array<ColumnType<DataItem>> = [
  {
    dataIndex: 'name',
    title: 'Name'
  },
  {
    dataIndex: 'age',
    title: 'Age'
  },
  {
    dataIndex: 'job',
    title: 'Job'
  }
]

export interface IProps extends TableProps<DataItem> {
  loading: boolean
}

export default (props: IProps) => {
  const tableProps: TableProps<DataItem> = {
    ...props,
    columns,
    rowKey: (recode: DataItem) => recode.id
  }

  return <Table {...tableProps} />
}
