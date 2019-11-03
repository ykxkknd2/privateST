import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sso/login',
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
