<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      refreshTokenInterval: null, // 定时器变量
      refreshTokenExpirationTime: 1000*60*this.$refreshTime, // 刷新令牌的过期时间，替换为实际的值
    };
  },
  async mounted() {
    // 页面加载时开始定时刷新令牌
    await this.startTokenRefresh();
  },
  methods: {
    // 调用刷新令牌接口
    async refreshAccessToken() {
      if(localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken')){
        let refresh=localStorage.getItem('refreshToken')||sessionStorage.getItem('refreshToken')
        await this.$http.post(this.$api.refresh,{'refresh':refresh})
      .then(response => {
        const { access } = response.data;
        // 将新的访问令牌存储在本地（例如使用localStorage）
        localStorage.setItem('accessToken', access);
      })
      .catch(error => {
        // console.error('刷新令牌时发生错误:', error);
      }); 
      }
      
    },
    // 开始定时刷新令牌
    startTokenRefresh() {
      // 每隔一定时间调用refreshAccessToken函数
      this.refreshTokenInterval = setInterval(this.refreshAccessToken(), this.refreshTokenExpirationTime);
    },
    // 停止定时刷新令牌
    stopTokenRefresh() {
      clearInterval(this.refreshTokenInterval);
    },
    // 用户注销或离开页面时清理工作
    logout() {
      this.stopTokenRefresh();
      // 清除存储的访问令牌和刷新令牌
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  beforeDestroy() {
    // 离开页面时停止定时刷新令牌
    this.stopTokenRefresh();
  },
};
</script>