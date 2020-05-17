/**
 * axios二次封装
 */

import axios from 'axios'

console.log(process.env.REACT_APP_URL)
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
  timeout: 10000
})

// 请求拦截
instance.interceptors.request.use(
  config => {
    // config.headers['X-Token'] = ''
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)
// 响应拦截
instance.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res.data
    } else {
      console.error('INSTANCE_ERROR')
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export const getRequest = (url) => {
  return instance({
    method: 'get',
    url: url
  });
}

export const postRequest = (url, params) => {
  return instance({
    method: 'post',
    url: url,
    data: params,
    transformRequest: [(data) => {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  });
}

// export default instance
