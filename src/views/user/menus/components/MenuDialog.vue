<template>
  <div>
    <el-dialog
      :model-value="modelValue"
      title="菜单管理"
      width="60%"
      destroy-on-close
      @open="dialogOpen"
      @close="emitClose"
    >
      <el-form
        ref="dialogForm"
        :model="menuForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="menuForm.parentId"
            :options="menuData"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
          />
          <span>不选，则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuForm.menuType">
            <el-radio :label="'1'">菜单</el-radio>
            <el-radio :label="'2'">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuForm.menuType === '1'"
        >
          <el-input v-model="menuForm.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="menuForm.menuType === '1'"
        >
          <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuForm.menuType === '2'"
        >
          <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识" />
        </el-form-item>
        <el-form-item
          label="组件路径"
          prop="component"
          v-show="menuForm.menuType === '1'"
        >
          <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
        </el-form-item>
        <el-form-item
          label="菜单状态"
          prop="menuState"
          v-show="menuForm.menuType === '1'"
        >
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="'1'">正常</el-radio>
            <el-radio :label="'2'">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emitClose">取消</el-button>
          <el-button @click="saveRole" type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { menuOperate } from '@/api/user/manage'
const props = defineProps({
  modelValue: Boolean,
  action: String,
  menuData: Object,
  menuObj: {
    type: Object
  }
})
const emits = defineEmits('update:modelValue', 'refreshPage')
const dialogForm = ref(null)
const menuForm = ref({
  parentId: [null],
  menuType: '1',
  menuName: '',
  icon: '',
  path: '',
  menuCode: '',
  component: '',
  menuState: '1'
})
// 定义表单校验规则
const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    }
  ]
})
const emitClose = () => {
  menuForm.value = {
    parentId: [null],
    menuType: '1',
    menuName: '',
    icon: '',
    path: '',
    menuCode: '',
    component: '',
    menuState: '1'
  }
  emits('update:modelValue', false)
}
const dialogOpen = async () => {
  if (props.action === 'edit') {
    Object.keys(menuForm.value).forEach((item) => {
      menuForm.value[item] =
        typeof props.menuObj[item] === 'number'
          ? props.menuObj[item] + ''
          : props.menuObj[item]
    })
  }
  // 作回显
  if (props.menuObj.menuName && props.action === 'add') {
    menuForm.value.parentId = [
      ...props.menuObj?.parentId,
      props.menuObj?._id
    ].filter((item) => item)
  }
}
onMounted(async () => {})
const saveRole = () => {
  dialogForm.value.validate(async (val) => {
    if (!val) return
    const params = { action: props.action }
    if (props.action === 'edit') {
      params._id = props.menuObj._id
    }
    await menuOperate({
      ...menuForm.value,
      ...params
    })
    ElMessage.success('更新成功')
    emits('refreshPage')
    emitClose()
  })
}
</script>

<style scoped lang="scss"></style>
