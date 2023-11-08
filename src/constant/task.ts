// taskColumns.ts
import { ProColumns } from "@ant-design/pro-components";

export const taskColumn: ProColumns<API.TaskVO>[] = [
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
    title: '任务难度',
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
    hideInTable: true,
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
];
