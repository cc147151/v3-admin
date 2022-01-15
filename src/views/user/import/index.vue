<template>
  <div class="import">
    <header>导入excel文件</header>
    <upload-excel :beforeUpload="beforeUpload" :uploadSuccess="uploadSuccess" />
    <el-button @click="save" v-if="tableColumn.length > 0">确定上传</el-button>
    <el-table
      v-if="tableColumn.length > 0"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UploadExcel from '@/components/UploadExcel'
import { USER_RELATIONS, formatDate } from './utils'
import { isExcel } from '@/utils'
import { userBatchImport } from '@/api/user/manage'
import { ElMessage } from 'element-plus'
const router = useRouter()
const paramsData = ref('')
const tableColumn = ref([])
const tableData = ref([])
const getFormatData = (data) => {
  console.log(data)
  const arr = []
  data.forEach((item) => {
    const obj = {}
    Object.keys(item).forEach((key) => {
      obj[USER_RELATIONS[key]] = item[key]
      USER_RELATIONS[key] === 'openTime' &&
        (obj[USER_RELATIONS[key]] = formatDate(item[key]))
    })
    arr.push(obj)
  })
  return arr
}
const beforeUpload = (file) => {
  if (isExcel(file.name)) return true
  return false
}
const uploadSuccess = async (data) => {
  paramsData.value = getFormatData(data.results)
  // 预览
  tableColumn.value = data.header.map((item) => ({ prop: item, label: item }))
  tableData.value = data.results
}
const save = async (data) => {
  try {
    await userBatchImport(paramsData.value)
    ElMessage.success('导入成功')
    router.back()
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
.import {
  // height: 100%;
  // display: flex;
  // flex-direction: column;
  // .f1 {
  //   flex: 1;
  // }
}
</style>
