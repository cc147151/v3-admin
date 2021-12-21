<template>
  <div>
    <el-dialog
      :model-value="modelValue"
      title="Tips"
      width="30%"
      destroy-on-close
      @open="dialogOpen"
      @close="emitClose"
    >
      <el-tree
        ref="tree"
        :data="treeData"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
        node-key="id"
        check-strictly
        :expand-on-click-node="false"
        check-on-click-node
        highlight-current
        :props="defaultProps"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emitClose">取消</el-button>
          <el-button @click="getChecked" type="primary">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { permissionList, rolePermission, setPermission } from '@/api/user/list'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: Boolean,
  id: String
})
const emits = defineEmits(['update:modelValue'])
console.log(emits)
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}
const tree = ref(null)
const treeData = ref([])
const checkedKeys = ref([])
const getChecked = async () => {
  console.log(tree.value.getCheckedKeys())
  await setPermission({
    permissions: tree.value.getCheckedKeys(),
    roleId: props.id
  })
  emitClose()
  ElMessage.success('分配成功')
}
const emitClose = () => {
  checkedKeys.value = []
  emits('update:modelValue', false)
}
const dialogOpen = async () => {
  const permission = await permissionList()
  const res = await rolePermission(props.id)
  checkedKeys.value = res.data
  treeData.value = permission.data
}
</script>

<style scoped lang="scss"></style>
