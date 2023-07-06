<template>
  <div class="form" @submit="submitForm">
    <div id="formname">登录</div>
    <form action="{% url 'login' %}" id="login" ref="loginForm" novalidate>
      <div class="alert alert-danger" role="alert" ref="alert" v-show="isalert"></div>
      <div class="form-group">
        <div class="form-row">
          <div class="col-md-12">
            <div class="form-label-group">
              <label for="account" class="form-label">账户</label>
              <input type="text" class="form-control" v-model="account" id="account" placeholder="手机号或邮箱" required="true"
                minlength="4" maxlength="50" pattern="^[\u4e00-\u9fa5a-zA-Z0-9@.]{1,50}$">
              <div class="invalid-feedback" ref="invalid1">请输入正确的账户</div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-label-group">
              <label for="password" class="form-label">密码</label>
              <input type="password" class="form-control" v-model="pwd" id="password" placeholder="密码" required="true"
                minlength="8" maxlength="16">
              <div class="invalid-feedback" ref="invalid2">请输入正确的密码(8-16位)</div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="form-label-group">
              <label for="id_code">验证码:</label>
              <div id="codeinput">
                <input type="text" name="code" maxlength="4" class="form-control" id="id_code"
                  placeholder="验证码" required="true" v-model="code"><img id="code" :src="imgurl" alt="加载中..."
                  @click="resetcode">
              </div>
              
            </div>

          </div>
        </div>
        <div class="more">
          <label>
            <input type="checkbox" v-model="is_remember" name="checkbox"
              style="height: 17px;width: 15px;    vertical-align: text-bottom;"> 记住密码
          </label>
          <a style="float:right">忘记密码</a>
        </div>

      </div>
      <div class="sb">
        <button type="submit" class="btn btn-dark">登录</button>&nbsp;
        <button type="button" class="btn btn-light">注册</button>
      </div>
    </form>
  </div>
</template>

<script>
import '../assets/css/form.css'

export default {
  data() {
    return {
      account: '',
      pwd: '',
      code: '',
      imgurl: this.$baseUrl + '/api/code/imgcode?random=' + Math.random(),
      is_remember: true,
      isInvalid: false,
      isSubmitted: false,
      isalert: false,
      login_status:false
    };
  },

  methods: {
    remember() {
      if (localStorage.getItem('refreshToken')) {
        if (this.is_remember === false) {
          sessionStorage.setItem('refreshToken', localStorage.getItem('refreshToken'));
          localStorage.removeItem('refreshToken')

        } else{
          sessionStorage.removeItem('refreshToken')
        }
      }

    },
    resetcode() {
      this.imgurl = this.$baseUrl + '/api/code/imgcode?random=' + Math.random()
    },
    async submitForm(event) {
      this.isalert = false
      event.preventDefault();
      event.stopPropagation();

      // 使用Bootstrap的表单验证样式
      if (event.target.checkValidity()) {
        // 执行认证逻辑
        await this.login()
        console.log(this.login_status)
        if (this.login_status) {
          this.isSubmitted = true;
          this.isInvalid = false;
          // 重定向到登录后的页面
          console.log('登录成功')
          this.$router.push('/');
        } else {
          this.isInvalid = true;
        }
      } else {
        event.target.classList.add('was-validated');
      }
    },

    async login() {


      let response=await this.$http
        .post(this.$api.login, {
          account: this.account,
          pwd: this.pwd,
          code: this.code
        })
        .then(response => {
          // 登录成功，获取访问令牌和刷新令牌并保存到本地（例如使用localStorage）
          if (response.data.code === 200) {
            const { access_token, refresh_token } = response.data.tokens;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token)
            this.login_status=true
          } else if (response.data.code === 501) {
            this.$refs.alert.innerHTML = '验证码错误'
            this.isalert = true
          } else if (response.data.code === 502) {
            this.$refs.alert.innerHTML = '用户名或密码不正确'
            this.isalert = true
          } else if (response.data.code === 503) {
            this.$refs.alert.innerHTML = '账号禁用'
            this.isalert = true
          } else if (response.data.code === 504) {
            this.$refs.alert.innerHTML = response.data.errors.non_field_errors[0]
            this.isalert = true
            
          }
        })
        .catch(error => {

          this.$refs.alert.innerHTML = error
          this.isalert = true
        });

        this.resetcode()
        this.remember()
      
    },
  },
};
</script>
<style lang="less" scoped>
input {
  height: 45px;
}

* {
  font-size: 15px;
}

.more {
  margin-top: 15px;
}
</style>