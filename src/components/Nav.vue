<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid" >
            <strong class="navbar-brand">
                <slot name="logo"></slot>
            </strong>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/">首页</a>
                        </li>
                    -->     
                    <slot name="item"></slot>
                </ul>
                <ul class="navbar-nav d-flex">
                    <slot name="userinfo"></slot>
                    
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>

export default {
  name: 'Nav',
  
}
</script>

<style lang="less" scoped>

</style>