<template>
  <div>
    <el-dialog
      :model-value="modelValue"
      title="用户管理"
      width="60%"
      destroy-on-close
      @open="dialogOpen"
      @close="emitClose"
    >
      <el-form
        ref="dialogForm"
        :model="userForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userForm.userName"
            :disabled="action == 'edit'"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userForm.userEmail"
            :disabled="action == 'edit'"
            placeholder="请输入用户邮箱"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="userForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="userForm.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            style="width: 100%"
          ></el-cascader>
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
import { updateRole, deptAllList } from '@/api/user/manage'
import { roleAllList } from '@/api/user/role'
const props = defineProps({
  modelValue: Boolean,
  action: String,
  roleObj: {
    type: Object
  }
})
const emits = defineEmits('update:modelValue', 'refreshPage')
const roleList = ref([])
const dialogForm = ref(null)
const deptList = ref([])
const userForm = reactive({
  userName: '',
  userEmail: '',
  mobile: '',
  job: '',
  state: '',
  roleList: [],
  deptId: ''
})
// 定义表单校验规则
const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    }
  ],
  userEmail: [{ required: true, message: '请输入用户邮箱', trigger: 'blur' }],
  mobile: [
    {
      pattern: /1[3-9]\d{9}/,
      message: '请输入正确的手机号格式',
      trigger: 'blur'
    }
  ],
  deptId: [
    {
      required: true,
      message: '请输入用户邮箱',
      trigger: 'blur'
    }
  ]
})
const emitClose = () => {
  Object.keys(userForm).forEach((item) => {
    userForm[item] = ''
  })
  emits('update:modelValue', false)
}
const dialogOpen = () => {
  if (props.action === 'edit' && props.roleObj) {
    Object.keys(userForm).forEach((item) => {
      userForm[item] = props.roleObj[item]
    })
  }
}
onMounted(async () => {
  const res = await roleAllList()
  const dept = await deptAllList()
  roleList.value = res.data.list
  deptList.value = dept.data
})
const saveRole = () => {
  dialogForm.value.validate(async (val) => {
    if (!val) return
    await updateRole({
      ...userForm,
      action: props.action,
      userId: props.roleObj.userId
    })
    ElMessage.success('更新成功')
    emits('refreshPage')
    emitClose()
  })
}
</script>

<style scoped lang="scss"></style>
