import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { Message, Modal } from 'iview'
import store from '../store'
import { getToken, setToken, getUserId } from '@/utils/auth'
import { EnvironmentOption } from '../config';

// 创建axios实例
const service = axios.create({
  baseURL: EnvironmentOption.BASE_API, // api 的 base_url
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token
    }
    if (store.getters.userId) {
      config.headers['userId'] = getUserId() // 让每个请求携带自定义userId
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * 0 请求成功
     * 701201 新建OR修改成功
     * 701210 数据已存在
     * 701204 删除成功
     * 701400 请求失败,请检查参数合法性
     * 701401 身份验证失败,请检查token是否正确
     * 701402 身份验证失败,请检查用户名、密码是否正确
     * 701403 token过期，请重新登录
     * 701404 未找到相关数据
     * 701500 服务器发生错误
     */
    const res = response.data;

    if(response.headers.token) {
      //  如果header里有token字段，更新token
      setToken();
      store.commit('SET_TOKEN');
    }

    if (res.code === 0) {
      //  0 请求成功
      //  如果有data数据，取到data，如果没有，全部返回；

      return res.data || res;
    } else if (res.code === 701403  || res.code === 701401){
      //  701403 token过期，请重新登录
      //  701401 身份验证失败,请检查token是否正确

      /*-----------iView提示框---------*/
      Modal.confirm({
        title: '确定登出',
        content: '授权失败，请重新登录',
        loading: true,
        okText: '重新登录',
        cancelText:  '取消',
        onOk: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        }
      });
      /*-----------iView提示框---------*/


      /*-----------Element提示框---------*/
      /*MessageBox.confirm(
        '授权失败',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('FedLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      });*/
      /*-----------Element提示框---------*/

      return Promise.reject('error');
    }
    else {
      //  其他错误码处理

      /*-----------iView提示框---------*/
      Message.error({
        content: res.msg,
        duration: 5
      });
      /*-----------iView提示框---------*/

      /*-----------Element提示框---------*/
      /*Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });*/
      /*-----------Element提示框---------*/

      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error) // for debug

    /*-----------iView提示框---------*/
    Message.error({
      content: '网络错误',
      duration: 5
    });
    /*-----------iView提示框---------*/

    /*-----------Element提示框---------*/
    /*Message({
      message: '网络错误',
      type: 'error',
      duration: 5 * 1000
    });*/
    /*-----------Element提示框---------*/

    return Promise.reject(error)
  }

)

export default service
