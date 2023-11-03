import '@umijs/max';
import React from 'react';
import {Button, Modal} from "antd";
import {ProColumns, ProTable} from "@ant-design/pro-table/lib";
import MyUploadFile from "@/components/UploadFile";
export type Props = {
  columns: ProColumns<API.UserVO>[];
  onCancel: () => void;
  onSubmit: (values: API.UserVO) => Promise<void>;
  visible: boolean;
  file?: boolean;
};
const CreateModal: React.FC<Props> = (props) => {
  const {columns, visible, onSubmit, onCancel, file} = props;

  return (
    <Modal open={visible} onCancel={()=> onCancel?.()} footer={null}>
      <div style={{ marginLeft: "20px", marginRight: "10px"}}>
        {file ? (
          <div>
            上传附件:  <MyUploadFile />
          </div>
        ) : null}
      </div>
      <br/>
      <ProTable
        type={"form"}
        columns={columns}
        onSubmit={async (value)=>{
          onSubmit?.(value)
        }}
      />
    </Modal>
  );
};
export default CreateModal;
