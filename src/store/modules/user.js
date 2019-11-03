import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, setUserId, getUserId, removeToken, removeUserId, setUserCode, getUserCode, removeUserCode } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userId: getUserId(),
    name: getUserCode(),
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERID: (state, id) => {
      state.userId = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();

      let data = new FormData();
      data.append('username',username);
      data.append('password',userInfo.password);

      return new Promise((resolve, reject) => {
        login(data).then(res => {
          //  cookie里设置token,userId,userCode
          setToken(res.token);
          setUserId(res.userId);
          setUserCode(res.userCode);
          //  vuex里设置token
          commit('SET_TOKEN', res.token);
          commit('SET_USERID', res.userId);
          commit('SET_NAME', res.userCode);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        //  重置vuex里设置token,userId
        commit('SET_TOKEN', undefined);
        commit('SET_USERID', undefined);
        commit('SET_NAME', undefined);
        //  删除cookie里设置token,userId
        removeToken();
        removeUserId();
        removeUserCode();
        resolve()
      })
    }
  }
}

export default user
