<template>
    <Snav>
        <template v-slot:name>
            <slot name="formname"></slot>
        </template>
    </Snav>
    <div class="form" @submit="submitForm">
        <div id="formname" tag="div">
            <slot name="formname"></slot>
        </div>
        <form novalidate>
            <slot name="alert"></slot>
            <div class="form-group">
                <slot name="form"></slot>
            </div>

        </form>
    </div>
</template>
<script>
import '../../assets/css/form.css'
import Snav from '../Snav.vue'
export default {
    name: 'Form',
    props: {
        action: {
            type: Function,
            required: true
        },
    },
    methods: {
        async submitForm(event) {

            event.preventDefault();
            event.stopPropagation();

            // 使用Bootstrap的表单验证样式
            if (event.target.checkValidity()) {
                // 执行认证逻辑
                await this.action()

            } else {
                event.target.classList.add('was-validated');
            }
        },
    },
    components: {
        Snav
    }
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