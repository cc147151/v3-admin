<template>
  <div>
    <el-dialog
      :model-value="modelValue"
      title="用户角色"
      width="30%"
      destroy-on-close
      @open="dialogOpen"
      @close="emitClose"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item of roleArr" :Key="item.id" :label="item.id">{{
          item.title
        }}</el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emitClose">取消</el-button>
          <el-button @click="saveRole" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { roleList, rolePerson, updateRole } from '@/api/user/manage'
const roleArr = ref([])
const checkList = ref([])
const props = defineProps({
  modelValue: Boolean,
  roleId: {
    type: [String, Number]
  }
})
const emits = defineEmits('update:modelValue')
onMounted(async () => {
  const res = await roleList()
  roleArr.value = res.data
})
const emitClose = () => {
  emits('update:modelValue', false)
  checkList.value = []
}
const dialogOpen = async () => {
  const res = await rolePerson(props.roleId)
  checkList.value = res.data.role.map((item) => item.id)
}
const saveRole = async () => {
  const roles = roleArr.value.filter((item) => {
    return checkList.value.includes(item.id)
  })
  await updateRole(props.roleId, { roles })
  ElMessage.success('更新成功')
  emitClose()
}
</script>

<style scoped lang="scss"></style>
