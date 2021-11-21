<template>
  <div class="login-container">
    <div class="login">
      <h3>用户登录</h3>
      <el-form :model="form" :rules="loginRules" ref="loginRef">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号">
            <template #prefix>
              <div class="nameIcon">
                <el-icon><user /></el-icon>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <div class="nameIcon">
                <el-icon><lock /></el-icon>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="toLogin" style="width: 100%"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { User, Lock } from '@element-plus/icons'

const store = useStore()
const loginRef = ref(null)
const loginRules = ref({
  username: [
    {
      required: true,
      message: 'Please input Activity username',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input Activity password',
      trigger: 'blur'
    }
  ]
})
const form = ref({ username: '', password: '' })
const toLogin = () => {
  loginRef.value.validate((valid) => {
    if (!valid) {
      return
    }
    store.dispatch('user/login', form.value)
  })
}
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;
.login-container {
  min-height: 100%;
  background-color: $bg;
  display: flex;
  justify-content: center;
  .login {
    width: 520px;
    display: flex;
    flex-direction: column;

    h3 {
      text-align: center;
      margin-top: 150px;
      margin-bottom: 50px;
      font-size: 30px;
      color: #fff;
    }
    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    ::v-deep .el-input {
      // display: inline-block;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 30px;
        color: $light_gray;
        // height: 47px;
        caret-color: $cursor;
      }
    }
    .nameIcon {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
