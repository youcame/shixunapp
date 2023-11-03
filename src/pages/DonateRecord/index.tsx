import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import {useEffect, useState} from "react";
import {getUserDonateByIdUsingGET} from "@/services/shixunapp/userDonateController";
import {useLocation} from "umi";
import {Avatar, Card, Divider, List, Typography} from "antd";
import {formatDate} from "../../../utils/timeUtil";

const TableList: React.FC = () => {
  const [formValue,setFormValue] = useState<API.UserDonateVO[]>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);


  const getDonateInfo =async ()=>{
    const id = queryParams.get('donatorId');
    const res =await getUserDonateByIdUsingGET({
      donatorId: Number(id),
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
          捐款记录
        </Typography.Text>
        <Divider type={"horizontal"}/>
        <List
          itemLayout="horizontal"
          dataSource={formValue}
          renderItem={(item, index) => item.receiveUserVO?(
            <>
              {/*<text>*/}
              {/*  {index+1}*/}
              {/*</text>*/}
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item?.receiveUserVO.userAvatar} />}
                  title={<a href="https://ant.design">{item?.receiveUserVO?.userName}</a>}
                  description={item?.receiveUserVO?.userProfile}
                />
                <div>在{formatDate(item?.createTime)}时捐赠了{item.donateMoney}元</div>
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
