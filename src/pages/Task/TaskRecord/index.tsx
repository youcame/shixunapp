import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import {useEffect, useState} from "react";
import {useLocation} from "umi";
import {Avatar, Card, Divider, List, Typography} from "antd";
import {getTaskByIdUsingGET} from "@/services/shixunapp/taskController";
import {formatDate} from "../../../../utils/timeUtil";

const TableList: React.FC = () => {
  const [formValue,setFormValue] = useState<API.TaskVO[]>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const getTaskInfo =async ()=>{
    const id = queryParams.get('id');
    const res =await getTaskByIdUsingGET({
      id: Number(id),
    });
    setFormValue(res?.data);
  }

  useEffect(()=>{
    getTaskInfo();
  },[]);
  return (
    <PageContainer>
      <Card>
        <Typography.Text>
          任务记录
        </Typography.Text>
        <Divider type={"horizontal"}/>
        <List
          itemLayout="horizontal"
          dataSource={formValue}
          renderItem={(item, index) => item?(
            <>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={"https://avatars.githubusercontent.com/u/103118339?v=4"} />}
                  title={<a href="https://ant.design">{item?.title}</a>}
                  description={`在${formatDate(item?.createTime)}时收到了任务:${item?.content}`}
                />
              </List.Item>
            </>
          ):null}
        />
      </Card>
    </PageContainer>
  );
};
export default TableList;
