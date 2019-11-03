import Cookies from 'js-cookie'
import {TokenKey, UserIdKey, UserCodeKey, EnvironmentOption} from '../config'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {domain: EnvironmentOption.TokenDomain})
}

export function removeToken() {
  return Cookies.remove(TokenKey, {domain: EnvironmentOption.TokenDomain})
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(id) {
  return Cookies.set(UserIdKey, id, {domain: EnvironmentOption.TokenDomain})
}

export function removeUserId() {
  return Cookies.remove(UserIdKey, {domain: EnvironmentOption.TokenDomain})
}

export function getUserCode() {
  return Cookies.get(UserCodeKey)
}

export function setUserCode(code) {
  return Cookies.set(UserCodeKey, code, {domain: EnvironmentOption.TokenDomain})
}

export function removeUserCode() {
  return Cookies.remove(UserCodeKey, {domain: EnvironmentOption.TokenDomain})
}
