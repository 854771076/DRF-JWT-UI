<template>
    <div id="user">
        <div class="userdata">
            <div class="headerpic">
                <img :src="this.$baseUrl + userinfo.photo" class="rounded-circle" height="35" width="35">
            </div>
            <div class="accountinfo">
                <div id="m_username">
                    <span id="nikename" v-text="userinfo.name" @click="login"></span> <a href="/changeuserinfo"><i
                            class="fa-solid fa-pen" style="color:gray;margin-left:20px"></i></a>
                </div>
                <div id="m_account">
                    <span id="m_phone">手机号：{{userinfo.phone}} </span>
                    <span id="m_email">邮箱： {{userinfo.email}} </span>
                </div>
            </div>
        </div>

        <div class="m_invitedinfo">
            <slot name="baseinfo"></slot>
        </div>

        <div class="fun_card">
            <slot name="card"></slot>
        </div>

        <div class="setting">
            更多服务
            <slot name="more"></slot>

        </div>

        <template v-if="userinfo.is_login == 0">
            <a href="/login" id="logout">登录</a>
        </template>
        <template v-else>
            <a id="logout" @click="logout">退出登录</a>
        </template>

    </div>
</template>
<script>
import '../../../assets/css/user.css'
export default {
    props: {
        userinfo: {
            type: Object,
            required: true
        }
    },
    name: 'Mine',
    methods: {
        logout() {
            sessionStorage.clear()
            localStorage.clear()
            this.$router.push('/login')
        },
        login() {
         if (!this.userinfo.is_login) {
            this.$router.push('/login')
         }
      },
    }

};
</script>
<style lang="less" scoped>
</style>