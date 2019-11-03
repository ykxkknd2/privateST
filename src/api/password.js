import request from '@/utils/request'
import { EnvironmentOption } from '@/config'

export function updatePassword(data) {
  return request({
    baseURL: EnvironmentOption.AUTH_API,
    url: '/user/update/password',
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data
  })
}
