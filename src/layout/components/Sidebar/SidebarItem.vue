<template>
  <!-- 渲染 item 项 -->
  <el-sub-menu
    v-if="route.children && route.children.length > 0 && !route.hidden"
    :index="route.path"
  >
    <template #title>
      <menu-item :title="route.meta && route.meta.title"></menu-item>
    </template>
    <!-- 循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <div v-else>
    <el-menu-item v-if="!route.hidden" :index="route.path">
      <!-- <menu-item :title="route.meta && route.meta.title"></menu-item> -->
      <el-icon :size="10"><User /></el-icon>
      <template #title>{{ route.meta.title }}</template>
    </el-menu-item>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'
import { User } from '@element-plus/icons'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
