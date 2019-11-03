import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/', redirect: '/login',  hidden: true },
  { path: '/login', component: () => import(/* webpackChunkName: "login" */ '@/views/login/index'), hidden: true },
  { path: '/platform', component: () => import(/* webpackChunkName: "platform" */ '@/views/platform/index'), hidden: true },
  { path: '/msglist', component: () => import(/* webpackChunkName: "msglist" */ '@/views/msglist/index'), hidden: true },
  { path: '/password', component: () => import(/* webpackChunkName: "password" */ '@/views/password/change'), hidden: true },
  { path: '/404', component: () => import(/* webpackChunkName: "404" */ '@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
