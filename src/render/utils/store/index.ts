/**
 * Q: electron无法正常保存COOKIE STORAGE
 * 方案: electron客户端保存本地数据Store
 */
const Store = require('@utils/polyfill')('electron-store')

const store = new Store()

class GlobalStore {
  public get(name: string | string[]): any {
    if (Array.isArray(name)) {
      return name.map(n => store.get(n))
    } else {
      return store.get(name)
    }
  }
  public save(key: string, val: any): void {
    store.set(key, val)
  }
  public delete(key: string | string[]): void {
    if (Array.isArray(key)) {
      key.forEach(k => store.delete(k))
    } else {
      store.delete(key)
    }
  }
}

export default new GlobalStore()
