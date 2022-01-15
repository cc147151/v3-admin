<template>
  <div class="manage">
    <h3 @click="refreshPage(1)">用户列表</h3>
    <el-card class="box-card">
      <div class="card-header">
        <el-button class="button" @click="toImport">excel导入</el-button>
      </div>
    </el-card>
    <el-button type="primary" style="width: 100px" @click="addRole"
      >新增用户</el-button
    >
    <ElTableCom
      ref="elTableCom"
      :tableColumn="tableColumn"
      :tableData="tableData"
      :total="total"
      @getData="getList"
      class="f1"
    >
      <template v-slot:avatar="{ slotObj }">
        <el-avatar :size="50" :src="slotObj.avatar"></el-avatar>
      </template>
      <!-- <template v-slot:roleList="{ slotObj }">
        <el-tag v-for="(item, index) of slotObj.roleList" :key="index">{{
          item.title
        }}</el-tag>
      </template> -->
      <template v-slot:createTime="{ slotObj }">
        <span>{{ formatTime(slotObj.createTime) }}</span>
      </template>
      <template v-slot:action="{ slotObj }">
        <el-button type="text">查看</el-button>
        <el-button
          type="text"
          @click="editRole(slotObj)"
          v-permission:distributeRole
          >编辑</el-button
        >
        <el-button
          type="text"
          @click="deleteFun(slotObj.userId)"
          v-permission:removeUser
          >删除</el-button
        >
      </template>
    </ElTableCom>
    <EditRoleDialog
      v-model="roleVisible"
      :roleObj="roleObj"
      :action="action"
      @refreshPage="refreshPage"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ElTableCom from '@/components/ElTableCom'
import EditRoleDialog from './components/EditRoleDialog'
import { manageList, deleteRole } from '@/api/user/manage'
import { formatTime } from '@/utils'
import { ElMessageBox, ElMessage } from 'element-plus'
const router = useRouter()
const tableColumn = [
  { prop: 'userName', label: '姓名' },
  { prop: 'mobile', label: '联系方式' },
  // { prop: 'avatar', label: '头像', slot: true },
  // { prop: 'role', label: '角色', slot: true },
  { prop: 'job', label: '岗位' },
  { prop: 'createTime', label: '开通时间', slot: true },
  { prop: 'action', label: '操作', slot: true }
]
const elTableCom = ref(null)
const tableData = ref([])
const total = ref(0)
const roleVisible = ref(false)
const roleObj = ref({})
const action = ref('add')
onMounted(() => {
  refreshPage(1)
})
const getList = async (page = 1, size = 10) => {
  const res = await manageList({
    pageNum: page,
    pageSize: size,
    // userName: 'test',
    state: 1 // 在职
  })
  tableData.value = res.data.list
  total.value = res.data.page.total
}
const refreshPage = (page = '') => {
  elTableCom.value.refreshPage(page)
}
const addRole = () => {
  roleObj.value = {}
  action.value = 'add'
  roleVisible.value = true
}
const editRole = (slotObj) => {
  roleObj.value = slotObj
  action.value = 'edit'
  roleVisible.value = true
}
const toImport = () => {
  router.push('/user/import')
}
const deleteFun = async (userId) => {
  await ElMessageBox.confirm('您确定要删除吗?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await deleteRole({ userIds: userId })
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  refreshPage()
}
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
  .box-card {
    margin-bottom: 20px;
    .card-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
