<template>
  <Form :action="signup" :formdata="formdata">
    <template v-slot:formname>注册</template>
    <template v-slot:alert>
      <div class="alert alert-danger" role="alert" ref="alert" v-show="isalert"></div>
      <div class="alert alert-success" role="alert" ref="alert_success" v-show="isalert_success"></div>
    </template>
    <template v-slot:form>
      <div class="form-row">
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="name" class="form-label">昵称</label>
            <input type="text" id="name" class="form-control" v-model="formdata.name" placeholder="昵称" required="true"
              min="1" max="50">
            <div class="invalid-feedback">请输入正确的昵称</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="email" class="form-label">邮箱</label>
            <input type="email" id="email" class="form-control" v-model="formdata.email" placeholder="邮箱"
              required="true">
            <div class="invalid-feedback">请输入正确的邮箱</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="phone" class="form-label">手机号</label>
            <input type="text" id="phone" class="form-control" v-model="formdata.phone" placeholder="手机号"
              required="true" pattern="\d{11}">
            <div class="invalid-feedback">请输入正确的手机号(11位)</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="password" class="form-label">密码</label>
            <input type="password" class="form-control" v-model="formdata.password" id="password" placeholder="密码"
              required="true" minlength="8" maxlength="16">
            <div class="invalid-feedback">请输入正确的密码(8-16位)</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="checkpassword" class="form-label">重复密码</label>
            <input type="password" class="form-control" v-model="formdata.checkpassword" id="checkpassword" placeholder="重复密码"
              required="true" minlength="8" maxlength="16">
            <div class="invalid-feedback">请输入正确的密码(8-16位)</div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-label-group">
            <label for="id_code">验证码:</label>
            <div id="codeinput">
              <input type="text" name="code" min="6" maxlength="6" class="form-control" id="id_code" placeholder="验证码" v-model="formdata.code">
              <button id="code" class="btn btn-light" type="button" @click="sendcode()">{{ code_status }}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="sb">
        <button type="submit" class="btn btn-dark">注册</button>&nbsp;
        <button type="button" class="btn btn-light" @click="this.$router.push('/login');">登录</button>
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
        email: '',
        name: '',
        phone: '',
        password: '',
        checkpassword: '',
        code: '',
      },
      code_status:'发送验证码',
      issend: 0,
      Interval: '',
      action: '注册验证',
      isInvalid: false,
      isSubmitted: false,
      isalert: false,
      isalert_success:false
    };
  },

  methods: {
    async sendcode() {
      this.isalert=false
      this.isalert_success=false
      if (this.issend == 0 && this.formdata.email != '') {
        //send
        await this.$http.post(
          this.$api.emailcode,
          {
            'email': this.formdata.email,
            'action': this.action
          }
        )
          .then(response => {

            this.issend = 1
            this.code_status = 60
            this.Interval = setInterval(this.countdown, 1000)
          })
          .catch(error => {
          this.$refs.alert.innerHTML = '请求频繁'
          this.isalert = true
        })
        
      }
      else if (this.formdata.email == '') {
        this.$refs.alert.innerHTML = '请填写邮箱'
        this.isalert = true
      }
    },
    countdown() {
      if (this.code_status != 0) {
        this.code_status--
      } else {
        this.code_status = '邮箱验证码'
        clearInterval(this.Interval)
        this.issend = 0
      }
    },
    async signup() {
      this.isalert=false
      this.isalert_success=false
      this.isInvalid = true;
      let response = await this.$http
        .post(this.$api.signup, this.formdata)
        .then(response => {
          //注册成功
          if (response.data.code === 200) {
            this.$refs.alert_success.innerHTML = '注册成功'
            this.isalert_success = true
            this.isSubmitted = true;
          } else {
            this.$refs.alert.innerHTML = response.data.error
            this.isalert = true
          } 
        })
        .catch(error => {
          this.$refs.alert.innerHTML = error
          this.isalert = true
        });
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