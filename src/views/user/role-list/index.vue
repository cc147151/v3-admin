<template>
  <div class="role">
    <div>
      <p>角色列表(test用户不展示分配权限)</p>
      <el-button
        type="primary"
        @click=";(action = 'add'), (roleData = {}), (roleVisible = true)"
        >添加角色</el-button
      >
    </div>
    <!--  -->
    <ElTableCom
      ref="elTableCom"
      :tableData="tableData"
      :tableColumn="tableColumn"
      :pagination="true"
      :total="total"
      @getData="getRoleList"
      class="f1"
      :heightStyle="{ height: '100%' }"
    >
      <template v-slot:createTime="{ slotObj }">
        <div>
          <span>{{ formatTime(slotObj.createTime) }}</span>
        </div>
      </template>
      <template v-slot:action="{ slotObj }">
        <div>
          <el-button
            type="primary"
            @click="
              ;(roleVisible = true), (action = 'edit'), (roleData = slotObj)
            "
            >编辑</el-button
          >
          <el-button
            v-permission:user:role:edit
            type="primary"
            @click=";(dialogVisible = true), (roleData = slotObj)"
            >分配权限</el-button
          >
          <el-button type="primary" @click="deleteRole(slotObj._id)"
            >删除</el-button
          >
        </div>
      </template>
    </ElTableCom>
    <setPermissions
      v-model="dialogVisible"
      :roleData="roleData"
      @getRoleList="getRoleList"
    />
    <RoleActionDialog
      v-model="roleVisible"
      :action="action"
      :roleData="roleData"
      @getRoleList="refreshPage"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { formatTime } from '@/utils'
import { roleList, roleOperate } from '@/api/user/role'

import ElTableCom from '@/components/ElTableCom'
import setPermissions from './components/setPermissions'
import RoleActionDialog from './components/RoleActionDialog'

import { ElMessageBox, ElMessage } from 'element-plus'

const tableColumn = [
  { prop: '_id', label: '序号' },
  { prop: 'roleName', label: '职位' },
  { prop: 'remark', label: '描述' },
  { prop: 'createTime', label: '创建时间', slot: 'createTime' },
  { prop: 'action', label: '操作', slot: 'action' }
]
const elTableCom = ref(null)
const total = ref(0)
const tableData = ref([])
const dialogVisible = ref(false)
const roleVisible = ref(false)
const roleData = ref({})
const action = ref('')
onMounted(() => {
  refreshPage(1)
})
const getRoleList = async (page = 1, size = 10) => {
  const res = await roleList({
    pageNum: page,
    pageSize: size
  })
  tableData.value = res.data.list
  total.value = res.data.page.total
}
const refreshPage = (page = '') => {
  elTableCom.value.refreshPage(page)
}
const deleteRole = (_id) => {
  ElMessageBox.confirm('您确定要删除吗?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await roleOperate({ action: 'delete', _id })
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      refreshPage()
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.role {
  padding-bottom: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .f1 {
    flex: 1;
  }
}
</style>
