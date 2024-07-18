import {
  ActionType,
  ProColumns,
  ProCoreActionType,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ModalForm,
  ProTable,
  ProForm,
} from '@ant-design/pro-components';
import React, { useRef } from 'react';
import { deleteUser, queryUser } from '@/services/ant-design-pro/api';
import { Button, Form, Image, message, Modal } from 'antd';
import { DEFAULT_AVATAR } from '@/constants';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const AddUserModal = () => {
  const [form] = Form.useForm<{ name: string; company: string }>();
  return (
    <>
      <ModalForm<{
        name: string;
        company: string;
      }>
        title="新建表单"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            新建表单
          </Button>
        }
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => console.log('run'),
        }}
        submitTimeout={2000}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values.name);
          message.success('提交成功');
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="签约客户名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
          />

          <ProFormText width="md" name="company" label="我方公司名称" placeholder="请输入名称" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText width="md" name="contract" label="合同名称" placeholder="请输入名称" />
          <ProFormDateRangePicker name="contractTime" label="合同生效时间" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            request={async () => [
              {
                value: 'chapter',
                label: '盖章后生效',
              },
            ]}
            width="xs"
            name="useMode"
            label="合同约定生效方式"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: '履行完终止',
              },
            ]}
            name="unusedMode"
            label="合同约定失效效方式"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="主合同编号" />
        <ProFormText name="project" disabled label="项目名称" initialValue="xxxx项目" />
        <ProFormText width="xs" name="mangerName" disabled label="商务经理" initialValue="启途" />
      </ModalForm>
    </>
  );
};

const showDelUserConfirm = (id: number, action: ProCoreActionType) => {
  confirm({
    title: <strong>删除用户</strong>,
    icon: <ExclamationCircleFilled />,
    content: '确定要删除该用户吗？',
    async onOk() {
      const res = await deleteUser(id);
      if (res) {
        message.success('删除成功');
        // 刷新页面
        await action.reload();
      } else {
        message.error('删除失败');
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const columns: ProColumns<API.User>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    width: 120,
    ellipsis: true,
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    copyable: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      // 如果有头像，就显示头像，否则显示默认头像
      <Image width={60} src={record.avatarUrl || DEFAULT_AVATAR} />
    ),
    search: false,
    width: 100,
    align: 'center',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '男',
      },
      1: {
        text: '女',
      },
    },
    filters: true,
    onFilter: true,
    width: 80,
    align: 'center',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '用户编号',
    dataIndex: 'userCode',
    copyable: true,
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '正常',
        status: 'Success',
      },
    },
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: (a, b) => (b.createTime > a.createTime ? 1 : -1),
  },
  {
    title: '用户权限',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '普通用户',
        status: 'default',
      },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
    filters: true,
    onFilter: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id as number);
        }}
      >
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <a
        key={record.id}
        onClick={() => {
          if (!action) {
            // 处理action为undefined的情况
            return;
          }
          showDelUserConfirm(record.id, action as ProCoreActionType<{}>);
        }}
        // 如果是管理员，则隐藏删除
        hidden={record.userRole === 1}
      >
        删除
      </a>,
      // <TableDropdown
      //   key="actionGroup"
      //   onSelect={() => action?.reload()}
      //   menus={[
      //     { key: 'copy', name: '复制' },
      //     { key: 'delete', name: '删除' },
      //   ]}
      // />,
    ],
  },
];

const UserManage: React.FC = (options?: { [p: string]: any }) => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.User>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={async (params, sort, filter) => {
        const userList = await queryUser();
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          // @ts-ignore
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户信息"
      toolBarRender={() => [AddUserModal()]}
      scroll={{ x: 1300 }}
    />
  );
};
export default UserManage;
