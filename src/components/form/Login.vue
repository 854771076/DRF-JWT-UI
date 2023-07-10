<template>
  <Form :action="login">
    <template v-slot:formname>登录</template>
    <template v-slot:alert>
      <div class="alert alert-danger" role="alert" ref="alert" v-show="isalert"></div>
    </template>
    <template v-slot:form>
      <div class="form-row">
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="account" class="form-label">账户</label>
            <input type="text" class="form-control" v-model="formdata.account" id="account" placeholder="手机号或邮箱"
              required="true" minlength="4" maxlength="50" pattern="^[\u4e00-\u9fa5a-zA-Z0-9@.]{1,50}$">
            <div class="invalid-feedback" ref="invalid1">请输入正确的账户</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="password" class="form-label">密码</label>
            <input type="password" class="form-control" v-model="formdata.pwd" id="password" placeholder="密码"
              required="true" minlength="8" maxlength="16">
            <div class="invalid-feedback" ref="invalid2">请输入正确的密码(8-16位)</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="id_code">验证码:</label>
            <div id="codeinput">
              <input type="text" name="code" maxlength="4" class="form-control" id="id_code" placeholder="验证码"
                required="true" v-model="formdata.code"><img id="code" :src="imgurl" alt="加载中..."
                @click="resetcode">
            </div>
          </div>
        </div>
        <div class="more">
          <label>
            <input type="checkbox" v-model="is_remember" name="checkbox"
              style="height: 17px;width: 15px;    vertical-align: text-bottom;"> 记住密码
          </label>
          <a style="float:right" href="/foreget">忘记密码</a>
        </div>
      </div>
      <div class="sb">
        <button type="submit" class="btn btn-dark">登录</button>&nbsp;
        <button type="button" class="btn btn-light" @click="this.$router.push('/signup');">注册</button>
      </div>
    </template>
  </Form>
</template>
<script>
import Form from './Form.vue'

export default {
  data() {
    return {
      formdata: {
        account: '',
        pwd: '',
        code: '',

      },
      imgurl: this.$baseUrl + '/api/code/imgcode?random=' + Math.random(),
      is_remember: true,
      isInvalid: false,
      isSubmitted: false,
      isalert: false,
    };
  },

  methods: {
    remember() {
      if (localStorage.getItem('refreshToken')) {
        if (this.is_remember === false) {
          sessionStorage.setItem('refreshToken', localStorage.getItem('refreshToken'));
          localStorage.removeItem('refreshToken')

        } else {
          sessionStorage.removeItem('refreshToken')
        }
      }

    },
    resetcode() {
      this.imgurl = this.$baseUrl + '/api/code/imgcode?random=' + Math.random()
    },
    async login() {
      this.isalert = false
      this.isInvalid = true;
      let response = await this.$http
        .post(this.$api.login, this.formdata)
        .then(response => {
          // 登录成功，获取访问令牌和刷新令牌并保存到本地（例如使用localStorage）
          if (response.data.code === 200) {
            const { access_token, refresh_token } = response.data.tokens;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token)
            this.isSubmitted = true;
            this.isInvalid = false;
            this.remember()
            this.$router.push('/');
          } else {
            this.$refs.alert.innerHTML = response.data.error
            this.isalert = true
          } 

        })
        .catch(error => {
          this.$refs.alert.innerHTML = '未知错误'
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