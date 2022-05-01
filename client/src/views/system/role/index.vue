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
          <a-table-column :title="'备注'" data-index="remark" />
          <a-table-column :title="'创建时间'" data-index="createDate" />
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

  const visible = ref(false);

  const handleClick = () => {
    visible.value = true;
  };
  const handleBeforeOk = (done: any) => {
    window.setTimeout(() => {
      done();
      // prevent close
      // done(false)
    }, 1000);
  };
  const handleCancel = () => {
    visible.value = false;
  };

  const generateFormModel = () => {
    return {
      name: '',
      remark: '',
    };
  };
  const { loading, setLoading } = useLoading(true);

  const renderData = ref<any[]>([]);
  const formModel = ref(generateFormModel());
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (params: any = { current: 1, pageSize: 20 }) => {
    setLoading(true);
    try {
      const { data } = {
        data: {
          list: [
            {
              id: 1,
              name: '角色名称',
              remark: '备注信息',
              createDate: '2020-02-02 02:02:02',
            },
            {
              id: 2,
              name: '角色名称',
              remark: '备注信息',
              createDate: '2020-02-02 02:02:02',
            },
          ],
          total: 1,
        },
      };
      renderData.value = data.list as any;
      pagination.current = params.current;
      pagination.total = data.total;
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
</script>

<script lang="ts">
  export default {};
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
  }
</style>
