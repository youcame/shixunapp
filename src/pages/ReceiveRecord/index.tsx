import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import {useEffect, useState} from "react";
import {useLocation} from "umi";
import {Avatar, Card, Divider, List, Typography} from "antd";
import ShowUserInfo from "@/components/UserInfo";
import {getUserReceiveByIdUsingGET} from "@/services/shixunapp/userDonateController";
import {formatDate} from "../../../utils/timeUtil";

const ReceiveRecord: React.FC = () => {
  const [formValue,setFormValue] = useState<API.UserDonateVO[]>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userId,setUserId] = useState<number>(0);

  const getDonateInfo =async ()=>{
    const id = queryParams.get('childrenId');
    setUserId(Number(id));
    const res =await getUserReceiveByIdUsingGET({
      childrenId: Number(id),
    });
    setFormValue(res?.data);
  }

  const [reloadFlag, setReloadFlag] = useState(0);
  //让父组件每次刷新时都会提醒子组件更新
  const reloadChild = () => {
    setReloadFlag(Math.random());
  };

  // const handleReminder =async () => {
  //   await getDonateInfo();
  //   console.log('提醒父组件！');
  // };

  useEffect(()=>{
    getDonateInfo();
    reloadChild();
  },[]);
  return (
    <PageContainer>
      <Card>
        {/*onReminder={handleReminder()}希望子组件能提醒父组件，但不知道咋做233 hzh*/}
        <ShowUserInfo key={reloadFlag} id={userId}/>
        <Typography.Text>
          获取帮助记录
        </Typography.Text>
        <Divider type={"horizontal"}/>
        <List
          itemLayout="horizontal"
          dataSource={formValue}
          renderItem={(item) => item.donateUserVO?(
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
export default ReceiveRecord;
