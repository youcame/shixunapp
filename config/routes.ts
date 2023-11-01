import {UserOutlined} from "@ant-design/icons";

export default [
  { path: '/user', layout: false, routes: [{ path: '/user/login', component: './User/Login' }] },
  { path: '/welcome', icon: 'smile', component: './Welcome', name:"欢迎" },
  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    name: '管理员',
    routes: [
      { path: '/admin', redirect: '/admin/volunteer' },
      { path: '/admin/volunteer', component: './Admin/VolunteerInfo', name: "志愿者管理", icon: 'crown' },
      { path: '/admin/children', component: './Admin/ChildrenInfo', name: "儿童管理", icon: 'crown' },
      { path: '/admin/donator', component: './Admin/DonatorInfo', name: "捐献者管理", icon: 'crown'},
    ],
  },
  { path: '/donate/record', component: './DonateRecord', icon: 'crown'},
  { path: '/receive/record', component: './ReceiveRecord', icon: 'crown'},
  { path: '/', redirect: '/welcome'},
  { path: '*', layout: false, component: './404' },
];
