<script lang="ts" setup>
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div class="main-layout">
    <Header class="main-layout__header"/>
    <main class="main-layout__main">
      <slot/>
    </main>
    <Footer class="main-layout__footer"/>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  &__main {
    flex-grow: 1;
  }

  &__header {
    position:fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
  }
}
</style>