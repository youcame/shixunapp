import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Image, message, Radio} from 'antd';
import type { RadioChangeEvent, DescriptionsProps } from 'antd';
import {useLocation, useModel} from "@@/exports";
import {getUserVOByIdUsingGET} from "@/services/shixunapp/userController";
import {formatDate} from "../../../utils/timeUtil";
import {PoundCircleTwoTone} from "@ant-design/icons";
import CreateModal from "@/components/Modals/CreateModal";
import {DONATECOLUMN} from "@/constant";
import {addUserDonateUsingPOST} from "@/services/shixunapp/userDonateController";

export type idProp = {
  id: number,
};

const ShowUserInfo: React.FC<idProp> = (idProp) => {
  //获取信息
  const [size, setSize] = useState<'default' | 'middle' | 'small'>('default');
  const [formValue,setFormValue] = useState<API.UserVO>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const { initialState } = useModel('@@initialState');

  const getUserInfo =async ()=>{
    const res =await getUserVOByIdUsingGET({
      id: idProp.id,
    });
    setFormValue(res?.data);
  }
  useEffect(()=>{
    getUserInfo();
  },[]);

  const onChange = (e: RadioChangeEvent) => {
    console.log('检查大小', e.target.value);
    setSize(e.target.value);
  };

  const handleAdd = async (fields: API.UserVO) => {
    const hide = message.loading('正在添加');
    try {
      await addUserDonateUsingPOST({
        ...fields,
        donateUserId: initialState?.loginUser?.id,
        receiveUserId: idProp.id,
      });
      hide();
      await getUserInfo();
      message.success('添加成功');
      if(createModalOpen)handleModalOpen(false);
      return true;
    } catch (error: any) {
      hide();
      message.error("添加失败",error?.message);
      return false;
    }
  };

  const borderedItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户姓名',
      children: formValue?.userName,
    },
    {
      key: '2',
      label: '账户名',
      children: formValue?.userAccount,
    },
    {
      key: '3',
      label: '用户头像',
      children: (
        <div>
          <Image src={formValue?.userAvatar} width={100}/>
        </div>
      ),
    },
    {
      key: '4',
      label: '用户简介',
      children: formValue?.userProfile,
    },
    {
      key: '5',
      label: '用户角色',
      children: formValue?.userRole,
    },
    {
      key: '6',
      label: '创建时间',
      children: formatDate(formValue?.createTime),
    },
    {
      key: '7',
      label: '用户附件',
      children: (
        <div>
          <Image src={"https://hzh-1318734603.cos.ap-shanghai.myqcloud.com/%E7%AE%80%E5%8E%86.png"} width={100}/>
        </div>
      ),
    },
    {
      key: '8',
      label: '详细介绍',
      children: (
        <>
          {formValue?.detailProfile}
        </>
      ),
    },
  ];

  return (
    <div>
      <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">大</Radio>
        <Radio value="middle">中</Radio>
        <Radio value="small">小</Radio>
      </Radio.Group>
      <br />
      <br />
      <Descriptions
        bordered
        title="用户详细信息"
        size={size}
        extra={formValue?.userRole==='children'?
          <Button
            type="primary"
            onClick={()=>{handleModalOpen(true)}}
          ><PoundCircleTwoTone />捐赠</Button>:null}
        items={borderedItems}
      />
      <br/>
      <CreateModal columns={DONATECOLUMN} onCancel={()=>{handleModalOpen(false)}} onSubmit={async (values:API.UserVO)=>{handleAdd(values)}} visible={createModalOpen}/>
    </div>
  );
};

export default ShowUserInfo;
