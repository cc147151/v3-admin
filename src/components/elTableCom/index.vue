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
          <el-table-column :key="index" v-bind="item" :align="'center'"></el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  tableData: Array,
  tableColumn: Array
})
</script>
