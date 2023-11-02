import {LikeOutlined, MessageOutlined, PlusOutlined, StarOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, message, Space} from 'antd';
import {PageContainer, ProColumns} from "@ant-design/pro-components";
import {PAGESIZE} from "@/constant";
import CreateModal from "@/components/Modals/CreateModal";
import {addPostUsingPOST, listPostVOByPageUsingPOST} from "@/services/shixunapp/postController";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App: React.FC = () => {

  const [formValue,setFormValue] = useState<API.PostVO[]>();
  const [total,setTotal] = useState<number>(0)
  const getPostInfo =async (current=1,pageSize=PAGESIZE)=>{
    const res =await listPostVOByPageUsingPOST({
      current,
      pageSize,
      sortField: 'id',
      sortOrder: 'descend',
    });
    setTotal(res?.data?.total || 0);
    setFormValue(res?.data?.records);
  }
  useEffect(()=>{
    getPostInfo();
  },[])

  //新增新闻
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const newsColumn: ProColumns<API.PostVO>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入新闻标题",
        }]
      }
    },
    {
      title: '新闻标签',
      dataIndex: 'tags',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入新闻标签",
        }]
      }
    },
    {
      title: '新闻内容',
      hideInSearch: true,
      dataIndex: 'content',
      valueType: 'textarea',
      formItemProps: {
        rules: [{
          required: true,
          message: "请输入新闻内容",
        }]
      }
    },
  ]

  const handleAdd = async (fields: API.PostAddRequest) => {
    console.log("1",fields.tags);
    console.log("2",typeof fields.tags);
    const hide = message.loading('正在添加');
    if(fields.tags) fields.tags = [fields?.tags.toString()]
    try {
      await addPostUsingPOST({
        ...fields,
      });
      hide();
      message.success('添加成功');
      await getPostInfo();
      if(createModalOpen)handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error("添加失败",error?.message);
      return false;
    }
  };
  return(
    <PageContainer>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          total,
          pageSize: PAGESIZE,
          onChange: (page,pageSize) => {
            getPostInfo(page,pageSize);
          },
        }}
        dataSource={formValue}
        footer={
          <Button
            type={"primary"}
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined />发布新闻
          </Button>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text={String(item.favourNum)} key="list-vertical-star-o"/>,
              <IconText icon={LikeOutlined} text={String(item.thumbNum)} key="list-vertical-like-o"/>,
              <IconText icon={MessageOutlined} text="0" key="list-vertical-message"/>,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={item?.avatar}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item?.user?.userAvatar || ""}/>}
              title={<a>{item.title}</a>}
              description={item?.tagList}
            />
            {item.content}
          </List.Item>
        )}
      />
      <CreateModal columns={newsColumn} onCancel={()=>{handleModalOpen(false)}} onSubmit={async (values:API.PostAddRequest)=>{handleAdd(values)}} visible={createModalOpen}/>
    </PageContainer>
  );
};

export default App;
