import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/bootstrap.css'
import './assets/js/bootstrap.bundle'
import './index.css'
import axios from 'axios'
// import ToastPlugin from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-sugar.css';


const app = createApp(App)

axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.withCredentials = true
app.config.globalProperties.$baseUrl='http://127.0.0.1:8000'
app.config.globalProperties.$http = axios
app.config.globalProperties.$refreshTime=5
app.config.globalProperties.$api={
    login:'/api/auth/login/',
    refresh:'/api/token/refresh/',
    emailcode:'/api/code/emailcode',
    signup:'/api/auth/signup/',
    userinfo:'/api/auth/userinfo/'
}
// 挂载路由模块
// app.use(ToastPlugin)
app.use(router)
app.mount('#app')

