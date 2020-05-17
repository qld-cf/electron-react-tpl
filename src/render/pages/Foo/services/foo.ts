import axios from 'axios'

export function getFoo(params: any) {
  return axios('/api/foo', { method: 'POST', params })
}
