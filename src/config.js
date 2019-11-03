/*-------------------------------------------------全局参数--------------------------------------------------------- */

/**
 * NODE_ENV：                    NODE全局环境变量
 */
const NODE_ENV = process.env.NODE_ENV;

/**
 * TokenKey：                    登录token的命名
 * UserIdKey：                   登录用户的id
 */
const TokenKey = 'vipcode-token';
const UserIdKey = 'vipcode-userId';
const UserCodeKey = 'vipcode-userCode';

/*-------------------------------------------------环境参数----------------------------------------------------------*/

/**
 * EnvironmentOption:             统一处理需要根据环境变换的参数
 *
 * BASE_API:                      项目基础接口地址
 * TokenDomain:                   登录token写入cookie的域名
 * AUTH_API:                      权限相关接口
 */
const EnvironmentOption = NODE_ENV === 'development' ? {
  BASE_API: 'http://test-sso.i.vipcode.com/api',
  TokenDomain: 'localhost',
  AUTH_API: 'http://test-auth.i.vipcode.com/service/api',
  Msg_API: 'http://test.api.agserver.i.vipcode.com/'
} : NODE_ENV === 'test' ? {
  BASE_API: 'http://test-sso.i.vipcode.com/api',
  TokenDomain: 'i.vipcode.com',
  AUTH_API: 'http://test-auth.i.vipcode.com/service/api',
  Msg_API: 'http://test.api.agserver.i.vipcode.com/'
} : {
  BASE_API: 'http://sso.i.vipcode.com/api',
  TokenDomain: 'i.vipcode.com',
  AUTH_API: 'http://auth.i.vipcode.com/service/api',
  Msg_API: 'http://api.agserver.i.vipcode.com/'
};



module.exports = {
  NODE_ENV,
  TokenKey,
  UserIdKey,
  UserCodeKey,
  EnvironmentOption
};
