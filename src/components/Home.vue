<template>
  <Nav>
    <template v-slot:logo>
      <h2>Logo</h2>
    </template>
    <template v-slot:item>
      <li class="nav-item">
        <a class="nav-link" aria-current="page" href="/">首页</a>
      </li>
    </template>
    <template v-slot:userinfo>
      <template v-if="!is_login">
        <button type="button" class="btn btn-dark" @click="this.$router.push('/login');">登录</button>
        <button type="button" class="btn btn-light" style="margin: 0;" @click="this.$router.push('/signup');">注册</button>
      </template>
      <template v-else>
        <li class="nav-item dropdown">
        <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"
          id="down" style="line-height: 30px;">
          <img :src="baseurl+userinfo.photo" class="rounded-circle" height="30" width="30" style="margin-right: 10px;">{{ userinfo.name }}
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu" id="usermenu">
          <li class="dropdown-item dropdown-header">用户信息</li>
          <li class="dropdown-item">
            <div class="item-header">用户名</div><a>{{ userinfo.name }}</a>
          </li>
          <li class="dropdown-header dropdown-item" >
            <div class="item-header">邮箱</div><a href="javascript:;" style="text-decoration: none">{{ userinfo.email  }}</a>
          </li>
          <li class="dropdown-header dropdown-item">
            <div class="item-header">手机号</div><a href="javascript:;"
              style="text-decoration: none;">{{ userinfo.phone }}</a>
          </li>

          <li>
            <hr class="dropdown-divider">
          </li>
          <li class="dropdown-item dropdown-header">基本功能</li>
          <li><a class="dropdown-item" href="/changeuserinfo">修改信息</a></li>
          <li><a class="dropdown-item" href="/changepsw">修改密码</a></li>
          <li><a class="dropdown-item" @click="logout">退出登陆</a></li>
        </ul>
      </li>
      </template>     
    </template>
  </Nav>
</template>

<script>
// import '../assets/css/public.css'
import Nav from './Nav.vue'
export default {
  name: 'Home',
  created() {
    this.getUserinfo()
  },
  data() {
    return {
      userinfo: {},
      baseurl:this.$baseUrl,
      is_login:false
    }
  },
  methods: {
    logout() {
      sessionStorage.clear()
      localStorage.clear()
      this.$router.push('/login')
    },
    async getUserinfo() {
      let token=localStorage.getItem('accessToken')
      if(token){
        await this.$http.get(this.$api.userinfo, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token
        }
      })
        .then(response => {
            this.userinfo=response.data.data
            this.is_login=true
        })
        .catch(error => {
          // 处理错误
        });
      }
    }
  },
  components: {
    Nav
  }
}
</script>

<style lang="less" scoped>
h2 {  
  margin: 0;

}
</style>
