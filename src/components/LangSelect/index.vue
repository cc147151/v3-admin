<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <el-tooltip content="国际化" placement="bottom" effect="light">
        <span class="el-dropdown-link">
          <el-icon size="20"><info-filled /></el-icon>
        </span>
      </el-tooltip>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="language === 'zh'" command="zh"
            >中文</el-dropdown-item
          >
          <el-dropdown-item :disabled="language === 'en'" command="en"
            >英语</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { InfoFilled } from '@element-plus/icons'
const i18n = useI18n()
const store = useStore()
const language = computed(() => store.getters.language)
const handleCommand = (command) => {
  i18n.locale.value = command
  store.commit('app/changeLanguage', command)
}
</script>
<style lang="scss" scoped></style>
