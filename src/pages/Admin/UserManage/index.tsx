import { ActionType, ProColumns, ProCoreActionType, ProTable } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { deleteUser, queryUser } from '@/services/ant-design-pro/api';
import {
  Button,
  Cascader,
  Form,
  Image,
  Input,
  InputNumber,
  Mentions,
  message,
  Modal,
  Select,
  TreeSelect,
} from 'antd';
import { DEFAULT_AVATAR } from '@/constants';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const AddUserModal = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <>
      <Button key="button" icon={<PlusOutlined />} onClick={showModal} type="primary">
        新建
      </Button>
      <Modal
        title={<strong>新增用户</strong>}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
      >
        <Form {...formItemLayout} style={{ maxWidth: 600 }}>
          <Form.Item
            label="Input"
            name="Input"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="InputNumber"
            name="InputNumber"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="TextArea"
            name="TextArea"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Mentions"
            name="Mentions"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Mentions />
          </Form.Item>

          <Form.Item
            label="Select"
            name="Select"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            label="Cascader"
            name="Cascader"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <Cascader />
          </Form.Item>

          <Form.Item
            label="TreeSelect"
            name="TreeSelect"
            rules={[{ required: true, message: 'Please input!' }]}
          >
            <TreeSelect />
          </Form.Item>
        </Form>
      </Modal>
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
    fixed: 'left',
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
    fixed: 'right',
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
