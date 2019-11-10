/*-------------------------------------------------全局参数--------------------------------------------------------- */

/**
 * NODE_ENV：                    NODE全局环境变量
 */
const NODE_ENV = process.env.NODE_ENV;


/*-------------------------------------------------环境参数----------------------------------------------------------*/

/**
 * EnvironmentOption:             统一处理需要根据环境变换的参数
 *
 * BASE_API:                      项目基础接口地址
 * TokenDomain:                   登录token写入cookie的域名
 * AUTH_API:                      权限相关接口
 */
const EnvironmentOption = NODE_ENV === 'development' ? {
  BASE_API: 'http://api.kcode.bkuu.com'
} : NODE_ENV === 'test' ? {
  BASE_API: 'http://api.kcode.bkuu.com'
} : {
  BASE_API: 'http://api.kcode.bkuu.com'
};

module.exports = {
  NODE_ENV,
  EnvironmentOption
};
