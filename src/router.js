import { createRouter, createWebHistory  } from 'vue-router'

import Home from './components/home/Home.vue'
import Login from './components/form/Login.vue'
import Signup from './components/form/Signup.vue'

// 创建路由对象
const router = createRouter({
  history: createWebHistory (),
  routes: [
    { path: '/', name:'首页',component: Home },
    { path: '/login',name:'登录', component: Login },
    { path: '/signup',name:'注册', component: Signup },
  ],
})

// 全局路由导航守卫
// router.beforeEach((to, from, next) => {
// const accessToken = localStorage.getItem('accessToken')

//   if (to.path === '/main' && !accessToken) {
//     // 证明用户要访问后台主页
//     next('/login')
//   } else {
//     // 访问的不是后台主页
//     next()
//   }
// })

export default router
