<template>
  <div class="elTable" style="width: 100%">
    <el-table :data="tableData" border stripe style="width: 100%">
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
    <el-pagination
      :currentPagee="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'
defineProps({
  tableData: Array,
  tableColumn: Array,
  total: Number
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
</script>
