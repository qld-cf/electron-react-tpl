/**
 * 全局store dva+redux+redux-saga
 */
export default {
  namespace: 'xxStore',
  state: {
    xxList: []
  },
  effects: {
    *updateList({ payload }: any, { call, put, select }: any) { // 开放使用方法
      yield put({
        type: 'save',
        payload: { xxList: payload }
      })
    },

  },
  reducers: {
    save(state: any, { payload }: any) {
      return { ...state, ...payload }
    }
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        console.log('pathname', pathname)
      })
    }
  }
}
