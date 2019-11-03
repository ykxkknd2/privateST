import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    next();
    NProgress.done()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (to.path == '/msgList') {
        next({path: '/login', query: {retUrl: 'msgList'}})
      } else {
        next('/login') // 否则全部重定向到登录页
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
