/**
 * 左侧菜单
 */
import React from 'react'
import { Menu } from 'antd'
import { useHistory, useLocation } from 'umi'
import menus, { IMenu } from '@config/menus'
import styles from './index.less'

const { SubMenu, Item } = Menu

export default (props: any) => {
  const history = useHistory()
  const location = useLocation()

  const clickMenu = (path: string) => {
    history.push(path)
  }

  const generate = (menus: Array<IMenu>, deep = [] as Array<string>) => {
    return menus.map(menu => {
      const paths = [...deep, menu.path]
      const path = paths.join('')

      return Array.isArray(menu.subs) && menu.subs.length ? (
        <SubMenu
          key={path}
          title={menu.title}
          icon={menu.icon}
        >
          {generate(menu.subs, paths)}
        </SubMenu>
      ) : (
          <Item
            key={path}
            onClick={() => clickMenu(path)}
            title={menu.title}
            icon={menu.icon}
          >
            {menu.title}
          </Item>
        )
    })
  }

  return (
    <Menu
      mode='inline'
      theme='dark'
      className={styles.menu}
      selectedKeys={[`${location.pathname}`]}>
      {generate(menus)}
    </Menu>
  )
}
