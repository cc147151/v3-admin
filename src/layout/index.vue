<template>
  <div
    :class="['app-wrapper', $store.getters.sidebarOpened ? 'hideSidebar' : '']"
  >
    <sidebar
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <div class="main-container">
        <div class="fixed-header">
          <navbar />
        </div>
      <app-main />
    </div>
  </div>
</template>
<script setup>
import variables from '@/styles/variables.scss'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import AppMain from './components/AppMain'
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}
.hideSidebar {
  .fixed-header {
    width: calc(100% - #{$hideSideBarWidth});
  }
}
</style>
