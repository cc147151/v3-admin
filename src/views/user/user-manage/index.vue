<template>
  <div class="manage">
    <h3>用户列表</h3>
    <ElTableCom
      :tableColumn="tableColumn"
      :tableData="tableData"
      :total="total"
      @getData="getList"
      class="f1"
    >
      <template v-slot:avatar="{ slotObj }">
        <el-avatar :size="50" :src="slotObj.avatar"></el-avatar>
      </template>
      <template v-slot:role="{ slotObj }">
        <el-tag v-for="(item, index) of slotObj.role" :key="index">{{
          item.title
        }}</el-tag>
      </template>
      <template v-slot:action="{ slotObj }">
        <el-button type="text">查看</el-button>
        <el-button type="text" @click="editRole(slotObj._id)" v-permission:distributeRole
          >编辑</el-button
        >
        <el-button type="text" v-permission:removeUser>删除</el-button>
      </template>
    </ElTableCom>
    <EditRoleDialog v-model="roleVisible" :roleId="roleId" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ElTableCom from '@/components/ElTableCom'
import EditRoleDialog from './components/EditRoleDialog'
import { manageList } from '@/api/user/manage'
const tableColumn = [
  { prop: 'username', label: '姓名' },
  { prop: 'mobile', label: '联系方式' },
  { prop: 'avatar', label: '头像', slot: true },
  { prop: 'role', label: '角色', slot: true },
  { prop: 'openTime', label: '开通时间' },
  { prop: 'action', label: '操作', slot: true }
]
const tableData = ref([])
const total = ref(0)

//
const roleVisible = ref(false)
const roleId = ref('')
const getList = async (page = 1, size = 10) => {
  const res = await manageList({
    page,
    size
  })
  tableData.value = res.data.list
  total.value = res.data.total
}
const editRole = (id) => {
  roleId.value = id
  roleVisible.value = true
}
onMounted(() => {
  getList()
})
</script>
<style lang="scss" scoped>
.manage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .f1 {
    flex: 1;
  }
  ::v-deep .el-tag {
    margin-bottom: 5px;
  }
}
</style>
