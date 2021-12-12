<template>
  <div>
    <el-dialog
      :before-close="cancel"
      :model-value="modelValue"
      title="Tips"
      width="40%"
    >
      <div>
        <h3 @click="testFun">修改menu背景色</h3>
        <el-color-picker v-model="menuBg" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reset">恢复出厂背景</el-button>
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="handleOk">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { useStore } from 'vuex'
import { setItem } from '@/utils/storage.js'
import { STORAGEVARIABLES } from '@/constant'
import variables from '@/styles/variables.scss'
const store = useStore()
const menuBg = computed({
  get() {
    return store.getters.cssVar.menuBg
  },
  set(value) {
    store.commit('app/changeCssVar', { key: 'menuBg', value })
  }
})
// menuBg.value是字符串，脱离了响应式
let oldMenuBg = menuBg.value
defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])
// 取消
const cancel = () => {
  store.commit('app/changeCssVar', { key: 'menuBg', value: oldMenuBg })
  emit('update:modelValue', false)
}
const reset = () => {
  menuBg.value = variables.menuBg
}
const handleOk = () => {
  // 更新旧值
  oldMenuBg = menuBg.value
  setItem(
    STORAGEVARIABLES,
    JSON.stringify({
      menuBg: menuBg.value
    })
  )
  emit('update:modelValue', false)
}
</script>
