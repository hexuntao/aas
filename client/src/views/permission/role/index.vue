<template>
  <div class="container">
    <a-card>
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleClick">
              <template #icon>
                <icon-plus />
              </template>
              新增
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column :title="'名称'" data-index="name" />
          <a-table-column :title="'标识'" data-index="label" />
          <a-table-column :title="'备注'" data-index="remark" />
          <a-table-column :title="'创建时间'" data-index="createdAt" />
          <a-table-column
            :title="'操作'"
            align="center"
            data-index="operations"
          >
            <template #cell>
              <a-button type="text" size="small"> 编辑 </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:visible="visible"
      title="新建角色"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="formModel">
        <a-form-item field="name" label="名称">
          <a-input v-model="formModel.name" />
        </a-form-item>
        <a-form-item field="label" label="标识">
          <a-input v-model="formModel.label" />
        </a-form-item>
        <a-form-item field="remark" label="备注">
          <a-input v-model="formModel.remark" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';

  import useLoading from '@/hooks/loading';

  import { Pagination } from '@/types/global';
  import { addRole, getRoleList } from '@/api/role';

  const visible = ref(false);

  const handleClick = () => {
    visible.value = true;
  };

  const handleCancel = () => {
    visible.value = false;
  };

  const generateFormModel = () => {
    return {
      name: '角色1',
      remark: '备注信息1',
      label: 'asd',
    };
  };

  const { loading, setLoading } = useLoading(true);

  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const basePagination: Pagination = {
    page: 1,
    limit: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (params?: any) => {
    setLoading(true);
    try {
      const { data } = await getRoleList(params);
      renderData.value = data.list as any;
      pagination.page = params.page;
      pagination.total = data.pagination.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();

  const handleBeforeOk = async (done: any) => {
    console.log(generateFormModel());
    await addRole(generateFormModel());
  };
</script>

<script lang="ts">
  export default {};
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
  }
</style>
