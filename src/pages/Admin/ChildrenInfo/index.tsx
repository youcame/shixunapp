import { PlusOutlined } from '@ant-design/icons';
import type{ ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import CreateModal from "@/components/Modals/CreateModal";
import UpdateModal from "@/components/Modals/UpdateModal";
import {
  addUserUsingPOST,
  deleteUserUsingPOST, listUserVOByPageUsingPOST,
  updateUserUsingPOST,
} from "@/services/shixunapp/userController";
import {useModel} from "@umijs/max";
import {history} from "@@/core/history";
import {addTaskUsingPOST} from "@/services/shixunapp/taskController";
import {USERPAGESIZE} from "@/constant";

const ChildrenInfo: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [createTaskModalOpen, handleTaskModalOpen] = useState<boolean>(false);

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserVO>();
  //分页
  const [formValue,setFormValue] = useState<API.UserVO[]>([]);
  const [total,setTotal] = useState<number>(0)
  const { initialState } = useModel('@@initialState');

  const getFormInfo = async (current=1,pageSize=USERPAGESIZE)=>{
    const res = await listUserVOByPageUsingPOST({
      current,
      pageSize,
      sortField: 'id',
      userRole: 'children',
    })
    setTotal(res?.data?.total || 0)
    setFormValue(res?.data?.records || []);
  }

  const handleAdd = async (fields: API.UserVO) => {
    const hide = message.loading('正在添加');
    try {
      await addUserUsingPOST({
        ...fields,
        userRole: "children",
      });
      hide();
      actionRef.current?.reload();
      message.success('添加成功');
      if(createModalOpen)handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error("添加失败",error?.message);
      return false;
    }
  };

  const handleTaskAdd = async (fields: API.TaskVO) => {
    const hide = message.loading('正在添加任务');
    if(!currentRow){
      return;
    }
    console.log(currentRow.id);
    try {
      await addTaskUsingPOST({
        ...fields,
        finishUserId: currentRow.id,
        types: 0,
        createUserId: initialState?.loginUser?.id,
      });
      hide();
      message.success('添加任务成功');
      if(createTaskModalOpen)handleTaskModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error("添加任务失败",error?.message);
      return false;
    }
  };


  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRow
   */
  const handleRemove = async (selectedRow: API.UserVO) => {
    const hide = message.loading('正在删除');
    if (!selectedRow) return true;
    try {
      await deleteUserUsingPOST({
        id: selectedRow.id,
      });
      hide();
      actionRef.current?.reload();
      message.success('删除成功');
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败",error?.message);
      return false;
    }
  };

  useEffect(()=>{
    getFormInfo();
  },[])

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.UserVO) => {
    if(!currentRow){
      return;
    }
    const hide = message.loading('更新中');
    try {
      await updateUserUsingPOST({
        id: currentRow.id,
        ...fields,
      });
      hide();
      message.success('更新成功');
      handleUpdateModalOpen(false);
      actionRef.current?.reload();
      return true;
    } catch (error) {
      hide();
      message.error('更新失败');
      return false;
    }
  };

  const taskColumn: ProColumns<API.TaskVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '任务名称',
      dataIndex: 'title',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入任务名称",
        }]
      }
    },
    {
      title: '任务内容',
      hideInTable:true,
      hideInSearch: true,
      dataIndex: 'content',
      valueType: 'textarea',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入任务内容",
        }]
      }
    },
  ]

  const columns: ProColumns<API.UserVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '账户名',
      dataIndex: 'userAccount',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入账户名",
        }]
      }
    },
    {
      title: '密码（8位以上不包含特殊字符）',
      hideInTable:true,
      hideInSearch: true,
      dataIndex: 'userPassword',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入密码",
        },{
          type: "string",
          min: 8,
          message: "密码小于8位",
        },
          {
            pattern: /^[a-zA-Z0-9]+$/,
            message: "不允许包含特殊字符",
          }]
      }
    },
    {
      title: '姓名',
      dataIndex: 'userName',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入姓名",
        }]
      }
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      hideInForm: true,
      valueEnum: {
        'admin': {
          text: '管理员',
          status: 'Success',
        },
        'children': {
          text: '儿童',
          status: 'Success',
        },
        'volunteer': {
          text: '志愿者',
          status: 'Success',
        },
        'donator': {
          text: '捐助者',
          status: 'Success',
        },
      },
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          color={"blue"}
          type={"link"}
          key="task"
          onClick={() => {
            // @ts-ignore
            handleTaskModalOpen(true);
          }}
        >
          发布学习任务
        </Button>,
        <Button
          color={"blue"}
          type={"link"}
          key="viewTask"
          onClick={() => {
            // @ts-ignore
            history.push(`/task/record?id=${record?.id}`)
          }}
        >
          查看任务
        </Button>,
        <Button
          color={"blue"}
          type={"link"}
          key="detail"
          onClick={() => {
            // @ts-ignore
            history.push(`/receive/record?childrenId=${record?.id}`)
          }}
        >
          详情
        </Button>,
        <a
          key="modify"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <Button
          type={"text"}
          danger={true}
          key="config"
          onClick={() => {
            handleRemove(record)
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.UserVO, API.PageParams>
        key="main"
        pagination={{
          total,
          pageSize: USERPAGESIZE,
          onChange: async (page,pageSize) => {
            await getFormInfo(page,pageSize);
          },
        }}
        headerTitle={'用户信息'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建用户
          </Button>,
        ]}
        request={async () => ({
          data: formValue || {},
        })}
        columns={columns}
        rowSelection={{
          onChange: () => {

          },
        }}
      />
      <UpdateModal
        columns={columns}
        onSubmit={async(values:API.UserVO)=>{handleUpdate(values)}}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        key="drawer"
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.userName && (
          <ProDescriptions<API.UserVO>
            column={2}
            title={currentRow?.userName}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.userName,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserVO>[]}
          />
        )}
      </Drawer>
      <CreateModal columns={columns} onCancel={()=>{handleModalOpen(false)}} onSubmit={async (values:API.UserVO)=>{handleAdd(values)}} visible={createModalOpen}/>
      <CreateModal columns={taskColumn} onCancel={()=>{handleTaskModalOpen(false)}} onSubmit={async (values:API.TaskVO)=>{handleTaskAdd(values)}} visible={createTaskModalOpen} file={true}/>
    </PageContainer>
  );
};
export default ChildrenInfo;
