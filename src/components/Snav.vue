
<template>
    <div >
    <a @click="back"><i class="fa-sharp fa-solid fa-arrow-up fa-rotate-270" ></i></a><slot name="name"></slot>
    </div>
</template>
<script>
export default {
    name: 'Snav',
    methods:{
        back(){
            this.$router.back()
        }
    }
    
};
</script>
<style lang="less" scoped>
div{
    width: 100%;
    height: 45px;
    background-color: white;
    color:black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    box-shadow: 1px 4px 8px 0 #dee3e8;
    z-index: 100;
    top:0
}
div i{
    color: gray;
    margin-right: 25px;
    margin-left: 20px;
    

}
</style>