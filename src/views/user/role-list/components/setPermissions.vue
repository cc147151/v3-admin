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
        :data="menuData"
        :default-checked-keys="checkedKeys"
        show-checkbox
        default-expand-all
        node-key="_id"
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
import { menuList } from '@/api/user/manage'
import { setRolePermission } from '@/api/user/role'

import { defineProps, defineEmits, ref } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: Boolean,
  roleData: Object
})
const emits = defineEmits(['update:modelValue', 'getRoleList'])
const defaultProps = {
  children: 'children',
  label: 'menuName'
}
const tree = ref(null)
const menuData = ref([])
const checkedKeys = ref([])
const getChecked = async () => {
  console.log(tree.value.getCheckedNodes(false, true))
  await setRolePermission({
    _id: props.roleData._id,
    permissionList: {
      checkedKeys: tree.value.getCheckedKeys(true),
      menuCodeArr: tree.value
        .getCheckedNodes(true)
        .map((item) => item.menuCode),
      menu: tree.value
        .getCheckedNodes(false, true)
        .filter((item) => item.menuType === 1)
    }
  })
  emitClose()
  ElMessage.success('分配成功')
  emits('getRoleList')
}
const emitClose = () => {
  checkedKeys.value = []
  emits('update:modelValue', false)
}
const dialogOpen = async () => {
  checkedKeys.value = props.roleData?.permissionList?.checkedKeys || []
  const res = await menuList()
  menuData.value = res.data
}
</script>

<style scoped lang="scss"></style>
