<template>
  <el-icon v-if="isElementIcon" :size="size" :color="color">
    <component :is="elIconName"></component>
  </el-icon>
  <svg v-else class="svg" aria-hidden="true" :style="style">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed, defineProps } from 'vue'
const props = defineProps({
  icon: String,
  size: [String, Number],
  color: () => String
})
const isElementIcon = computed(() => /^[e|E]l-/.test(props.icon))
const iconName = computed(() => `#icon-${props.icon}`)
const elIconName = computed(() => props.icon.substr(2))
const style = computed(() => {
  return {
    ...(props.size ? { 'font-size': `${props.size}px` } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>

<style scoped lang="scss">
.svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
  // color: blue;
}
</style>
