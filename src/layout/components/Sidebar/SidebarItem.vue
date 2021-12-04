<template>
  <!-- 渲染 item 项 -->
  <el-sub-menu
    v-if="route.children && route.children.length > 0"
    :index="route.path"
  >
    <template #title>
      <menu-item :title="route.meta.title"></menu-item>

    </template>
    <!-- 循环渲染 -->
    <sidebar-item
      v-for="item in route.children"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta && route.meta.title"></menu-item>
  </el-menu-item>
</template>
<script setup>
import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>
