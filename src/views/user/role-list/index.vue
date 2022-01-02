<template>
  <div class="role">
    角色列表
    <ElTableCom
      :tableData="tableData"
      :tableColumn="tableColumn"
      :pagination="false"
    >
      <template v-slot:action="{ slotObj }">
        <div>
          <el-button
            type="primary"
            @click=";(dialogVisible = true), (id = slotObj.id)"
            >分配权限</el-button
          >
        </div>
      </template>
    </ElTableCom>
    <setPermissions
      v-model="dialogVisible"
      :id="id"
      @getRoleList="getRoleList"
    />
  </div>
</template>

<script setup>
import { roleList } from '@/api/user/list'
import { onMounted, ref } from 'vue'
import ElTableCom from '@/components/ElTableCom'
import setPermissions from './components/setPermissions.vue'
const tableColumn = [
  { prop: 'id', label: '序号' },
  { prop: 'title', label: '名称' },
  { prop: 'describe', label: '描述' },
  { prop: 'action', label: '操作', slot: 'action' }
]
const tableData = ref([])
// const tableColumn = ref(column)
const dialogVisible = ref(false)
const id = ref('')
onMounted(() => {
  getRoleList()
})
const getRoleList = async () => {
  const res = await roleList()
  tableData.value = res.data
}
</script>

<style lang="scss" scoped>
.role {
  padding-bottom: 20px;
  height: 100%;
}
</style>
