<template >
    <Snav>
        <template v-slot:name>
            基本资料
        </template>
    </Snav>
    <div class="list" v-show="!isshow">
        <div @click="show('photo','file')"><span>头像</span><div><span><img :src="baseurl + userinfo.photo" class="rounded-circle" height="35" width="35"></span><i class="fa-sharp fa-solid fa-arrow-up fa-rotate-90" ></i></div></div>
        <div @click="show('name','text',userinfo.name)"><span>昵称</span><div><span>{{ userinfo.name }}</span><i class="fa-sharp fa-solid fa-arrow-up fa-rotate-90" ></i></div></div>
        <div @click="show('phone','text',userinfo.phone)"><span>手机号</span><div><span>{{ userinfo.phone }}</span><i class="fa-sharp fa-solid fa-arrow-up fa-rotate-90" ></i></div></div>
        <div @click="show('country','text',userinfo.country)"><span>国家</span><div><span>{{ userinfo.country }}</span><i class="fa-sharp fa-solid fa-arrow-up fa-rotate-90" ></i></div></div>
        <div @click="show('city','text',userinfo.city)"><span>城市</span><div><span>{{ userinfo.city }}</span><i class="fa-sharp fa-solid fa-arrow-up fa-rotate-90" ></i></div></div>
        <div @click="show('sex','text',userinfo.sex)"><span>性别</span><div><span>{{ userinfo.sex }}</span><i class="fa-sharp fa-solid fa-arrow-up fa-rotate-90" ></i></div></div>

    </div>
    <div class="change" v-show="isshow" >
        <input :type="type"  class="form-control" :placeholder="name" @change="getdata(type,$event)" :value="currentdata">
        <div class="sub">
            <button  class="btn btn-dark" @click="change">修改</button>&nbsp;
            <button  class="btn btn-light" @click="this.isshow=false">返回</button>
        </div>
        
    </div>
</template>
<script>
import Snav from '../../Snav.vue'
export default {
    name: 'Changeinfo',
    created() {
    this.getUserinfo()

  },
  data() {
    return {
      userinfo: {
        city: "-",
        country: "-",
        date_joined: "-",
        email: "-",
        is_active: false,
        is_staff: false,
        is_superuser: false,
        last_login: "-",
        last_update: "-",
        name: "请登录",
        phone: "-",
        photo: "/media/default/user.jpg",
        sex: "-",
        username: "-"
      },
      data:'',
      baseurl: this.$baseUrl,
      isshow:false,
      type:'text',
      name:'',
      currentdata:''
    }
  },
  methods: {
    change(){
        let token = localStorage.getItem('accessToken')
        let response = this.$http
          .post(this.$api.changeinfo, this.data,{
            headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' + token
          }
          })
          .then(response => {
            if (response.data.code === 200) {

            } else {

            } 
          })
          .catch(error => {

          });
        this.getUserinfo()
        this.isshow=false
    },
    getdata(type,event){
        if(type!='file'){
            const data=event.target.value
            const formData = new FormData();
            formData.append(this.name, data)
            this.data=formData
            console.log(this.data)
        }else{
            const file=event.target.files[0]
            const formData = new FormData();
            formData.append('photo', file)
            this.data=formData
        }
        
    },
    show(name,type,currentdata=''){
        this.currentdata=currentdata
        this.type=type
        this.name=name
        this.isshow=true
    },
    getUserinfo() {
      let token = localStorage.getItem('accessToken')
      if (token) {
        this.$http.get(this.$api.userinfo, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        })
          .then(response => {
            this.userinfo = response.data.data
            this.userinfo.is_login = true
          })
          .catch(error => {

          });
      } else {
        this.$nextTick(() => {

        })


      }
    }
  },
    
    components: {
        Snav
    }
};
</script>
<style lang="less" scoped>

.list{
    padding-top: 60px;
    input{
        height: 45px;
    }
    div{
        display: flex;
        padding: 0 15px;
        justify-content: space-between;
        background-color: white;
        min-height: 45px;
        align-items: center;
        
        div{
            color: gray;
            span{
                margin-right: 15px;
            }
        }
    }
}
.list>div{
    border-bottom: 1px rgba(175, 173, 173, 0.527) solid;
}
.change{
    
    padding-top: 60px;
    input{
        height: 40px;
    }
}

.sub{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}
</style>