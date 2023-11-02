import {LikeOutlined, MessageOutlined, PlusOutlined, StarOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, Space} from 'antd';
import {PageContainer} from "@ant-design/pro-components";
import {listPostVOByPageUsingPOST} from "../../services/shixunapp/postController";
import {NEWSAVATAR, PAGESIZE} from "@/constant";

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
    });
    setTotal(res?.data?.total || 0);
    setFormValue(res?.data?.records);
  }
  useEffect(()=>{
    getPostInfo();
  },[])

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
            // onClick={}
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
                src={NEWSAVATAR}
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
    </PageContainer>
  );
};

export default App;
