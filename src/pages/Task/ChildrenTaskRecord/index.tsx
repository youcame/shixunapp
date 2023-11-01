import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import {useEffect, useState} from "react";
import {getUserDonateByIdUsingGET, getUserReceiveByIdUsingGET} from "@/services/shixunapp/userDonateController";
import {useLocation} from "umi";
import {Avatar, Card, Divider, List, Typography} from "antd";

const TableList: React.FC = () => {
  const [formValue,setFormValue] = useState<API.UserDonateVO[]>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  //工具
  function formatDate(dateString: any) {
    if (!dateString) return ''; // 处理可能的空日期
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const getDonateInfo =async ()=>{
    const id = queryParams.get('childrenId');
    const res =await getUserReceiveByIdUsingGET({
      childrenId: Number(id),
    });
    setFormValue(res?.data);
  }

  useEffect(()=>{
    getDonateInfo();
  },[]);
  return (
    <PageContainer>
      <Card>
        <Typography.Text>
          获取帮助记录
        </Typography.Text>
        <Divider type={"horizontal"}/>
        <List
          itemLayout="horizontal"
          dataSource={formValue}
          renderItem={(item, index) => item.donateUserVO?(
            <>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item?.donateUserVO.userAvatar} />}
                  title={<a href="https://ant.design">{item?.donateUserVO?.userName}</a>}
                  description={item?.donateUserVO?.userProfile}
                />
                <div>在{formatDate(item?.createTime)}时捐赠了{item?.donateMoney}元</div>
                <div> {item.donateThing? "与"+item.donateThing : ''}</div>
              </List.Item>
            </>
          ):null}
        />
      </Card>
    </PageContainer>
  );
};
export default TableList;
