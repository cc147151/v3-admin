<template>
  <div>
    <el-dialog
      :model-value="modelValue"
      title="角色管理"
      width="50%"
      destroy-on-close
      @open="dialogOpen"
      @close="emitClose"
    >
      <el-form :model="form" ref="roleForm" :rules="rules">
        <el-form-item label="职位" prop="roleName">
          <el-input v-model="form.roleName" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input type="textarea" autosize v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="emitClose">取消</el-button>
          <el-button @click="updateFun" type="primary">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive } from 'vue'
import { roleOperate } from '@/api/user/role'
import { ElMessage } from 'element-plus'
const props = defineProps({
  modelValue: Boolean,
  roleData: Object,
  action: String
})
const emits = defineEmits(['update:modelValue', 'getRoleList'])
const roleForm = ref(null)
const form = ref({
  roleName: '',
  remark: ''
})
const rules = reactive({
  roleName: [
    {
      required: true,
      message: '请输入职位',
      trigger: 'blur'
    }
  ],
  remark: [{ required: true, message: '请输入用户描述', trigger: 'blur' }]
})
const dialogOpen = async () => {
  if (props.roleData.roleName) {
    form.value.roleName = props.roleData.roleName
    form.value.remark = props.roleData.remark
  }
}

const emitClose = () => {
  form.value = {
    roleName: '',
    remark: ''
  }
  emits('update:modelValue', false)
}
const updateFun = () => {
  roleForm.value.validate(async (val) => {
    if (!val) return
    const params = { action: props.action }
    if (props.action === 'edit') {
      params._id = props.roleData._id
    }
    await roleOperate({
      ...form.value,
      ...params
    })
    ElMessage.success('更新成功')
    emits('getRoleList')
    emitClose()
  })
}
</script>

<style scoped lang="scss"></style>
