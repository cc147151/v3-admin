<template>
  <div style="width: 100%">
    <el-button @click="menuAction('add', {})">添加菜单</el-button>
    <el-table
      :data="menuData"
      style="width: 100%; margin-bottom: 20px"
      row-key="_id"
      border
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="item in columns"
        :key="item.prop"
      />
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <el-button
            @click="menuAction('add', scope.row)"
            type="primary"
            size="mini"
            v-if="scope.row.menuType == '1'"
            >新增</el-button
          >
          <el-button @click="menuAction('edit', scope.row)" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="handleDel(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <MenuDialog
      v-model="menuVisible"
      :action="action"
      :menuData="menuData"
      :menuObj="menuObj"
      @refreshPage="getMenuList"
    />
  </div>
</template>

<script setup>
import { formatTime } from '@/utils'
import { menuList, menuOperate } from '@/api/user/manage'
import { ref, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import MenuDialog from './components/MenuDialog'
const columns = ref([
  {
    label: '菜单名称',
    prop: 'menuName',
    width: 150
  },
  {
    label: '图标',
    prop: 'icon'
  },
  {
    label: '菜单类型',
    prop: 'menuType',
    formatter(row, column, value) {
      return {
        1: '菜单',
        2: '按钮'
      }[value]
    }
  },
  {
    label: '权限标识',
    prop: 'menuCode'
  },
  {
    label: '路由地址',
    prop: 'path'
  },
  {
    label: '组件路径',
    prop: 'component'
  },
  {
    label: '菜单状态',
    prop: 'menuState',
    width: 90,
    formatter(row, column, value) {
      return {
        1: '正常',
        2: '停用'
      }[value]
    }
  },
  {
    label: '创建时间',
    prop: 'createTime',
    formatter(row, column, value) {
      return formatTime(value)
    }
  }
])
const menuVisible = ref(false)
const action = ref('')
const menuData = ref([])
const menuObj = ref({})
onMounted(async () => {
  getMenuList()
})
const getMenuList = async () => {
  const res = await menuList()
  menuData.value = res.data
}
const menuAction = (type, data = {}) => {
  action.value = type
  menuObj.value = data
  menuVisible.value = true
}
const handleDel = async (_id) => {
  await ElMessageBox.confirm('您确定要删除吗?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await menuOperate({ action: 'delete', _id })
      getMenuList()
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss"></style>
