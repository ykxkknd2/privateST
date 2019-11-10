import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/lib'

Vue.use(Router)

function checkToken(to,from,next){
  if(!getToken()){
    next({path: '/login'})
  }
  next()
}

export const constantRouterMap = [
  { path: '/', redirect: '/login',  hidden: true },
  { path: '/login', component: () => import(/* webpackChunkName: "login" */ '@/views/login/index'), hidden: true },
  //学生老师课程页暂时公用一个
  { path: '/studentCurr', beforeEnter: checkToken, component: () => import(/* webpackChunkName: "studentCurr" */ '@/views/teacher/curriculum/index'), hidden: true },
  { path: '/teacherCurr', beforeEnter: checkToken, component: () => import(/* webpackChunkName: "teacherCurr" */ '@/views/teacher/curriculum/index'), hidden: true },
  { path: '/teacherLessonHour', beforeEnter: checkToken, component: () => import(/* webpackChunkName: "teacherLessonHour" */ '@/views/teacher/lessonHour/index'), hidden: true },
  { path: '/404', component: () => import(/* webpackChunkName: "404" */ '@/views/404'), hidden: true },
  { path: '*', redirect: '/login', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
