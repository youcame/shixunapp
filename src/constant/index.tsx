import {ProColumns} from "@ant-design/pro-components";
export const SYSTEM_LOGO = "https://avatars.githubusercontent.com/u/103118339?v=4";
export const PAGESIZE = 3;
export const USERPAGESIZE = 6;
export const NEWSAVATAR = "https://hzh-1318734603.cos.ap-shanghai.myqcloud.com/%E6%96%B0%E9%97%BB.jpg";

export const TASKCOLUMN : ProColumns<API.TaskVO>[] = [
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




