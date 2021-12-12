<template>
  <div class="" @click="changeBgc">个人中心</div>
</template>

<script setup>
import {} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const changeBgc = () => {
  store.commit('app/changeCssVar', { key: 'menuBg', value: 'red' })
}
</script>

<style lang="scss" scoped></style>
