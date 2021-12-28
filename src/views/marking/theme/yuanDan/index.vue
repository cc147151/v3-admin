<template>
  <div>
    元旦
    <el-button @click="toDetail">去活动详情</el-button>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toDetail = () => {
  router.push('/marking/theme/detail')
}
</script>

<style scoped lang="scss"></style>
