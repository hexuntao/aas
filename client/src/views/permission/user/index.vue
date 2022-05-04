<template>
  <div class="container">
    <a-card>
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item :label="'账号'">
                  <a-input
                    v-model="formModel.account"
                    :placeholder="'请输入账号'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="'手机号'">
                  <a-input
                    v-model="formModel.phone"
                    :placeholder="'请输入手机号'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="'状态'">
                  <a-select placeholder="请选择状态">
                    <a-option>使用中</a-option>
                    <a-option>已禁用</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 32px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <a-divider />

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
          <a-table-column :title="'头像'" data-index="avatar">
            <template #cell>
              <a-avatar> H </a-avatar>
            </template>
          </a-table-column>
          <a-table-column :title="'账号'" data-index="account" />
          <a-table-column :title="'手机号'" data-index="phone" />
          <a-table-column :title="'邮箱'" data-index="email" />
          <a-table-column :title="'角色'" data-index="role">
            <template #cell="{ record }">
              {{ record.role }}
            </template>
          </a-table-column>
          <a-table-column :title="'状态'" data-index="status">
            <template #cell="{ record }">
              <span v-if="record.status === 1" class="circle"></span>
              <span v-else class="circle pass"></span>
              <span v-if="record.status === 1">使用中</span>
              <span v-else>已禁用</span>
            </template>
          </a-table-column>
          <a-table-column :title="'注册时间'" data-index="createDate" />
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
      title="新建用户"
      @cancel="handleCancel"
      @before-ok="handleBeforeOk"
    >
      <a-form :model="formModel">
        <a-form-item field="account" label="账号">
          <a-input v-model="formModel.account" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="formModel.email" />
        </a-form-item>
        <a-form-item field="phone" label="手机号">
          <a-input v-model="formModel.phone" />
        </a-form-item>
        <a-form-item field="role" label="角色">
          <a-select v-model="formModel.role">
            <a-option :value="1">角色1</a-option>
            <a-option :value="2">角色2</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="avatar" label="头像">
          <a-upload
            action="/"
            :file-list="file ? [file] : []"
            :show-file-list="false"
            @change="onChange"
            @progress="onProgress"
          >
            <template #upload-button>
              <div
                :class="`arco-upload-list-item${
                  file && file.status === 'error'
                    ? ' arco-upload-list-item-error'
                    : ''
                }`"
              >
                <div
                  v-if="file && file.url"
                  class="arco-upload-list-picture custom-upload-avatar"
                >
                  <img :src="file.url" />
                  <div class="arco-upload-list-picture-mask">
                    <IconEdit />
                  </div>
                  <a-progress
                    v-if="file.status === 'uploading' && file.percent < 100"
                    :percent="file.percent"
                    type="circle"
                    size="mini"
                    :style="{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translateX(-50%) translateY(-50%)',
                    }"
                  />
                </div>
                <div v-else class="arco-upload-picture-card">
                  <div class="arco-upload-picture-card-text">
                    <IconPlus />
                    <div style="margin-top: 10px; font-weight: 600">Upload</div>
                  </div>
                </div>
              </div>
            </template>
          </a-upload>
        </a-form-item>

        <a-form-item field="status" label="状态">
          <a-radio-group v-model="formModel.status">
            <a-radio :value="1">开启</a-radio>
            <a-radio :value="0">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { getUserList } from '@/api/permission/user';
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

  const file = ref();

  const onChange = (_: any, currentFile: any) => {
    file.value = {
      ...currentFile,
    };
  };
  const onProgress = (currentFile: any) => {
    file.value = currentFile;
  };

  const generateFormModel = () => {
    return {
      id: '',
      account: '',
      phone: '',
      status: 1,
      avatar: '',
      email: '',
      role: 1,
      createDate: '',
      updateDate: '',
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

  const fetchData = async (params: any = { page: 1, limit: 20 }) => {
    setLoading(true);
    try {
      const { data } = await getUserList(params);
      console.log(data);
      renderData.value = data.list as any;
      pagination.page = params.current;
      pagination.total = data.pagination.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as any);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'PermissionUser',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
  }
</style>
