<template>
  <div>
    <el-tooltip content="主题更换">
      <svg-icon
        icon="pifuzhuti"
        @click="themeDialog = true"
        size="30"
      ></svg-icon>
    </el-tooltip>
    <ThemeDialog v-model="themeDialog" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ThemeDialog from './ThemeDialog.vue'
const themeDialog = ref(false)
</script>
<style lang="scss" scoped></style>
