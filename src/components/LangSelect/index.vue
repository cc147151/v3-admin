<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <el-tooltip :content="$t('message.currentLanguage')" placement="bottom" effect="light">
        <span class="el-dropdown-link">
          <el-icon size="20"><info-filled /></el-icon>
        </span>
      </el-tooltip>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language === 'zh'" command="zh">{{
            $t('message.zhTitle')
          }}</el-dropdown-item>
          <el-dropdown-item :disabled="language === 'en'" command="en">{{
            $t('message.enTitle')
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { InfoFilled } from '@element-plus/icons'
const i18n = useI18n()
const store = useStore()
const language = computed(() => store.getters.language)
const handleCommand = (command) => {
  i18n.locale.value = command
  store.commit('app/changeLanguage', command)
  ElMessage(i18n.t('message.toastMessage'))
}
</script>
<style lang="scss" scoped></style>
