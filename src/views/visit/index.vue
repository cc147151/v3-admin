<template>
  <div>
    visit一级菜单
    <el-button @click="toVisitDetail">去visit详情页</el-button>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const toVisitDetail = () => {
  router.push('/visit/detail')
}
</script>

<style scoped lang="scss"></style>
