<template>
  <div class="navbar">
    <div class="navLeft">
      <el-icon @click="sidebarOpenedFun" size="25" class="iconExpand">
        <expand v-show="$store.getters.sidebarOpened" />
        <fold v-show="!$store.getters.sidebarOpened" />
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="right-menu">
      <Theme />
      <LangSelect class="mr20"/>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
            fit="cover"
          ></el-avatar>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>课程主页</el-dropdown-item>
            </a>
            <el-dropdown-item @click="loginOut" divided>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { Expand, Fold } from '@element-plus/icons'
import store from '@/store'
import Breadcrumb from './Breadcrumb.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import Theme from '@/components/Theme/index.vue'
const loginOut = () => {
  store.dispatch('user/loginOut')
}
const sidebarOpenedFun = () => {
  store.dispatch('app/changeSideBarOpened')
}
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .navLeft {
    display: flex;
    align-items: center;
    .iconExpand {
      cursor: pointer;
    }
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none !important;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
