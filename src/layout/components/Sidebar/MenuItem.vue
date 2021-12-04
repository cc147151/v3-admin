<template>
    <el-icon :size="10"><User /></el-icon>
    <span>{{title}}</span>
</template>
<script setup>
import { defineProps } from 'vue'
import { User } from '@element-plus/icons'
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
