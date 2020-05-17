import * as api from '../services/foo'

export interface DataItem {
  age: number
  name: string
  job: string
  id: number | string
}

export interface FooState {
  list: Array<DataItem>
}

export default {
  namespace: 'foo',
  state: {
    list: []
  },
  effects: {
    *fetch({ payload }: any, { call, put }: any) {
      const { data } = yield call(api.getFoo, payload)
      yield put({
        type: 'save',
        payload: { list: data.list }
      })
    }
  },
  reducers: {
    save(state: FooState, { payload }: any) {
      return { ...state, ...payload }
    }
  }
}
