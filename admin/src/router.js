import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    // 登录页
    path: '/',
    name: 'login',
    component: Login
  }, {
    // 首页
    path: '/home',
    name: 'home',
    component: Home
  }]
})