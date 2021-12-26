<template>
    <el-menu
      :uniqueOpened="true"
      :default-active="activeMenu"
      :background-color="$store.getters.cssVar.menuBg"
      :text-color="$store.getters.cssVar.menuText"
      :active-text-color="$store.getters.cssVar.menuActiveText"
      :collapse="$store.getters.sidebarOpened"
      router
    >
      <sidebar-item
        :route="item"
        v-for="item of menuRouters"
        :key="item.path"
      />
    </el-menu>
</template>
<script setup>
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
const menuRouters = computed(() => {
  return store.getters.menuRouters
})
</script>
