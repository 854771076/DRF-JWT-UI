<template>
  <Form :action="login" :formdata="formdata">
    <template v-slot:formname >注册</template>
    <template v-slot:alert>
      <div class="alert alert-danger" role="alert" ref="alert" v-show="formdata.isalert"></div>
    </template>
    <template v-slot:form >
      <div class="form-row">
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="account" class="form-label">账户</label>
            <input type="text" class="form-control" v-model="formdata.account" id="account" placeholder="手机号或邮箱" required="true"
              minlength="4" maxlength="50" pattern="^[\u4e00-\u9fa5a-zA-Z0-9@.]{1,50}$">
            <div class="invalid-feedback" ref="invalid1">请输入正确的账户</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="password" class="form-label">密码</label>
            <input type="password" class="form-control" v-model="formdata.pwd" id="password" placeholder="密码" required="true"
              minlength="8" maxlength="16">
            <div class="invalid-feedback" ref="invalid2">请输入正确的密码(8-16位)</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="id_code">验证码:</label>
            <div id="codeinput">
              <input type="text" name="code" maxlength="4" class="form-control" id="id_code" placeholder="验证码"
                required="true" v-model="formdata.code"><img id="code" :src="formdata.imgurl" alt="加载中..." @click="resetcode">
            </div>
          </div>
        </div>
        <div class="more">
          <label>
            <input type="checkbox" v-model="formdata.is_remember" name="checkbox"
              style="height: 17px;width: 15px;    vertical-align: text-bottom;"> 记住密码
          </label>
          <a style="float:right">忘记密码</a>
        </div>
      </div>
      <div class="sb">
        <button type="submit" class="btn btn-dark">注册</button>&nbsp;
        <router-link to="/login" tag="button" class="btn btn-light">登录</router-link>
      </div>
    </template>
  </Form>
</template>
<script>
import Form from './Form.vue'

export default {
  data() {
    return {
      formdata:{
        account: '',
        pwd: '',
        code: '',
        imgurl: this.$baseUrl + '/api/code/imgcode?random=' + Math.random(),
        is_remember: true,
        isInvalid: false,
        isSubmitted: false,
        isalert: false,
      },
      
    };
  },

  methods: {
    remember() {
      if (localStorage.getItem('refreshToken')) {
        if (this.formdata.is_remember === false) {
          sessionStorage.setItem('refreshToken', localStorage.getItem('refreshToken'));
          localStorage.removeItem('refreshToken')

        } else{
          sessionStorage.removeItem('refreshToken')
        }
      }

    },
    resetcode() {
      this.formdata.imgurl = this.$baseUrl + '/api/code/imgcode?random=' + Math.random()
    },
    async login() {
      this.formdata.isalert = false
      this.formdata.isInvalid = true;
      let response=await this.$http
        .post(this.$api.login, {
          account: this.formdata.account,
          pwd: this.formdata.pwd,
          code: this.formdata.code
        })
        .then(response => {
          // 登录成功，获取访问令牌和刷新令牌并保存到本地（例如使用localStorage）
          if (response.data.code === 200) {
            const { access_token, refresh_token } = response.data.tokens;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token)
            this.formdata.isSubmitted = true;
            this.formdata.isInvalid = false;
            this.remember()
            this.$router.push('/');
          } else if (response.data.code === 501) {
            this.$refs.alert.innerHTML = '验证码错误'
            this.formdata.isalert = true
          } else if (response.data.code === 502) {
            this.$refs.alert.innerHTML = '用户名或密码不正确'
            this.formdata.isalert = true
          } else if (response.data.code === 503) {
            this.$refs.alert.innerHTML = '账号禁用'
            this.formdata.isalert = true
          } else if (response.data.code === 504) {
            this.$refs.alert.innerHTML = response.data.errors.non_field_errors[0]
            this.formdata.isalert = true
          }else{

          }
        })
        .catch(error => {
          this.$refs.alert.innerHTML = error
          this.isalert = true
        });

        this.resetcode()
        
      
    },
  },
  components: {
    Form
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