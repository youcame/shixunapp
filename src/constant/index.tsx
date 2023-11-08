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
    title: '任务难度',
    dataIndex: '123',
    valueType: 'text',
    formItemProps: {
      rules: [{
        required: true,
        message: "请输入任务难度",
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
export const USERCOLUMN : ProColumns<API.UserVO>[] = [
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
    hideInSearch:true,
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
    title: '昵称',
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
    title: '详细介绍',
    dataIndex: 'detailProfile',
    hideInTable: true,
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
  }
]

export const DONATECOLUMN : ProColumns<API.UserDonateVO>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
  },
  {
    title: '捐款金额',
    dataIndex: 'donateMoney',
    valueType: 'money',
    formItemProps: {
      initialValue: 0,
      rules: [{
        required: true,
        message: "请输入捐款金额",
      },
      ],

    }
  },
  {
    title: '捐款物资',
    hideInTable:true,
    hideInSearch: true,
    dataIndex: 'donateThing',
    valueType: 'text',
  },
]

export const TOTALDONATECOLUMN : ProColumns<API.UserDonateVO>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    valueType: 'index',
  },
  {
    title: '捐献月份',
    hideInSearch: true,
    initialValue: 11,
    dataIndex: 'month',
    valueType: 'text',
    formItemProps: {
      initialValue: 11,
      rules: [{
        required: true,
        message: "请输入捐款月份",
      },
      ],
    }
  },
  {
    title: '捐款金额(元)',
    dataIndex: 'money',
    valueType: 'money',
    formItemProps: {
      initialValue: 0,
        rules: [{
          required: true,
          message: "请输入捐款金额",
        },
      ],
    }
  },
  {
    title: '捐款物资(数量)',
    hideInSearch: true,
    dataIndex: 'goods',
    valueType: 'text',
  },
  {
    title: '捐献年份',
    hideInSearch: true,
    hideInForm: true,
    dataIndex: 'year',
    valueType: 'text',
  },
]




