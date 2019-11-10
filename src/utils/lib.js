import Cookies from 'js-cookie'
const token_cookie = 'bkuu_token'

function getToken(){
  return Cookies.get(token_cookie);
}

function setToken(token){
  Cookies.set(token_cookie,token);
}

export {
  getToken,
  setToken,
}
