<template>
  <div>
    <button @click="test">测试Message</button>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus'
const test = () => {
  ElMessage({
    showClose: true,
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
}
</script>
