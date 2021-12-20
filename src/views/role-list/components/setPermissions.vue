<template>
  <div>
    <el-dialog
      :model-value="modelValue"
      title="Tips"
      width="30%"
      @open="dialogOpen"
      @close="emitClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emitClose">Cancel{{ id }}</el-button>
          <el-button type="primary">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { setPermission } from '@/api/user/list'
const props = defineProps({
  modelValue: Boolean,
  id: String
})
const emits = defineEmits(['update:modelValue'])
console.log(emits)
const emitClose = () => {
  emits('update:modelValue', false)
}
const dialogOpen = async () => {
  console.log(props)
  const res = await setPermission(props.id)
  console.log(res)
}
</script>

<style scoped lang="scss"></style>
