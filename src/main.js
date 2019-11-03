import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/assets/icons' // icon
import '@/permission' // 权限控制

import '@/components/_globals';   //  全局组件

import '@/mixin/index'  //  全局混合

import '@/directive/index'  //  全局指令

import '@/filter/index'  //  全局过滤器

Vue.use(iView)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
