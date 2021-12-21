<template>
  <div class="">
    角色列表
    <elTableCom :tableData="tableData" :tableColumn="tableColumn">
      <template v-slot:action="{ slotObj }">
        <div>
          <el-button
            type="primary"
            @click="
              dialogVisible = true,
              id = slotObj.id
            "
            >分配权限</el-button
          >
        </div>
      </template>
    </elTableCom>
    <setPermissions v-model="dialogVisible" :id="id" />
  </div>
</template>

<script setup>
import { roleList } from '@/api/user/list'
import { onMounted, ref } from 'vue'
import elTableCom from '@/components/elTableCom'
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
onMounted(async () => {
  const res = await roleList()
  tableData.value = res.data
})
</script>

<style lang="scss" scoped></style>
