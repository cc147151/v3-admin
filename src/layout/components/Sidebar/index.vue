<template>
  <div class="">
    <h1>占位</h1>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import SidebarMenu from './SidebarMenu.vue'
const router = useRouter()
console.log(router.getRoutes())
</script>
