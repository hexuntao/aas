<template>
  <Card>
    <Tabs
      v-model:activeKey="activeKey"
      tab-position="left"
      :style="{ height: '200px' }"
      @tabScroll="callback"
    >
      <Tabs.TabPane v-for="i in 3" :key="i" :tab="`Tab-${i}`">Content of tab {{ i }}</Tabs.TabPane>
    </Tabs>
  </Card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card, Tabs } from 'ant-design-vue';
  import type { TabsProps } from 'ant-design-vue';

  defineOptions({
    name: 'accountSetting',
  });

  const activeKey = ref(1);
  const callback: TabsProps['onTabScroll'] = (val) => {
    console.log(val);
  };
</script>
