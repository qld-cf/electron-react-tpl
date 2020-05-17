import { History } from 'umi'

declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare module 'umi' {
  /** react-router history 对象 */
  export const history: History
}

declare global {
  /** 启动时候的 ENV */
  const REACT_APP_MY_ENV: string

  interface Window {
    /** 浏览器下开发，关闭 electron 载入动画 */
    stopLoading: () => void,
    /** 是否开启自动更新 */
    isOpenAutoUpdate: boolean
  }
}
