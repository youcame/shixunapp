import type { ActionType } from '@ant-design/pro-components';
import {PageContainer, ProList} from '@ant-design/pro-components';
import {Badge, Button, message, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import CreateModal from "@/components/Modals/CreateModal";
import {TOTALDONATECOLUMN} from "@/constant";
import {addResourceUsingPOST, getResourceUsingGET} from "@/services/shixunapp/resourceController";
import {PlusOutlined} from "@ant-design/icons";

const renderBadge = (count: number, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

export default () => {
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('tab1');
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [formValue,setFormValue] = useState<API.ResourceVO[]>([]);
  const getFormInfo = async ()=>{
    const res = await getResourceUsingGET();
    setFormValue(res?.data || []);
  }

  const handleAdd = async (fields: API.ResourceVO) => {
    const hide = message.loading('处理捐赠中...');
    try {
      await addResourceUsingPOST({
        ...fields,
        id: 1,
      });
      hide();
      await getFormInfo();
      actionRef?.current?.reload()
      message.success('捐赠成功');
      if(createModalOpen)handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error("捐赠失败",error?.message);
      return false;
    }
  };
  useEffect(()=>{
    getFormInfo();
  },[])
  return (
    <PageContainer>
      <ProList<API.ResourceVO>
        rowKey="name"
        actionRef={actionRef}
        request={async () => ({
          data: formValue || {},
        })}
        dataSource={formValue}
        metas={{
          title: {
            dataIndex: 'id',
            valueType: 'select',
          },
          description: {
            key: 'desc',
          },
          content: {
            //dataIndex: 'id',
            render: (text,entity) => (
              <div
                key="label"
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Typography.Text style={{fontSize: "16px"}}>
                  <div>捐赠年数</div>
                  <div>
                    {entity.year}年
                  </div>
                </Typography.Text>
                <Typography.Text style={{fontSize: "16px"}}>
                  <div>捐赠月数</div>
                  <div>
                    {entity.month}月
                  </div>
                </Typography.Text>
                <Typography.Text style={{fontSize: "16px"}}>
                  <div>捐赠钱财数</div>
                  <div>
                    {entity.money}(元)
                  </div>
                </Typography.Text>
                <Typography.Text style={{fontSize: "16px"}}>
                  <div>捐赠物资数</div>
                  <div>
                    {entity.goods}(总数)
                  </div>
                </Typography.Text>
              </div>
            ),
          },
          actions: {
            render: (text, row) => [
              row.month + "月财报"
            ],
          },
        }}
        toolbar={{
          menu: {
            activeKey,
            items: [
              {
                key: '2023',
                label: (
                  <span>2023年{renderBadge(11, activeKey === 'tab1')}</span>
                ),
              },
              // {
              //   key: '2022',
              //   label: (
              //     <span>
              //       2022年{renderBadge(12, activeKey === 'tab2')}
              //     </span>
              //   ),
              // },
            ],
            onChange(key) {
              setActiveKey(key);
            },
          },
          search: {
            onSearch: (value: string) => {
              alert(value);
            },
          },
          actions: [
            <Button type="primary" key="primary" onClick={()=>handleModalOpen(true)}>
              <PlusOutlined /> 捐赠项目
            </Button>,
          ],
        }}
      />
      <CreateModal columns={TOTALDONATECOLUMN} onCancel={()=>{handleModalOpen(false)}} onSubmit={async (values:API.ResourceVO)=>{await handleAdd(values)}} visible={createModalOpen}/>
    </PageContainer>
  );
};
