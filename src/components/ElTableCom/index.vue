<template>
  <div class="elTableCom" style="width: 100%">
    <div class="tableBox">
      <el-table
        :data="tableData"
        border
        stripe
        height="100%"
        style="width: 100%"
      >
        <template v-for="(item, index) of tableColumn">
          <template v-if="item.slot">
            <el-table-column :key="index" v-bind="item" :align="'center'">
              <template #default="scope">
                <slot :name="item.prop" :slotObj="scope.row" />
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              :key="index"
              v-bind="item"
              :align="'center'"
            ></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination" v-if="pagination">
      <el-pagination
        :currentPage="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
/*
  @fun:
    getData 用来获取数据，外部可不使用该函数来发送请求(因为page页只可通过内部改变)，可以使用ref调用refreshPage
    refreshPage 通过ref直接调用更新某一页数据(传入要更新的page页),不传参数则视为更新当前页
*/
import { defineProps, defineEmits, ref, defineExpose } from 'vue'
console.warn('表格父组件的根元素添加height:100%')

defineProps({
  tableData: Array,
  tableColumn: Array,
  total: Number,
  pagination: {
    type: [String, Boolean],
    default: true
  }
})
const emits = defineEmits(['getData'])
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizes = ref([10, 20, 30])
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  emits('getData', currentPage.value, pageSize.value)
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  emits('getData', currentPage.value, pageSize.value)
}
const refreshPage = (reset = '') => {
  if (reset) {
    currentPage.value = reset
  }
  emits('getData', currentPage.value, pageSize.value)
}
defineExpose({
  refreshPage
})
</script>
<style lang="scss" scoped>
.elTableCom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
  .tableBox {
    flex: 1;
    overflow-y: hidden;
  }
  .h100 {
    height: 100%;
    // overflow-y: auto;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    flex-shrink: 0;
    height: 50px;
    align-items: flex-end;
  }
  ::v-deep .el-table th.gutter {
    display: table-cell !important;
  }
  // ::v-deep .el-table::before {
  //   height: 0;
  // }
}
</style>
