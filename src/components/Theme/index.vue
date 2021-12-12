<template>
  <div>
    <el-tooltip content="主题更换">
      <el-icon @click="themeDialog=true" class="mr20" size="20"><Tools /></el-icon>
    </el-tooltip>
    <ThemeDialog v-model="themeDialog" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Tools } from '@element-plus/icons'
import ThemeDialog from './ThemeDialog.vue'
const themeDialog = ref(false)
</script>
