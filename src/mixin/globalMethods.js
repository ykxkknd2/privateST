import store from '../store'

export const globalMethods = {
  methods: {
    successMsg(msg) {
      this.$message({
        message: msg,
        type: 'success'
      });
    },
    errorMsg(msg) {
      this.$message({
        message: msg,
        type: 'error'
      });
    },
    fedLogOut() {
      this.$confirm(
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
      });
    },
    confirm(msg, success, fail) {
      this.$confirm(msg,'提示信息',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        typeof success === 'function' && success();
      }).catch(() => {
        typeof fail === 'function' && fail();
      });
    }
  }
};
