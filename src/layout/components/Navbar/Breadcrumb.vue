<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item of pathArr"
        :key="item.path"
        :to="{ path: item.path }"
        >{{item.meta.title}}</el-breadcrumb-item
      >
    </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const pathArr = computed(() => {
  return useRoute().matched.filter((item) => item.meta.title)
})
</script>
<style lang="scss" scoped>
.breadcrumb {
  margin-left: 20px;
}
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
