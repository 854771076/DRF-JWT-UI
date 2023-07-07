<template>
    <div class="tabbar">
        <ul>
            <slot name="item"></slot>
            <div class="active-bg"></div>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Tabber',

    methods: {

    },

}
</script>
<style lang="less" scoped>
.tabbar {
    /* 相对定位 */
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 65px;
    border-top: 1px solid #80808029;
    background: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(3px);
    /* border-radius: 25px; */
    box-shadow: inset 0 0 6px rgb(255 255 255 / 20%);


}

.icon {
    color: gray;
}

.tabbar ul {
    /* 让li横向显示 */
    display: flex;
    justify-content: space-evenly;
    padding: 0;
    margin: 0;

}

.tabbar ul li {
    list-style: none;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;

}


.tabbar ul li a {
    /* 弹性布局 水平+垂直居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    /* 垂直排列 */
    flex-direction: column;

    text-align: center;
}

.tabbar ul li a .icon {
    line-height: 70px;
    font-size: 30px;
    /* 过渡时间 */
    transition: 0.5s;
}

.tabbar ul li a .text {
    /* 绝对定位 */
    position: absolute;
    font-size: 12px;
    bottom: 13px;
    /* 设置过渡 */
    transition: 0.5s;
    /* 默认隐藏 */
    transform: scale(0);
}

.tabbar ul li.active a .icon {
    font-size: 23px;
    /* 图标上移 */
    transform: translateY(-10px);
    /* color: rgba(157, 28, 28, 0.837); */
    color: rgb(237 156 9 / 84%);
    ;
}

.tabbar ul li.active a .text {
    /* 选中,文字显示 */
    transform: scale(1);
    color: rgb(237 156 9 / 84%);
    ;
}

.active-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    /* --c,--cc为CSS中的自定义属性,通过var函数可对其调用 */
    background-color: var(--c);
    box-shadow: 0 10px 15px var(--cc);
    transition: 0.5s;
}

@media only screen and (max-width: 990px) {
    .chainInfo>div {
        width: 45%;
        height: 75px;
        margin-bottom: 15px;
    }

    .chainInfo {
        margin-bottom: 0;
    }

    .datas table {
        display: none;
    }

    .datas .main_flex {
        display: flex;

    }

    .datas {
        padding: 0;
        background: #fff;
        box-shadow: none;
    }

    .navbar-toggler-icon,
    .navbar-toggler {
        display: none;
    }
}

@media only screen and (min-width: 990px) {
    .datas table {
        display: table;
    }

    .datas .main_flex {
        display: none;
    }

    .datas {
        padding: 15px 10px;
        background: #fff;
        box-shadow: 1px 4px 8px 0 #dee3e8;
    }

    /* 隐藏下导航 */
    .tabbar {
        display: none;
    }
}
</style>