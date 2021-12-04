<template>
  <div class="">
    <div class="logoBox">
      <el-avatar shape="square" :size="50" :src="logo"></el-avatar>
      <span>欢迎光临</span>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import SidebarMenu from './SidebarMenu.vue'
const logo = require('@/assets/logo.png')
</script>
<style lang="scss" scoped>
.logoBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
