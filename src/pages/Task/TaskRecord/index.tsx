import {
  PageContainer,
} from '@ant-design/pro-components';
import '@umijs/max';
import {useEffect, useState} from "react";
import {useLocation} from "umi";
import {Avatar, Button, Card, Divider, List, message, Typography} from "antd";
import {
  deleteTaskUsingPOST,
  finishTaskByIdUsingPOST,
  getTaskByIdUsingGET
} from "@/services/shixunapp/taskController";
import {formatDate} from "../../../../utils/timeUtil";

const TaskRecord: React.FC = () => {
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

  const handleRemove = async (id: number) => {
    const hide = message.loading('正在删除');
    if (!id) return true;
    try {
      const res = await deleteTaskUsingPOST({
        id: id,
      });
      await getTaskInfo();
      hide();
      message.success('删除成功');
      return true;
    } catch (error: any) {
      hide();
      message.error("删除失败",error?.message);
      return false;
    }
  };

  const handleFinish = async (id: number) => {
    const hide = message.loading('正在执行');
    if (!id) return true;
    try {
      const res = await finishTaskByIdUsingPOST({
        id: id,
      })
      await getTaskInfo();
      hide();
      message.success('执行成功');
      return true;
    } catch (error: any) {
      hide();
      message.error("执行失败",error?.message);
      return false;
    }
  };

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
                  description={<div>在{formatDate(item?.createTime)}时收到了任务:
                    <br/>
                      {item?.content}
                    </div>}
                />

                  {item?.isFinished===0 ? (
                    <div>
                      <Button type={"link"} key={"finish"} onClick={()=>{handleFinish(item?.id)}}>
                        完成
                      </Button>
                      <Divider type={"vertical"}/>
                      <Button
                        type={"text"}
                        key={"delete"}
                        danger
                        onClick={()=> {
                        handleRemove(item?.id)
                      }}
                        >
                        放弃
                      </Button>
                    </div>
                  ):(
                    <div>
                      已完成
                      <Divider type={"vertical"}/>
                      <Button
                        type={"link"}
                        key={"delete"}
                        onClick={()=> {
                          handleRemove(item?.id)
                        }}
                      >
                        已读
                      </Button>
                    </div>
                  )}
              </List.Item>
              <div>
              </div>
            </>
          ):null}
        />
      </Card>
    </PageContainer>
  );
};
export default TaskRecord;
