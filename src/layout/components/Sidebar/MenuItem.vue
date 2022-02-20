<template>
  <svg-icon v-if="meta.icon" :icon="meta.icon" :size="20"></svg-icon>
  <span>{{ meta.title }}</span>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  meta: {
    type: Object,
    required: true
  }
})
</script>
