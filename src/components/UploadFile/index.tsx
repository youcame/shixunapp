import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import {uploadFileUsingPOST} from "@/services/shixunapp/fileController";

const fileList: UploadFile[] = [
];

const MyUploadFile: React.FC = () => (
  <>
    <Upload
      action="http://localhost:8101/api/file/upload"
      listType="picture"
      name="file"
      defaultFileList={[...fileList]}
      customRequest={async ({file, onSuccess, onError,}) => {
          const res = await uploadFileUsingPOST({
            biz: 'news_avatar',
          },{},file);
          if(res?.code===0){
            // @ts-ignore
            onSuccess("上传成功");
          }else {
            // @ts-ignore
            onError(new Error('上传失败'));
          }
      }
      }
    >
      <Button  icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  </>
);

export default MyUploadFile;
