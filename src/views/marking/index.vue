<template>
  <div>活动管理
    <el-button @click="toDetail">去活动详情</el-button>

  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toDetail = () => {
  router.push('/marking/manageDetail')
}
</script>
