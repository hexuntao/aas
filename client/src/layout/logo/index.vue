<template>
  <div class="logo">
    <div class="title">AAS</div>
  </div>
</template>

<script setup>
  defineProps({
    collapsed: {
      type: Boolean,
    },
  });
</script>

<style lang="less" scoped>
  .logo {
    @apply flex overflow-hidden whitespace-nowrap items-center;

    height: 64px;
    padding-left: 24px;
    line-height: 64px;
    .title {
      @apply mb-0 text-xl;
      color: @primary-color;
      font-weight: 800;
    }
  }
</style>
